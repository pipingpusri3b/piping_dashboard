// api/token.js
import fetch from "node-fetch";

let cachedToken = null;
let tokenExpiry = 0; // timestamp (ms)

export default async function handler(req, res) {
  const now = Date.now();

  if (cachedToken && now < tokenExpiry) {
    return res.status(200).json(cachedToken);
  }

  try {
    const credentials = Buffer.from(
      `${process.env.APS_CLIENT_ID}:${process.env.APS_CLIENT_SECRET}`
    ).toString("base64");

    const response = await fetch("https://developer.api.autodesk.com/authentication/v1/authenticate", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "grant_type=client_credentials&scope=data:read"
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("APS token error:", data);
      return res.status(500).json({ error: "Failed to get token" });
    }

    cachedToken = data;
    tokenExpiry = now + data.expires_in * 1000 - 60000; // refresh 1 menit sebelum expired

    return res.status(200).json(data);
  } catch (err) {
    console.error("Token error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

