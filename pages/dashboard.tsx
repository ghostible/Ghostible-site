import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, CreditCard, Phone, MessageSquare, Copy, Trash2,ChevronUp, ChevronDown, Plus, Minus, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CountdownTimer from "@/components/CountDownTimer";
import { formatPhoneNumber } from "@/utils/formatPhone";
import MessageBox, { ApiResponse } from "@/components/MessageBox";
import { SearchableCountrySelect } from "@/components/SearchableCountrySelect";
import { SearchableServiceSelect } from "@/components/SearchableServiceSelect";


type Profile = {
  id: string;
  email: string;
  full_name: string;
  plan: string;
  expires_at: string;
  start_at: string;
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

type Plan = {
  id: string;
  unit_amount: number;
  recurring?: {
    interval: 'week' | 'month' ;
    interval_count: '1' | '1';
  };
  product:
    | {
        name: string;
        description: string;
        marketing_features: marketing_features[];
      }
    | string;
};

type marketing_features = {
  name: string;
};

interface TempphonePageProps {
  plans: Plan[];
  currentPlan: string | null;
  handleSubscribe: (priceId: string, planLabel: string, mode: "payment" | "subscription") => Promise<void>;
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.SITE_URL}/api/prices`);
  const data = await res.json();
  return { props: { plans: data } };
}

export default function Dashboard({ plans }: TempphonePageProps) {
  const { toast } = useToast();
  
  //const [currentPlan, setCurrentPlan] = useState<string | null>(null);
  const { user } = useAuthRedirect();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [services, setServices] = useState<{ code: string; name: string }[]>([]);
  const [assignedNumbers, setAssignedNumbers] = useState<AssignedNumber[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [expandedNumbers, setExpandedNumbers] = useState<string[]>([]);

  const [addonQuantities, setAddonQuantities] = useState<{ [key: string]: number }>({
    pack1: 1,
  });

  // Fetch profile + subscription + assigned numbers
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, full_name, plan, start_at, expires_at, subscription_credit, subscription_TotalCredit, subscription_status")
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
      //setLoadingServices(true);
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
        //setLoadingServices(false);
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

    if (profile && profile.subscription_TotalCredit == 0) {
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
        description: `New number: ${formatPhoneNumber(data.number.number, data.number.country_name)}`, 
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

  // const deleteNumber = async (id: string) => {
  //   setAssignedNumbers(assignedNumbers.filter((n) => n.id !== id));
  //   toast({ title: "Deleted", description: "Number removed" });
  // };
  const deleteNumber = async (rentId: string, dbId: string) => {
    try {
      const resp = await fetch("/api/sms/cancel-activations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rentId, dbId }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        if (data.error === "EARLY_CANCEL_DENIED") {
          toast({
            title: "Too Early",
            description: "You cannot cancel a number within the first 2 minutes.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: data.error || "Failed to delete number",
            variant: "destructive",
          });
        }
        return;
      }

      // ✅ Success
      setAssignedNumbers((prev) => prev.filter((n) => n.id !== dbId));
      toast({
        title: "Deleted",
        description: "Number removed successfully.",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({ title: "Error", description: err.message, variant: "destructive" });
      } else {
        toast({ title: "Error", description: "Something went wrong", variant: "destructive" });
      }
    }
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

      setAssignedNumbers(prev =>
        prev.map(n =>
          n.rent_id === num.rent_id
            ? {
                ...n,
                messages: 1,
                messageData: [data],
              }
            : n
        )
      );

      // Toggle expand instead of forcing open
      setExpandedNumbers(prev =>
        prev.includes(num.id)
          ? prev.filter(id => id !== num.id)
          : [...prev, num.id]
      );
    } catch (err) {
      console.error("Fetch message error", err);
    }
  };

  const handleCancel = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const res = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      })

      const data = await res.json()
      if (data.success) {
          toast({
            title: "Subscriptions Cancel",
            description: "You Subscriptions is successfully cancel.",
          });
      } else {
          toast({
            title: "Subscriptions Cancel",
            description: "Error canceling subscription.",
          });
      }
    }
    const updateAddonQuantity = (pack: string, change: number) => {
      setAddonQuantities((prev) => ({
        ...prev,
        [pack]: Math.max(1, (prev[pack] || 1) + change),
      }));
    };
    
    const handlePurchaseAddon = async (userId: string, priceId: string, creditsPerPack: number, quantity: number) => {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          priceId,
          mode: "payment",       // important! one-time
          planLabel: "Add-On Credits",
          quantity,
          creditsPerPack,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Error:", data.error);
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
            <CreditCard className="mr-2 h-4 w-4 text-teal-400" />
            Manage Subscription
          </Button>
        </div>

        {/* Customer & Subscription Info */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-teal-400" />
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
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-teal-400" />
                  Subscription Details
                </CardTitle>

                {/* Desktop Cancel Button */}
                {( (profile.plan === "Weekly Pass" || profile.plan === "Monthly Pass") 
                    && profile.subscription_status === 'Active') && (
                  <Button
                    onClick={handleCancel}
                    variant="default"
                    className="hidden sm:flex"
                  >
                    Cancel Subscription
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Current Plan + Badge */}
              <div>
                <label className="text-sm font-medium text-teal-300 block">
                  Current Plan
                </label>

                <div className="flex items-center gap-8">
                  <p className="text-lg font-semibold">
                    {profile.plan ? profile.plan : "No Plan active"}
                  </p>

                  {profile.subscription_status && (
                    <Badge variant="secondary">
                      {profile.subscription_status}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Plan Period */}
              {profile.plan !== "One-Time Pass" ? (
                <div>
                  {profile.expires_at && profile.start_at && (
                    <>
                      <label className="text-sm font-medium text-teal-300">Plan Period</label>
                      <p className="text-sm">
                        {new Date(profile.start_at).toISOString().split("T")[0]} - 
                        {new Date(profile.expires_at).toISOString().split("T")[0]}
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <div>
                  <label className="text-sm font-medium text-teal-300">Purchased On</label>
                  <p className="text-sm">
                    {new Date(profile.expires_at).toISOString().split("T")[0]}
                  </p>
                </div>
              )}

              {/* Credits */}
              <div className="grid grid-cols-2 gap-4">
                {profile.subscription_credit !== null && (
                  <div className="text-center p-3 bg-black rounded-lg">
                    <label className="text-sm font-medium text-teal-300 block">Used Credits</label>
                    <p className="text-2xl font-bold text-white">
                      {profile.subscription_credit}
                    </p>
                  </div>
                )}

                {profile.subscription_TotalCredit !== null && (
                  <div className="text-center p-3 bg-black rounded-lg">
                    <label className="text-sm font-medium text-teal-300 block">Available Credits</label>
                    <p className="text-2xl font-bold text-white">
                      {profile.subscription_TotalCredit}
                    </p>
                  </div>
                )}
              </div>

              {/* Mobile Cancel Button */}
              {( (profile.plan === "Weekly Pass" || profile.plan === "Monthly Pass") 
                  && profile.subscription_status === 'Active') && (
                <Button
                  onClick={handleCancel}
                  variant="default"
                  className="sm:hidden w-full"
                >
                  Cancel Subscription
                </Button>
              )}

              {/* Upsell Add-on Section for One-Time Subscriptions */}
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-teal-400" />
                  <h4 className="font-semibold text-foreground">Need More Credits?</h4>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div className="border rounded-lg p-3 bg-gradient-to-r from-primary/5 to-primary/10">
                    {plans
                      .filter((plan) => {
                        const recurring = plan.recurring;
                        const productname = typeof plan.product === "string" ? null : plan.product;
                        if (productname?.name === "Add-On Upsells") return true;
                        if (!recurring) return false;
                        if (recurring.interval === "week") return false;
                        if (recurring.interval === "month") return false;
                        return false;
                      })
                      .map((plan, index) => {
                        const product = typeof plan.product === "string" ? null : plan.product;
                        const price = (plan.unit_amount / 100).toFixed(2);
                        return (
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" key={index}>
                            {/* Left side */}
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-white mb-2">{product?.name}</h3>
                              <ul className="text-gray-300 text-sm space-y-2">
                                {product?.marketing_features.map((features, idx) => (
                                  <li className="flex items-center gap-2" key={features?.name ?? idx}>
                                    <p>{features?.name}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Right side */}
                            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateAddonQuantity("pack1", -1)}
                                  disabled={addonQuantities.pack1 <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center font-medium">{addonQuantities.pack1}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateAddonQuantity("pack1", 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                                <p className="text-lg font-bold text-primary">
                                  ${(Number(price) * addonQuantities.pack1).toFixed(2)}
                                </p>
                              </div>

                              <Button
                                onClick={() =>
                                  handlePurchaseAddon(
                                    profile?.id,
                                    plan.id,
                                    addonQuantities.pack1,
                                    addonQuantities.pack1
                                  )
                                }
                                className="w-full"
                                variant="default"
                              >
                                Buy Add-On Upsell
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Number Assignment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-teal-400" />
              Assign New Number
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3 items-end">
              {/* Country Select */}
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Select Country
                </label>
                <SearchableCountrySelect
                  countries={mockCountries}
                  value={selectedCountry?.code ?? ""}
                  onValueChange={(val) => {
                    const country = mockCountries.find((c) => c.code === val);
                    if (country) setSelectedCountry(country);
                  }}
                  placeholder="Choose country"
                />
              </div>

              {/* Service Select */}
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Select Service
                </label>
                <SearchableServiceSelect
                  services={services}
                  value={selectedService?.code ?? ""}
                  onValueChange={(val) => {
                    const service = services.find((s) => s.code === val);
                    if (service) setSelectedService(service);
                  }}
                  placeholder="Choose service"
                />
              </div>

              {/* Button aligned with inputs */}
              <div className="flex flex-col">
                <label className="invisible text-sm font-medium">Assign</label>
                <Button
                  variant="default"
                  onClick={handleAssignNumber}
                  className="w-full"
                >
                  Assign Number (1 Credit)
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assigned Numbers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-teal-400" />
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
                          <Badge variant="default" className={`${getStatusColor(number.status)} bg-teal-300 text-black`}>
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
                              {expandedNumbers.includes(number.id) ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            deleteNumber(
                              String(number.rent_id),
                              String(number.id)
                            )
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {expandedNumbers.includes(number.id) && (
                      <MessageBox
                        messages={number.messageData ?? []}
                        numberId={number.id}
                      />
                    )}
                    {index < assignedNumbers.length - 1 && (
                      <Separator className="mt-4" key={`separator-${index}`} />
                    )}
                    
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
