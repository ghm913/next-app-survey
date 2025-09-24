'use client';

import { useState } from 'react';
import { SurveyFormData, RoofDirection } from './types';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SurveyFormData>({
    propertyType: '' as any,
    roofDirections: [],
    roofAge: '' as any,
    powerConsumption: '' as any,
    energyInterest: '' as any,
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
  const updateFormData = (field: keyof SurveyFormData, value: any) => {
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Solaranlage-Eignungs-Check</h1>
          <p>Finden Sie heraus, ob sich eine Solaranlage für Ihr Dach lohnt</p>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 max-w-3xl">
        {/* Schritt 1: Hauptfragebogen */}
        {currentStep === 1 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">Bitte beantworten Sie die folgenden Fragen:</h2>
            
            {/* Frage 1: Immobilienart */}
            <div className="mb-6">
              <p className="font-medium mb-2">1. Welche Art von Immobilie besitzen Sie? <span className="text-red-500">*</span></p>
              <div className="space-y-2">
                {['Einfamilienhaus', 'Mehrfamilienhaus', 'Gewerbeimmobilie'].map(option => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="propertyType"
                      value={option}
                      checked={formData.propertyType === option}
                      onChange={() => updateFormData('propertyType', option)}
                      className="mr-2"
                      required
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            {/* Frage 2: Dachausrichtung */}
            <div className="mb-6">
              <p className="font-medium mb-2">2. Wie ist Ihr Dach ausgerichtet? <span className="text-red-500">*</span></p>
              <div className="space-y-2">
                {['Süd', 'West', 'Ost', 'Nord', 'Keine Angabe'].map(option => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      name="roofDirections"
                      value={option}
                      checked={formData.roofDirections.includes(option as RoofDirection)}
                      onChange={() => handleCheckboxChange(option as RoofDirection)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            {/* Frage 3: Dachalter */}
            <div className="mb-6">
              <p className="font-medium mb-2">3. Wie alt ist Ihr Dach? <span className="text-red-500">*</span></p>
              <div className="space-y-2">
                {['Unter 5 Jahre', '5–15 Jahre', 'Über 15 Jahre', 'Keine Angabe'].map(option => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="roofAge"
                      value={option}
                      checked={formData.roofAge === option}
                      onChange={() => updateFormData('roofAge', option)}
                      className="mr-2"
                      required
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            {/* Frage 4: Stromverbrauch */}
            <div className="mb-6">
              <p className="font-medium mb-2">4. Wie hoch ist Ihr Stromverbrauch pro Jahr? <span className="text-red-500">*</span></p>
              <div className="space-y-2">
                {['Unter 3.000 kWh', '3.000–5.000 kWh', 'Über 5.000 kWh', 'Keine Angabe'].map(option => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="powerConsumption"
                      value={option}
                      checked={formData.powerConsumption === option}
                      onChange={() => updateFormData('powerConsumption', option)}
                      className="mr-2"
                      required
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            {/* Frage 5: Energielösungen */}
            <div className="mb-6">
              <p className="font-medium mb-2">5. Sind Sie auch an weiteren Energielösungen interessiert? <span className="text-red-500">*</span></p>
              <div className="space-y-2">
                {['Ja', 'Nein', 'Weis nicht'].map(option => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="energyInterest"
                      value={option}
                      checked={formData.energyInterest === option}
                      onChange={() => updateFormData('energyInterest', option)}
                      className="mr-2"
                      required
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button 
                onClick={() => setCurrentStep(2)}
                disabled={!formData.propertyType || formData.roofDirections.length === 0 || !formData.roofAge || !formData.powerConsumption || !formData.energyInterest}
                className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
              >
                Weiter
              </button>
            </div>
          </div>
        )}

        {/* Schritt 2: Kontaktformular */}
        {currentStep === 2 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">Kontaktinformationen (optional)</h2>
            <p className="mb-4 text-gray-600">Für eine kostenlose Ersteinschätzung oder Ertragssimulation können Sie Ihre Kontaktdaten hinterlassen.</p>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  value={formData.contact?.name || ''}
                  onChange={(e) => updateContactData('name', e.target.value)}
                  placeholder="Ihr Name"
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-1">E-Mail</label>
                <input
                  type="email"
                  value={formData.contact?.email || ''}
                  onChange={(e) => updateContactData('email', e.target.value)}
                  placeholder="ihre.email@beispiel.de"
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-1">Telefon</label>
                <input
                  type="tel"
                  value={formData.contact?.phone || ''}
                  onChange={(e) => updateContactData('phone', e.target.value)}
                  placeholder="Ihre Telefonnummer"
                  className="w-full p-2 border rounded"
                />
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
                  {error}
                </div>
              )}
              
              <div className="mt-8 flex justify-between">
                <button 
                  type="button" 
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 bg-gray-200 rounded-md"
                >
                  Zurück
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
                >
                  {isSubmitting ? 'Wird gesendet...' : 'Absenden'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Schritt 3: Ergebnisseite */}
        {currentStep === 3 && result && (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="mb-6">
              {result.isRecommended ? (
                <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : (
                <div className="w-24 h-24 mx-auto bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              )}
            </div>
            
            <h2 className="text-2xl font-bold mb-4">
              {result.isRecommended ? 'Gute Nachrichten!' : 'Danke für Ihre Anfrage'}
            </h2>
            
            <p className="text-lg mb-6">{result.message}</p>
            
            {formData.contact?.email && (
              <p className="text-gray-600 mb-6">
                Wir haben Ihre Kontaktdaten erhalten und werden uns in Kürze bei Ihnen melden.
              </p>
            )}
            
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Neuen Check starten
            </button>
          </div>
        )}
      </main>

      <footer className="bg-gray-100 p-4 mt-8">
        <div className="container mx-auto text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Solaranlage-Eignungs-Check | Alle Angaben ohne Gewähr</p>
        </div>
      </footer>
    </div>
  );
}
