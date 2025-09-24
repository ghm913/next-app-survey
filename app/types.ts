export type PropertyType = 'Einfamilienhaus' | 'Mehrfamilienhaus' | 'Gewerbeimmobilie';
export type RoofDirection = 'Süd' | 'West' | 'Ost' | 'Nord' | 'Keine Angabe';
export type RoofAge = 'Unter 5 Jahre' | '5–15 Jahre' | 'Über 15 Jahre' | 'Keine Angabe';
export type PowerConsumption = 'Unter 3.000 kWh' | '3.000–5.000 kWh' | 'Über 5.000 kWh' | 'Keine Angabe';
export type EnergyInterest = 'Ja' | 'Nein' | 'Weis nicht';

export interface SurveyFormData {
  propertyType: PropertyType;
  roofDirections: RoofDirection[];
  roofAge: RoofAge;
  powerConsumption: PowerConsumption;
  energyInterest: EnergyInterest;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
}