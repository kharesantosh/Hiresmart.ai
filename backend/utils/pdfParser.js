// backend/utils/pdfParser.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let pdfParse;

// Lazy load pdf-parse to avoid initialization errors
export const parsePDF = async (dataBuffer) => {
  if (!pdfParse) {
    // Dynamically import pdf-parse only when needed
    const pdfParseModule = await import('pdf-parse/lib/pdf-parse.js');
    pdfParse = pdfParseModule.default;
  }
  
  return await pdfParse(dataBuffer);
};