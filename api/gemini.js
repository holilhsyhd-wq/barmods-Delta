// File: api/gemini.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Ambil API key dari Vercel Environment Variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(request, response) {
  // Hanya izinkan metode POST
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Ambil prompt dari body request
    const { prompt } = request.body;

    if (!prompt) {
      return response.status(400).json({ error: 'Prompt tidak boleh kosong' });
    }

    // Inisialisasi model
    const model = genAI.getGenerativeModel("gemini-1.5-flash");

    // Hasilkan konten
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Kirim balasan
    response.status(200).json({ reply: text });

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    response.status(500).json({ error: 'Gagal menghubungi AI' });
  }
}
