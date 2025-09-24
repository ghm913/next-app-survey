'use client';

import { useState } from 'react';
import { SurveyFormData, RoofDirection, PropertyType, RoofAge, PowerConsumption, EnergyInterest } from './types';

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
          {/* Schritt 1: Hauptfragebogen */}
          {currentStep === 1 && (
            <div className="flex justify-center w-full mt-0">
              <div className="w-1/8" />
              <div className="w-3/4">
                <div className="bg-transparent p-10">
                  <h2 className="text-2xl font-bold mb-10 text-blue-700 text-center">Bitte beantworten Sie die folgenden Fragen:</h2>
                  
                  {/* Frage 1: Immobilienart */}
                  <div className="mb-10">
                    <p className="font-semibold mb-6 text-xl">1. Welche Art von Immobilie besitzen Sie? <span className="text-red-500">*</span></p>
                    <div className="flex flex-row flex-wrap gap-8">
                      {["Einfamilienhaus", "Mehrfamilienhaus", "Gewerbeimmobilie"].map(option => (
                        <label key={option} className="flex items-center text-xl w-1/4 min-w-[180px] p-4 hover:bg-blue-100 transition cursor-pointer">
                          <input
                            type="radio"
                            name="propertyType"
                            value={option}
                            checked={formData.propertyType === option}
                            onChange={() => updateFormData('propertyType', option)}
                            className="mr-3 w-7 h-7 accent-blue-600"
                            required
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Frage 2: Dachausrichtung */}
                  <div className="mb-10">
                    <p className="font-semibold mb-6 text-lg">2. Wie ist Ihr Dach ausgerichtet? <span className="text-red-500">*</span></p>
                    <div className="flex flex-row flex-wrap gap-8">
                      {["Süd", "West", "Ost", "Nord", "Keine Angabe"].map(option => (
                        <label key={option} className="flex items-center text-lg w-1/4 min-w-[180px] p-4 hover:bg-blue-100 transition cursor-pointer">
                          <input
                            type="checkbox"
                            name="roofDirections"
                            value={option}
                            checked={formData.roofDirections.includes(option as RoofDirection)}
                            onChange={() => handleCheckboxChange(option as RoofDirection)}
                            className="mr-3 w-6 h-6 accent-blue-600"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Frage 3: Dachalter */}
                  <div className="mb-10">
                    <p className="font-semibold mb-6 text-lg">3. Wie alt ist Ihr Dach? <span className="text-red-500">*</span></p>
                    <div className="flex flex-row flex-wrap gap-8">
                      {["Unter 5 Jahre", "5–15 Jahre", "Über 15 Jahre", "Keine Angabe"].map(option => (
                        <label key={option} className="flex items-center text-lg w-1/4 min-w-[180px] p-4 hover:bg-blue-100 transition cursor-pointer">
                          <input
                            type="radio"
                            name="roofAge"
                            value={option}
                            checked={formData.roofAge === option}
                            onChange={() => updateFormData('roofAge', option)}
                            className="mr-3 w-6 h-6 accent-blue-600"
                            required
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Frage 4: Stromverbrauch */}
                  <div className="mb-10">
                    <p className="font-semibold mb-6 text-lg">4. Wie hoch ist Ihr Stromverbrauch pro Jahr? <span className="text-red-500">*</span></p>
                    <div className="flex flex-row flex-wrap gap-8">
                      {["Unter 3.000 kWh", "3.000–5.000 kWh", "Über 5.000 kWh", "Keine Angabe"].map(option => (
                        <label key={option} className="flex items-center text-lg w-1/4 min-w-[180px] p-4 hover:bg-blue-100 transition cursor-pointer">
                          <input
                            type="radio"
                            name="powerConsumption"
                            value={option}
                            checked={formData.powerConsumption === option}
                            onChange={() => updateFormData('powerConsumption', option)}
                            className="mr-3 w-6 h-6 accent-blue-600"
                            required
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Frage 5: Energielösungen */}
                  <div className="mb-10">
                    <p className="font-semibold mb-6 text-lg">5. Sind Sie auch an weiteren Energielösungen interessiert? <span className="text-red-500">*</span></p>
                    <div className="flex flex-row flex-wrap gap-8">
                      {["Ja", "Nein", "Weis nicht"].map(option => (
                        <label key={option} className="flex items-center text-lg w-1/4 min-w-[180px] p-4 hover:bg-blue-100 transition cursor-pointer">
                          <input
                            type="radio"
                            name="energyInterest"
                            value={option}
                            checked={formData.energyInterest === option}
                            onChange={() => updateFormData('energyInterest', option)}
                            className="mr-3 w-6 h-6 accent-blue-600"
                            required
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mt-16 flex justify-center">
                    <button
                      onClick={() => setCurrentStep(2)}
                      disabled={
                        !formData.propertyType ||
                        formData.roofDirections.length === 0 ||
                        !formData.roofAge ||
                        !formData.powerConsumption ||
                        !formData.energyInterest
                      }
                      className="px-40 py-12 text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-3xl shadow-xl hover:scale-105 transition disabled:opacity-50"
                    >
                      Weiter
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-1/8" />
            </div>
          )}

          {/* Schritt 2: Kontaktformular */}
          {currentStep === 2 && (
            <div className="flex justify-center w-full mt-0">
              <div className="w-1/8" />
              <div className="w-3/4">
                <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-700">Kontaktinformationen (optional)</h2>
                <p className="mb-8 text-gray-600 text-2xl text-center">
                  Für eine kostenlose Ersteinschätzung oder Ertragssimulation können Sie Ihre Kontaktdaten hinterlassen.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-6 mb-8 items-center">
                    <div className="w-1/2">
                      <label className="block mb-2 text-lg font-medium">Name</label>
                      <input
                        type="text"
                        value={formData.contact?.name || ''}
                        onChange={(e) => updateContactData('name', e.target.value)}
                        placeholder="Ihr Name"
                        className="w-full p-4 border-2 rounded-xl focus:outline-none focus:border-blue-400 text-lg bg-gray-50"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block mb-2 text-lg font-medium">E-Mail</label>
                      <input
                        type="email"
                        value={formData.contact?.email || ''}
                        onChange={(e) => updateContactData('email', e.target.value)}
                        placeholder="ihre.email@beispiel.de"
                        className="w-full p-4 border-2 rounded-xl focus:outline-none focus:border-blue-400 text-lg bg-gray-50"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block mb-2 text-lg font-medium">Telefon</label>
                      <input
                        type="tel"
                        value={formData.contact?.phone || ''}
                        onChange={(e) => updateContactData('phone', e.target.value)}
                        placeholder="Ihre Telefonnummer"
                        className="w-full p-4 border-2 rounded-xl focus:outline-none focus:border-blue-400 text-lg bg-gray-50"
                      />
                    </div>
                  </div>
                  {error && (
                    <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-xl">
                      {error}
                    </div>
                  )}
                  <div className="mt-10 flex justify-center gap-8">
                    <button 
                      type="button" 
                      onClick={() => setCurrentStep(1)}
                      className="px-20 py-8 text-2xl font-bold bg-gray-200 rounded-2xl hover:bg-gray-300 transition"
                    >
                      Zurück
                    </button>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="px-20 py-8 text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-2xl shadow-lg hover:scale-105 transition disabled:opacity-50"
                    >
                      {isSubmitting ? 'Wird gesendet...' : 'Absenden'}
                    </button>
                  </div>
                </form>
              </div>
              <div className="w-1/8" />
            </div>
          )}

          {/* Schritt 3: Ergebnisseite */}
          {currentStep === 3 && result && (
            <div className="p-10 text-center">
              <h2 className="text-3xl font-extrabold mb-8 text-blue-700">
                {result.isRecommended ? 'Gute Nachrichten!' : 'Danke für Ihre Anfrage'}
              </h2>
              
              <p className="text-xl mb-8">{result.message}</p>
              
              {formData.contact?.email && (
                <p className="text-gray-600 mb-8 text-lg">
                  Wir haben Ihre Kontaktdaten erhalten und werden uns in Kürze bei Ihnen melden.
                </p>
              )}

              <div className="flex justify-center mb-10">
                <button 
                  onClick={() => window.location.reload()}
                  className="px-20 py-8 text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-2xl shadow-lg hover:scale-105 transition"
                >
                  Neuen Check starten
                </button>
              </div>

              <div className="mb-8">
                {result.isRecommended ? (
                  <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
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
