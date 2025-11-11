import { initializeViewer } from "./utils.js";

async function initViewer() {
  const container = document.getElementById("viewer");
  const urn = getUrnForCurrentPage(); // ambil dari models.js

  if (!urn) {
    console.error("Model belum tersedia untuk halaman ini.");
    container.innerHTML = "<p>Model belum tersedia untuk halaman ini.</p>";
    return;
  }

  try {
    const tokenResponse = await fetch("/api/token");
    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) throw new Error("Token kosong atau invalid.");

    const options = {
      env: "AutodeskProduction",
      api: "streamingV2",
      getAccessToken: (onTokenReady) => {
        onTokenReady(tokenData.access_token, tokenData.expires_in);
      },
    };

    Autodesk.Viewing.Initializer(options, async () => {
      const viewer = new Autodesk.Viewing.GuiViewer3D(container);
      const startedCode = viewer.start();
      if (startedCode > 0) {
        throw new Error("Viewer gagal start: " + startedCode);
      }

      Autodesk.Viewing.Document.load(
        "urn:" + urn,
        (doc) => {
          const viewables = doc.getRoot().getDefaultGeometry();
          viewer.loadDocumentNode(doc, viewables).then(() => {
            console.log("✅ Model berhasil dimuat.");
          });
        },
        (errCode, errMsg) => {
          throw new Error(`Gagal memuat dokumen (${errCode}): ${errMsg}`);
        }
      );
    });
  } catch (err) {
    console.error("Kesalahan saat inisialisasi viewer:", err);
    container.innerHTML = `<p>Kesalahan saat inisialisasi viewer: ${err.message}</p>`;
  }
}

document.addEventListener("DOMContentLoaded", initViewer);
