export default async function handler(req, res) {
  const clientId = process.env.APS_CLIENT_ID;
  const clientSecret = process.env.APS_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: "Missing APS_CLIENT_ID or APS_CLIENT_SECRET" });
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  try {
    const res = await fetch("https://developer.api.autodesk.eu/authentication/v2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
    grant_type: "client_credentials",
    client_id: process.env.APS_CLIENT_ID,
    client_secret: process.env.APS_CLIENT_SECRET,
    scope: "data:read",
  }),
});

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`APS Token request failed (${response.status}): ${text}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error fetching token:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
