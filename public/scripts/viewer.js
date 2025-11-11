// scripts/viewer.js
import { API_URL } from "./config.js";
import { MODELS } from "./models.js";

/**
 * Ambil token APS dari API backend (Vercel)
 */
async function getAccessToken() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`Token fetch failed: ${res.status}`);
    const data = await res.json();
    return { access_token: data.access_token, expires_in: data.expires_in };
  } catch (err) {
    showMessage(`Gagal mengambil token: ${err.message}`, true);
    throw err;
  }
}

/**
 * Tampilkan pesan di area viewer
 */
function showMessage(message, isError = false) {
  const viewerDiv = document.getElementById("forgeViewer");
  viewerDiv.innerHTML = `
    <div style="
      display:flex;
      align-items:center;
      justify-content:center;
      height:100%;
      color:${isError ? '#ff4d4d' : '#333'};
      font-family:sans-serif;
      text-align:center;
      font-size:1.2em;
      padding:20px;
    ">
      ${message}
    </div>
  `;
}

/**
 * Inisialisasi viewer Autodesk
 */
async function initViewer() {
  const viewerDiv = document.getElementById("forgeViewer");

  if (!viewerDiv) {
    console.error("Element #forgeViewer tidak ditemukan di halaman.");
    return;
  }

  // Deteksi halaman berdasarkan path
  const htmlPath = window.location.pathname;
  const parts = htmlPath.split("/").filter(Boolean);
  // contoh: /construction/rwi.html → ['construction', 'rwi.html']
  const section = parts[0];
  const page = parts[1]?.replace(".html", "");

  if (!section || !page) {
    showMessage("Struktur URL tidak valid. Pastikan halaman di bawah /construction/ atau /commissioning/", true);
    return;
  }

  // Ambil URN dari file models.js
  const urn = MODELS[section]?.[page];

  if (!urn) {
    showMessage(`Model belum tersedia untuk halaman: <b>${section}/${page}</b>`);
    return;
  }

  try {
    const token = await getAccessToken();

    const options = {
      env: "AutodeskProduction",
      getAccessToken: (onTokenReady) => {
        onTokenReady(token.access_token, token.expires_in);
      }
    };

    Autodesk.Viewing.Initializer(options, () => {
      const viewer = new Autodesk.Viewing.GuiViewer3D(viewerDiv, {});

      const startedCode = viewer.start();
      if (startedCode > 0) {
        showMessage(`Viewer gagal dimulai (kode: ${startedCode})`, true);
        return;
      }

      showMessage("Memuat model...", false);

      Autodesk.Viewing.Document.load(
        urn,
        (doc) => {
          const viewable = doc.getRoot().getDefaultGeometry();
          viewer.loadDocumentNode(doc, viewable);
        },
        (errCode) => {
          showMessage(`Gagal memuat model (kode: ${errCode})`, true);
        }
      );
    });
  } catch (err) {
    showMessage(`Kesalahan saat inisialisasi viewer: ${err.message}`, true);
  }
}

initViewer();
