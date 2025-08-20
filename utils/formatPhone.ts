import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";

// Map readable country names to ISO 2-letter codes
const countryNameToISO: Record<string, CountryCode> = {
  "United States": "US",
  "United Kingdom": "GB",
  "Canada": "CA",
  "Australia": "AU",
  // add more as needed
};

export function formatPhoneNumber(number: string, countryName?: string) {
  try {
    const isoCode = countryName ? countryNameToISO[countryName] : undefined;
    const phone = isoCode
      ? parsePhoneNumberFromString(number, isoCode)
      : parsePhoneNumberFromString(number);

    if (phone) {
      return phone.formatInternational();
    }
  } catch (e) {
    console.error("Phone format error:", e);
  }
  return number;
}
