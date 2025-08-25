import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Service {
  code: string;
  name: string;
}

interface SearchableServiceSelectProps {
  services: Service[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export const SearchableServiceSelect = ({ 
  services, 
  value, 
  onValueChange, 
  placeholder = "Choose service" 
}: SearchableServiceSelectProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sort services alphabetically and filter by search term
  const filteredServices = services
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter(service => 
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="bg-card border-border">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-[#0e0f11]">
        <div className="sticky top-0 bg-black px-3 pb-2 pt-2 z-10 rounded-md border border-border/50">
          <div className="flex items-center">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50 text-teal-300" />
            <Input
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()}
              onFocus={(e) => e.stopPropagation()}
              autoFocus
              className="pointer-events-auto text-teal-300 h-8 w-full border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>
        <div className="overflow-y-auto">
          {filteredServices.length === 0 ? (
            <div className="py-2 px-3 text-sm text-teal-300">No services found</div>
          ) : (
            filteredServices.map((service) => (
              <SelectItem key={service.code} value={service.code}>
                {service.name}
              </SelectItem>
            ))
          )}
        </div>
      </SelectContent>
    </Select>
  );
};