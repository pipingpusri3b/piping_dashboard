export default async function handler(req, res) {
  const clientId = process.env.APS_CLIENT_ID;
  const clientSecret = process.env.APS_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: "Missing APS_CLIENT_ID or APS_CLIENT_SECRET" });
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  try {
    const response = await fetch("https://developer.api.autodesk.com/authentication/v2/token", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        scope: "data:read viewables:read",
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
