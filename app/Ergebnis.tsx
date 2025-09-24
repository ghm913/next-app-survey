import React from 'react';
import { SurveyFormData } from './types';

export default function Ergebnis({ result, formData }: {
  result: { isRecommended: boolean; message: string },
  formData: SurveyFormData
}) {
  return (
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
          <div className="w-10 h-10 mx-auto bg-green-100 rounded-full flex items-center justify-center" style={{ width: '10rem', height: '10rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" style={{ width: '5rem', height: '5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : (
          <div className="w-10 h-10 mx-auto bg-yellow-100 rounded-full flex items-center justify-center" style={{ width: '10rem', height: '10rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" style={{ width: '5rem', height: '5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}