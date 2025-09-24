'use client';

import { useState } from 'react';
import { SurveyFormData, RoofDirection, PropertyType, RoofAge, PowerConsumption, EnergyInterest } from './types';
import Fragen from './Fragen';
import Kontakt from './Kontakt';
import Erbebnis from './Ergebnis';
import Ergebnis from './Ergebnis';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SurveyFormData>({
    propertyType: '' as PropertyType,
    roofDirections: [],
    roofAge: '' as RoofAge,
    powerConsumption: '' as PowerConsumption,
    energyInterest: '' as EnergyInterest,
    contact: {
      name: '',
      email: '',
      phone: ''
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ isRecommended: boolean; message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ein Fehler ist aufgetreten');
      }

      setResult(data);
      setCurrentStep(3); // Ergebnisseite
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein unbekannter Fehler ist aufgetreten');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Hilfsfunktionen für Formularaktualisierungen
  const updateFormData = (field: keyof SurveyFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateContactData = (field: keyof typeof formData.contact, value: string) => {
    setFormData(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value }
    }));
  };

  const handleCheckboxChange = (value: RoofDirection) => {
    const currentDirections = [...formData.roofDirections];
    if (currentDirections.includes(value)) {
      updateFormData('roofDirections', currentDirections.filter(dir => dir !== value));
    } else {
      updateFormData('roofDirections', [...currentDirections, value]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col">
      <header className="bg-blue-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-10 flex flex-col items-center">
          <h1 className="text-5xl font-extrabold mb-4 text-center drop-shadow-lg">Solaranlage-Eignungs-Check</h1>
          <p className="text-xl text-center font-medium">Finden Sie heraus, ob sich eine Solaranlage für Ihr Dach lohnt</p>
        </div>
      </header>

      <main className="flex-1 flex justify-center items-start">
        <div className="w-full max-w-3xl mx-auto">
          {currentStep === 1 && (
            <Fragen
              formData={formData}
              updateFormData={updateFormData}
              handleCheckboxChange={handleCheckboxChange}
              setCurrentStep={setCurrentStep}
            />
          )}

          {currentStep === 2 && (
            <Kontakt
              formData={formData}
              updateContactData={updateContactData}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              error={error}
              setCurrentStep={setCurrentStep}
            />
          )}

          {currentStep === 3 && result && (
            <Ergebnis
              result={result}
              formData={formData}
            />
          )}
        </div>
      </main>

      <footer className="bg-blue-700 text-white p-6 mt-8 shadow-inner">
        <div className="container mx-auto text-center text-white text-sm">
          <p>© {new Date().getFullYear()} Solaranlage-Eignungs-Check | Alle Angaben ohne Gewähr</p>
        </div>
      </footer>
    </div>
  );
}
