import Tesseract from 'tesseract.js';
import { parseNumbers } from '../parsing/numberParser';

export const extractNumbersFromImage = async (canvas) => {
  try {
    const { data: { text } } = await Tesseract.recognize(canvas, 'eng', {
      logger: m => console.log(m)
    });
    
    const numbers = parseNumbers(text);
    
    if (numbers.length === 0) {
      throw new Error('No numbers detected in image');
    }
    
    return numbers;
  } catch (error) {
    console.error('OCR processing error:', error);
    throw new Error('Failed to extract numbers from image');
  }
};