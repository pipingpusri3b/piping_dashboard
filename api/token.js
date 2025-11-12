export default async function handler(req, res) {
  try {
    const response = await fetch("https://developer.api.autodesk.eu/authentication/v2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.APS_CLIENT_ID,
        client_secret: process.env.APS_CLIENT_SECRET,
        scope: "data:read",
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Token API gagal: ${text}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Gagal mendapatkan token:", err);
    res.status(500).json({ error: err.message });
  }
}
