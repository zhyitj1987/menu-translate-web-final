import Tesseract from 'tesseract.js';

export async function recognizeText(file) {
  const { data: { text } } = await Tesseract.recognize(file, 'chi_sim+eng');
  return text;
}