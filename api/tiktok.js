// File: api/tiktok.js
import { getVideo } from 'tiktok-grabber-without-watermark';

export default async function handler(request, response) {
  // Hanya izinkan metode POST
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { url } = request.body;

    if (!url || !url.includes('tiktok.com')) {
      return response.status(400).json({ error: 'URL TikTok tidak valid' });
    }

    // Panggil library untuk mengambil video
    const result = await getVideo(url);

    if (result && result.download_url) {
      // Kirim kembali link download video tanpa watermark
      response.status(200).json({ downloadUrl: result.download_url });
    } else {
      throw new Error('Tidak dapat menemukan video tanpa watermark.');
    }

  } catch (error) {
    console.error('Error fetching TikTok video:', error.message);
    response.status(500).json({ error: 'Gagal mengambil video TikTok.' });
  }
}
