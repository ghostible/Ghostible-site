import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Calendar, CreditCard, MessageSquare, Copy, Trash2,ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CountdownTimer from "@/components/CountDownTimer";
import { formatPhoneNumber } from "@/utils/formatPhone";
import MessageBox, { ApiResponse } from "@/components/MessageBox";


type Profile = {
  id: string;
  email: string;
  full_name: string;
  plan: string;
  expires_at: string;
  subscription_credit: number;
  subscription_status: string;
  subscription_TotalCredit:number;
};

type AssignedNumber = {
  id: string;
  number: string;
  service: string;
  rent_id: number;
  service_name: string;
  country: string;
  country_name:string;
  status: string;
  createdAt:  string;
  messages: number;
  calls: number;
  messageData?: ApiResponse[];
};

type Country = { code: string; name: string; flag: string };
type Service = { code: string; name: string };

const mockCountries = [
  { code: "187", name: "United States", flag: "🇺🇸" },
  { code: "16", name: "United Kingdom", flag: "🇬🇧" },
  { code: "36", name: "Canada", flag: "🇨🇦" },
  { code: "175", name: "Australia", flag: "🇦🇺" },
];

const Dashboard = () => {
  const { toast } = useToast();
  const { user } = useAuthRedirect();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [services, setServices] = useState<{ code: string; name: string }[]>([]);
  const [assignedNumbers, setAssignedNumbers] = useState<AssignedNumber[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [loadingServices, setLoadingServices] = useState(false);
  //const [expandedNumbers, setExpandedNumbers] = useState<string[]>([]);
  const [openMessageBox, setOpenMessageBox] = useState<string | null>(null);

  // const toggleExpanded = (numberId: string) => {
  //   setExpandedNumbers(prev => 
  //     prev.includes(numberId) 
  //       ? prev.filter(id => id !== numberId)
  //       : [...prev, numberId]
  //   );
  // };

  // Fetch profile + subscription + assigned numbers
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, full_name, plan, expires_at, subscription_credit, subscription_TotalCredit, subscription_status")
        .eq("id", user.id)
        .single();

      if (!error && data) {
        setProfile(data);

        const { data: numbers, error: numError } = await supabase
          .from("rented_numbers")
          .select("*")
          .eq("user_id", data.id)
          .order("created_at", { ascending: false });

        if (!numError && numbers) {
          setAssignedNumbers(
            numbers.map((n) => {
              const createdISO = n.created_at
                ? n.created_at.replace(" ", "T").split(".")[0] + "Z" // add Z = UTC
                : new Date().toISOString();

              return {
                id: n.id,
                number: n.number,
                rent_id:n.rent_id,
                service: n.service,
                service_name: n.service_name,
                country: n.country,
                country_name: n.country_name,
                status: n.status,
                createdAt: createdISO, 
                messages: 0,
                calls: 0,
                messageData: []
              };
            })
          );
        }
      }
    };

    fetchProfile();
  }, [user]);

  // Fetch available services from API
  useEffect(() => {
    const fetchServices = async () => {
      setLoadingServices(true);
      try {
        const res = await fetch("/api/sms/get-services");
        const data = await res.json();

        if (data.status === "success" && Array.isArray(data.services)) {
          setServices(data.services);
        } else {
          console.error("Unexpected response:", data);
        }
      }  catch (err: unknown) {
        console.error("Service fetch error:", err);
      }
      finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  const handleAssignNumber = async () => {
    if (!selectedCountry || !selectedService) {
      toast({
        title: "Selection Required",
        description: "Please select both country and service.",
        variant: "destructive",
      });
      return;
    }

    if (profile && profile.subscription_credit <= 0) {
      toast({
        title: "Insufficient Credits",
        description: "You don't have enough credits.",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await fetch("/api/sms/rent-number", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: profile?.id,
          country: {
            code: selectedCountry.code,
            name: selectedCountry.name,
          },
          service: {
            code: selectedService.code,
            name: selectedService.name,
          },
          time: "20Minutes",
        }),
      });

      const data = await res.json();
      if (data.error) {
        toast({ title: "Failed", description: data.error, variant: "destructive" });
        return;
      }

      setAssignedNumbers([data.number, ...assignedNumbers]);

      toast({
        title: "Number Assigned",
        description: `New number: ${data.number.number}`,
      });

      setSelectedCountry(null);
      setSelectedService(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({ title: "Error", description: err.message, variant: "destructive" });
      } else {
        toast({ title: "Error", description: "Something went wrong", variant: "destructive" });
      }
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Number copied successfully",
    });
  };

  const deleteNumber = async (id: string) => {
    setAssignedNumbers(assignedNumbers.filter((n) => n.id !== id));
    //await supabase.from("rented_numbers").delete().eq("id", id);
    toast({ title: "Deleted", description: "Number removed" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting":
        return "bg-yellow-500";
      case "active":
        return "bg-green-500";
      case "completed":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleFetchMessages = async (num: AssignedNumber) => {
    try {
      const resp = await fetch(`/api/sms/get-message?id=${num.rent_id}`);
      const data = await resp.json();
      console.log('dataddd', data);
      console.log('resp', resp);
      setAssignedNumbers(prev =>
        prev.map(n =>
          n.rent_id === num.rent_id
            ? {
                ...n,
                messages: 1,
                messageData: [data], // 👈 attach latest sms/call data
              }
            : n
        )
      );

      // Optionally auto-open the MessageBox
      setOpenMessageBox(num.id);
    } catch (err) {
      console.error("Fetch message error", err);
    }
  };

  if (!user || !profile) return null;

  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <Button variant="outline" className="text-white">
            <CreditCard className="mr-2 h-4 w-4" />
            Manage Subscription
          </Button>
        </div>

        {/* Customer & Subscription Info */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Customer Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-teal-300">Name</label>
                <p className="text-lg font-semibold">{profile.full_name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-teal-300">Email</label>
                <p className="text-lg font-semibold">{profile.email}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Subscription Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-teal-300">Current Plan</label>
                  <p className="text-lg font-semibold">{profile.plan}</p>
                </div>
                <Badge variant="secondary">{profile.subscription_status}</Badge>
              </div>
              <div>
                <label className="text-sm font-medium text-teal-300">Plan Period</label>
                <p className="text-sm">
                  {new Date(profile.expires_at).toISOString().split("T")[0]}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-teal-300">Available Credits</label>
                <p className="text-2xl font-bold text-primary">
                  {profile.subscription_credit} / {profile.subscription_TotalCredit}
                </p>
              </div>
              <Button variant="destructive" className="w-full text-white">
                Cancel Subscription
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Number Assignment */}
        <Card>
          <CardHeader>
            <CardTitle>Assign New Number</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Select
                value={selectedCountry?.code}
                onValueChange={(val) => {
                  const country = mockCountries.find((c) => c.code === val);
                  if (country) setSelectedCountry(country);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose country" />
                </SelectTrigger>
                <SelectContent>
                  {mockCountries.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.flag} {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedService?.code}
                onValueChange={(val) => {
                  const service = services.find((s) => s.code === val);
                  if (service) setSelectedService(service);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose service" />
                </SelectTrigger>
                <SelectContent>
                  {loadingServices ? (
                    <SelectItem value="loading">Loading...</SelectItem>
                  ) : (
                    services.map((s) => (
                      <SelectItem key={s.code} value={s.code}>
                        {s.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>

              <Button variant="default" onClick={handleAssignNumber}>Assign Number (1 Credit)</Button>
            </div>
          </CardContent>
        </Card>

        {/* Assigned Numbers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Your Numbers ({assignedNumbers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignedNumbers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No numbers assigned yet. Assign your first number above.
                </div>
              ) : (
                assignedNumbers.map((number, index) => (
                  <div key={number.id}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="font-mono font-bold text-lg">
                            {formatPhoneNumber(number.number, number.country_name)}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(number.number)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{number.service_name}</span>
                          <span>{number.country_name}</span>
                          <CountdownTimer createdAt={number.createdAt ?? new Date().toISOString()} />

                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Badge variant="default" className={`${getStatusColor(number.status)} text-white`}>
                            <span className="ml-1 capitalize">{number.status}</span>
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                              <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleFetchMessages(number)}
                            >
                              <ChevronUp className="h-4 w-4" />
                              {/* {expandedNumbers.includes(number.id) ? (
                                
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )} */}
                            </Button>

                          </div>
                        </div>

                        {/* <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExpanded(number.id)}
                        >
                          {expandedNumbers.includes(number.id) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button> */}

                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNumber(number.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {openMessageBox && (
                      <MessageBox
                        messages={assignedNumbers.find(n => n.id === openMessageBox)?.messageData ?? []}
                        numberId={openMessageBox}
                      />
                    )}
                    {index < assignedNumbers.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
