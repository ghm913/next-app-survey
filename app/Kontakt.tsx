import React from 'react';
import { SurveyFormData } from './types';

export default function Kontakt({ formData, updateContactData, handleSubmit, isSubmitting, error, setCurrentStep }: {
  formData: SurveyFormData,
  updateContactData: (field: keyof SurveyFormData['contact'], value: string) => void,
  handleSubmit: (e: React.FormEvent) => void,
  isSubmitting: boolean,
  error: string | null,
  setCurrentStep: (step: number) => void
}) {
  return (
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
  );
}