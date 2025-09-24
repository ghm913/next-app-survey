import React from 'react';
import { SurveyFormData, RoofDirection } from './types';

export default function Fragen({
  formData,
  updateFormData,
  handleCheckboxChange,
  setCurrentStep,
}: {
  formData: SurveyFormData;
  updateFormData: (field: keyof SurveyFormData, value: string | string[]) => void;
  handleCheckboxChange: (value: RoofDirection) => void;
  setCurrentStep: (step: number) => void;
}) {
  return (
    <div className="flex justify-center w-full mt-0">
      <div className="w-1/8" />
      <div className="w-3/4">
        <div className="bg-transparent p-10">
          <h2 className="text-2xl font-bold mb-10 text-blue-700 text-center">
            Bitte beantworten Sie die folgenden Fragen:
          </h2>

          {/* Frage 1: Immobilienart */}
          <div className="mb-10">
            <p className="font-semibold mb-6 text-xl">
              1. Welche Art von Immobilie besitzen Sie? <span className="text-red-500">*</span>
            </p>
            <div className="flex flex-row flex-wrap gap-8">
              {["Einfamilienhaus", "Mehrfamilienhaus", "Gewerbeimmobilie"].map(option => (
                <label
                  key={option}
                  className="flex items-center text-xl w-1/4 min-w-[180px] p-4 hover:bg-blue-100 transition cursor-pointer"
                >
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
            <p className="font-semibold mb-6 text-lg">
              2. Wie ist Ihr Dach ausgerichtet? <span className="text-red-500">*</span>
            </p>
            <div className="flex flex-row flex-wrap gap-8">
              {["Süd", "West", "Ost", "Nord", "Keine Angabe"].map(option => (
                <label
                  key={option}
                  className="flex items-center text-lg w-1/4 min-w-[180px] p-4 hover:bg-blue-100 transition cursor-pointer"
                >
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
            <p className="font-semibold mb-6 text-lg">
              3. Wie alt ist Ihr Dach? <span className="text-red-500">*</span>
            </p>
            <div className="flex flex-row flex-wrap gap-8">
              {["Unter 5 Jahre", "5–15 Jahre", "Über 15 Jahre", "Keine Angabe"].map(option => (
                <label
                  key={option}
                  className="flex items-center text-lg w-1/4 min-w-[180px] p-4 hover:bg-blue-100 transition cursor-pointer"
                >
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
            <p className="font-semibold mb-6 text-lg">
              4. Wie hoch ist Ihr Stromverbrauch pro Jahr? <span className="text-red-500">*</span>
            </p>
            <div className="flex flex-row flex-wrap gap-8">
              {["Unter 3.000 kWh", "3.000–5.000 kWh", "Über 5.000 kWh", "Keine Angabe"].map(option => (
                <label
                  key={option}
                  className="flex items-center text-lg w-1/4 min-w-[180px] p-4 hover:bg-blue-100 transition cursor-pointer"
                >
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
            <p className="font-semibold mb-6 text-lg">
              5. Sind Sie auch an weiteren Energielösungen interessiert? <span className="text-red-500">*</span>
            </p>
            <div className="flex flex-row flex-wrap gap-8">
              {["Ja", "Nein", "Weis nicht"].map(option => (
                <label
                  key={option}
                  className="flex items-center text-lg w-1/4 min-w-[180px] p-4 hover:bg-blue-100 transition cursor-pointer"
                >
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
  );
}