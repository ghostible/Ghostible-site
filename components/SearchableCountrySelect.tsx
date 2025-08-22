import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Country {
  code: string;
  name: string;
  flag: string;
}

interface SearchableCountrySelectProps {
  countries: Country[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export const SearchableCountrySelect = ({ 
  countries, 
  value, 
  onValueChange, 
  placeholder = "Choose country" 
}: SearchableCountrySelectProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sort countries alphabetically and filter by search term
  const filteredCountries = countries
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter(country => 
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="bg-card border-border">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-[#0e0f11]">
        <div className="sticky top-0 bg-black px-3 pb-2 pt-2 z-10">
          <div className="flex items-center">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50 text-teal-300" />
            <Input
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-teal-300 h-8 w-full border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>
        {filteredCountries.length === 0 ? (
          <div className="py-2 px-3 text-sm text-teal-300">No countries found</div>
        ) : (
          filteredCountries.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              <div className="flex items-center space-x-2">
                <span>{country.flag}</span>
                <span>{country.name}</span>
              </div>
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};