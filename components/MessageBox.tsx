import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Copy, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface SmsMessage {
  dateTime: string;
  code: string;
  text: string;
}

export interface ApiResponse {
  sms: SmsMessage;
  verificationType: number;
  call: {
    from: string | null;
    text: string | null;
    code: string | null;
    dateTime: string | null;
    url: string | null;
    parsingCount: number;
  };
}

interface MessageBoxProps {
  messages: ApiResponse[];
  numberId: string;
}

const MessageBox = ({ messages }: MessageBoxProps) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code copied successfully",
    });
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString();
  };
  console.log(messages);
  if (messages.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground text-sm">
        No messages received yet
      </div>
    );
  }

  return (
    <div className="space-y-3 mt-4">
      <div className="flex items-center gap-2 text-sm font-medium">
        <MessageSquare className="h-4 w-4 text-teal-300" />
        Messages
      </div>
      {messages.map((message, index) => (
        <Card key={index} className="bg-muted/30">
          <CardContent className="p-4">
            <div className="space-y-3">
              {/* SMS Message Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className={`border ${
                        message.sms
                          ? "bg-green-500/10 text-green-600 border-green-500/20"
                          : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                      }`}
                    >
                      {message.sms ? "SMS Received" : "No SMS"}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {message.sms?.dateTime
                        ? formatDateTime(message.sms.dateTime)
                        : ""}
                    </div>
                  </div>
                </div>

                {/* Verification Code */}
                <div className="bg-background rounded-lg p-3 border border-border">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Verification Code
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    {message.sms?.code ? (
                      <>
                        <span className="font-mono text-lg font-bold text-primary">
                          {message.sms.code}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(message.sms.code)}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </>
                    ) : (
                      <span className="text-sm text-muted-foreground italic">
                        No code available
                      </span>
                    )}
                  </div>
                </div>

                {/* Full Message Text */}
                <div className="bg-background rounded-lg p-3 border border-border">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Message Content
                  </label>
                  <div className="flex items-start justify-between mt-1">
                    {message.sms?.text ? (
                      <>
                        <p className="text-sm leading-relaxed flex-1 mr-2">
                          {message.sms.text}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(message.sms.text)}
                          className="h-6 w-6 p-0 flex-shrink-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">
                        No message received yet
                      </p>
                    )}
                  </div>
                </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MessageBox;