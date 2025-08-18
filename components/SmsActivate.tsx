import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Copy, RefreshCw, Phone, MessageSquare, Clock, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { smsActivateApi, type SmsActivateService, type SmsActivateNumber } from "@/services/smsActivateService";

interface NumberGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier: string;
  countryCode: string;
}

const mockServices: SmsActivateService[] = [
  { id: "tg", name: "Telegram", cost: 0.20 },
  { id: "wa", name: "WhatsApp", cost: 0.25 },
  { id: "ig", name: "Instagram", cost: 0.30 },
  { id: "tw", name: "Twitter", cost: 0.35 },
  { id: "fb", name: "Facebook", cost: 0.25 },
  { id: "go", name: "Google", cost: 0.40 },
  { id: "ti", name: "Tinder", cost: 0.50 },
  { id: "ub", name: "Uber", cost: 0.45 },
];

export const NumberGeneratorModal = ({ isOpen, onClose, selectedTier, countryCode }: NumberGeneratorModalProps) => {
  const [selectedService, setSelectedService] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [currentNumber, setCurrentNumber] = useState<SmsActivateNumber | null>(null);
  const [waitingForSms, setWaitingForSms] = useState(false);
  const [step, setStep] = useState<"select" | "generating" | "waiting" | "completed">("select");

  const handleGenerateNumber = async () => {
    if (!selectedService) {
      toast({
        title: "Please select a service",
        description: "Choose which app you want to verify for.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setStep("generating");

    try {
      // Mock API call to order number
      const number = await smsActivateApi.orderNumber(selectedService, countryCode);
      setCurrentNumber(number);
      setStep("waiting");
      
      toast({
        title: "Number Generated!",
        description: `Your temporary number: ${number.number}`,
      });

      // Start waiting for SMS
      setWaitingForSms(true);
      // Mock waiting for SMS (in real app, this would be polling)
      setTimeout(async () => {
        try {
          const updatedNumber = await smsActivateApi.getSms(number.id);
          setCurrentNumber(updatedNumber);
          setStep("completed");
          setWaitingForSms(false);
          
          toast({
            title: "SMS Received!",
            description: `Verification code: ${updatedNumber.sms}`,
          });
        } catch {
          toast({
            title: "SMS Timeout",
            description: "No SMS received within the timeout period.",
            variant: "destructive",
          });
          setWaitingForSms(false);
        }
      }, 5000); // Mock 5 second wait

    } catch {
      toast({
        title: "Error",
        description: "Failed to generate number. Please try again.",
        variant: "destructive",
      });
      setStep("select");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Copied to clipboard",
    });
  };

  const handleNewNumber = () => {
    setCurrentNumber(null);
    setSelectedService("");
    setStep("select");
    setWaitingForSms(false);
  };

  const getStepIcon = () => {
    switch (step) {
      case "select":
        return <Phone className="h-6 w-6 text-teal-400" />;
      case "generating":
        return <Loader2 className="h-6 w-6 animate-spin text-primary" />;
      case "waiting":
        return <Clock className="h-6 w-6 text-yellow-500" />;
      case "completed":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      default:
        return <Phone className="h-6 w-6 text-teal-400" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-[#020817] border border-[#7c7777] rounded-xl p-6 border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {getStepIcon()}
            <span className="text-white">Generate Temporary Number</span>
          </DialogTitle>
          <DialogDescription>
            Generate a temporary phone number for SMS verification ({selectedTier} tier)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 text-white">
          {step === "select" && (
            <>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Select Service/App
                </label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Choose which app to verify for" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#020817] border border-[#7c7777] border-border">
                    {mockServices.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        <div className="flex items-center justify-between w-full text-white">
                          <span>{service.name}</span>
                          <Badge variant="outline" className="ml-2">
                            ${service.cost.toFixed(2)}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleGenerateNumber} 
                disabled={loading || !selectedService}
                className="bg-teal-400 text-black font-semibold py-3 px-8 rounded-full hover:bg-teal-300 transition cursor-pointer"
                variant="premium"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Number...
                  </>
                ) : (
                  "Generate Number"
                )}
              </Button>
            </>
          )}

          {currentNumber && (step === "waiting" || step === "completed") && (
            <Card className="bg-background border-border">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Phone Number:</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-lg text-foreground">{currentNumber.number}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(currentNumber.number)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Service:</span>
                  <span className="text-foreground">
                    {mockServices.find(s => s.id === currentNumber.service)?.name}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Status:</span>
                  <Badge 
                    variant={currentNumber.status === "received" ? "default" : "outline"}
                    className={currentNumber.status === "received" ? "bg-green-500" : ""}
                  >
                    {currentNumber.status === "waiting" && "Waiting for SMS"}
                    {currentNumber.status === "received" && "SMS Received"}
                    {currentNumber.status === "cancelled" && "Cancelled"}
                  </Badge>
                </div>

                {currentNumber.sms && (
                  <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium text-green-800 dark:text-green-200">
                          Verification Code:
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-mono font-bold text-green-800 dark:text-green-200">
                          {currentNumber.sms}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(currentNumber.sms!)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {waitingForSms && (
                  <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Waiting for SMS (may take 1-2 minutes)...</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <div className="flex space-x-3">
            {step === "completed" && (
              <Button onClick={handleNewNumber} variant="outline" className="flex-1">
                <RefreshCw className="mr-2 h-4 w-4" />
                New Number
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};