// File: api/tiktok.js
import { tiktokdl } from '@bochilteam/scraper';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { url } = request.body;

    if (!url || !url.includes('tiktok.com')) {
      return response.status(400).json({ error: 'URL TikTok tidak valid' });
    }

    // Menggunakan library @bochilteam/scraper
    const result = await tiktokdl(url);
    
    // Mencari link video tanpa watermark (bisa di 'no_watermark' atau 'no_watermark_hd')
    const videoUrl = result?.video?.no_watermark_hd || result?.video?.no_watermark;

    if (videoUrl) {
      // Kirim kembali link download video tanpa watermark
      response.status(200).json({ downloadUrl: videoUrl });
    } else {
      throw new Error('Tidak dapat menemukan link download tanpa watermark.');
    }

  } catch (error) {
    console.error('Error fetching TikTok video:', error.message);
    response.status(500).json({ error: 'Gagal mengambil video TikTok. URL mungkin tidak valid atau video bersifat pribadi.' });
  }
}
