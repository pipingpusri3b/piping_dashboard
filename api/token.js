export default async function handler(req, res) {
  const clientId = process.env.APS_CLIENT_ID;
  const clientSecret = process.env.APS_CLIENT_SECRET;

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await fetch('https://developer.api.autodesk.com/authentication/v1/authenticate', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        scope: 'data:read viewables:read',
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`APS Token request failed: ${text}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching token:', err);
    res.status(500).json({ error: err.message });
  }
}
