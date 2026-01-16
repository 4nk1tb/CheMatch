
import { WasteItem } from "../types";

/**
 * Servicio de simulación para entorno de demo.
 * Elimina la dependencia de API_KEY para despliegues rápidos de prueba.
 */

export const analyzeCompatibility = async (item: WasteItem, userCountry: string) => {
  // Simulamos un pequeño retraso para mantener la sensación de "procesamiento"
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return { 
    score: item.compatibilityScore, 
    reasoning: "Análisis técnico completado: Compatible con normativas de " + userCountry 
  };
};

export const generateLegalDraft = async (item: WasteItem, company: string, country: string) => {
  return `BORRADOR DE TRANSFERENCIA DE RESIDUOS (DEMO)
-----------------------------------------------
FECHA: ${new Date().toLocaleDateString()}
RESIDUO: ${item.name}
ORIGEN: ${item.generator}
DESTINO: ${company}
JURISDICCIÓN: ${country}

Este documento es una simulación generada por el motor ChemMatch para fines de demostración técnica de la interfaz de usuario.`;
};
