// File: api/ip-lookup.js

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { ip } = request.body;

    if (!ip) {
      return response.status(400).json({ error: 'IP Address atau Domain tidak boleh kosong' });
    }

    // Menggunakan API gratis dari ip-api.com
    const apiResponse = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,regionName,city,zip,lat,lon,timezone,isp,org,as,query`);
    
    const data = await apiResponse.json();

    if (data.status === 'success') {
      // Kirim data yang berhasil didapat
      response.status(200).json(data);
    } else {
      // Kirim pesan error dari API (misal 'invalid query')
      response.status(400).json({ error: data.message || 'Gagal mengambil data IP' });
    }

  } catch (error) {
    console.error('Error fetching IP data:', error.message);
    response.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
}
