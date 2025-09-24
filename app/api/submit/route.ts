import { NextRequest, NextResponse } from 'next/server';
import { SurveyFormData } from '../../types';

export async function POST(request: NextRequest) {
  try {
    const data: SurveyFormData = await request.json();
    
    // Validierung
    if (!data.propertyType || !data.roofDirections || !data.roofDirections.length || 
        !data.roofAge || !data.powerConsumption || !data.energyInterest) {
      return NextResponse.json({ error: 'Alle Pflichtfelder müssen ausgefüllt sein' }, { status: 400 });
    }
    
    // Zufällige Antwort (Ja/Nein) generieren
    const isRecommended = Math.random() >= 0.5;
    
    return NextResponse.json({ 
      isRecommended,
      message: isRecommended 
        ? 'Basierend auf Ihren Angaben könnte sich eine Solaranlage für Ihr Dach lohnen!' 
        : 'Basierend auf Ihren Angaben könnte eine Solaranlage für Ihr Dach weniger geeignet sein.'
    });
  } catch (error) {
    console.error('Fehler bei der Verarbeitung:', error);
    return NextResponse.json({ error: 'Serverfehler bei der Verarbeitung' }, { status: 500 });
  }
}