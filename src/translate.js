import axios from 'axios';

export async function translateText(text, target = 'en') {
  try {
    const res = await axios.post('https://libretranslate.de/translate', {
      q: text,
      source: 'auto',
      target,
      format: 'text'
    }, {
      headers: { 'Content-Type': 'application/json' }
    });
    return res.data.translatedText;
  } catch (e) {
    console.error(e);
    return text;
  }
}