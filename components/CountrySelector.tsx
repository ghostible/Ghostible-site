import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const countries = [
  { code: "0", name: "United States", flag: "🇺🇸" },
  { code: "12", name: "United Kingdom", flag: "🇬🇧" },
  { code: "16", name: "Canada", flag: "🇨🇦" },
  { code: "175", name: "Australia", flag: "🇦🇺" },
];

interface CountrySelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const CountrySelector = ({ value, onValueChange }: CountrySelectorProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-2 mb-4 pb-16">
      <p className="text-sm text-muted-foreground text-white">Number pricing for:</p>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-48 bg-card border-border">
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent className="bg-[#020817] border border-[#7c7777] border-border">
          {countries.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              <div className="flex items-center space-x-2 text-white">
                <span>{country.flag}</span>
                <span>{country.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};