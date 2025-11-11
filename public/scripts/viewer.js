import { initializeViewer } from "./utils.js";

async function initViewer() {
  const container = document.getElementById("viewer");
  const urn = getUrnForCurrentPage(); // ambil dari models.js
  const tokenResponse = await fetch("/api/token");
  const tokenData = await tokenResponse.json();

  try {
    await initializeViewer(container, urn, tokenData);
  } catch (err) {
    console.error("Kesalahan saat inisialisasi viewer:", err);
  }
}

document.addEventListener("DOMContentLoaded", initViewer);
