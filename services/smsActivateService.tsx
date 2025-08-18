// Mock SMS-Activate API service - replace with real API calls later
export interface SmsActivateCountry {
  id: string;
  name: string;
  code: string;
  flag: string;
}

export interface SmsActivateService {
  id: string;
  name: string;
  cost: number;
}

export interface SmsActivateNumber {
  id: string;
  number: string;
  service: string;
  country: string;
  cost: number;
  status: "waiting" | "received" | "cancelled";
  sms?: string;
  created_at: string;
}

// Mock data
const mockCountries: SmsActivateCountry[] = [
  { id: "0", name: "United States", code: "US", flag: "🇺🇸" },
  { id: "12", name: "United Kingdom", code: "UK", flag: "🇬🇧" },
  { id: "16", name: "Canada", code: "CA", flag: "🇨🇦" },
  { id: "175", name: "Australia", code: "AU", flag: "🇦🇺" },
];

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

export const smsActivateApi = {
  // Get available countries
  getCountries: async (): Promise<SmsActivateCountry[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCountries;
  },

  // Get available services
  getServices: async (): Promise<SmsActivateService[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockServices;
  },

  // Get available numbers count for a service and country
  getNumbersCount: async (service: string, country: string): Promise<number> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    // Mock random count between 10-100
    return Math.floor(Math.random() * 90) + 10;
  },

  // Order a number
  orderNumber: async (service: string, country: string): Promise<SmsActivateNumber> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock phone number generation
    const countryPrefix = {
      "0": "+1", // US
      "12": "+44", // UK  
      "16": "+1", // CA
      "175": "+61" // AU
    }[country] || "+1";
    
    const mockNumber = `${countryPrefix}${Math.floor(Math.random() * 9000000000) + 1000000000}`;
    
    return {
      id: `order_${Date.now()}`,
      number: mockNumber,
      service,
      country,
      cost: mockServices.find(s => s.id === service)?.cost || 0.20,
      status: "waiting",
      created_at: new Date().toISOString()
    };
  },

  // Get SMS for a number
  getSms: async (orderId: string): Promise<SmsActivateNumber> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock SMS code
    const mockCode = Math.floor(Math.random() * 900000) + 100000;
    
    return {
      id: orderId,
      number: "+1234567890", // This would be the actual number
      service: "tg",
      country: "0",
      cost: 0.20,
      status: "received",
      sms: mockCode.toString(),
      created_at: new Date().toISOString()
    };
  },

  // Cancel order
  cancelOrder: async (orderId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  }
};