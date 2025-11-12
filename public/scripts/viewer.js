async function initViewer() {
  const container = document.getElementById("viewer");

  if (!container) {
    console.error("Elemen #viewer tidak ditemukan di halaman.");
    return;
  }

  // Ambil URN dari models.js
  const urn = getUrnForCurrentPage();
  if (!urn) {
    container.innerHTML = "<p>Model belum tersedia untuk halaman ini.</p>";
    console.warn("Model belum tersedia untuk halaman:", window.location.pathname);
    return;
  }

  try {
    // Ambil token dari API (sudah benar di Vercel)
    const tokenResponse = await fetch("/api/token");
    if (!tokenResponse.ok) throw new Error("Gagal fetch token");
    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) throw new Error("Token kosong atau invalid");

    console.log("✅ Token berhasil didapat");

    // 🟢 Ubah ENV & API ke region EU
    const options = {
      env: "AutodeskProduction2",
      api: "derivativeV2_EU",
      getAccessToken: (onTokenReady) => {
        onTokenReady(tokenData.access_token, tokenData.expires_in);
      },
    };

    Autodesk.Viewing.Initializer(options, () => {
      const viewer = new Autodesk.Viewing.GuiViewer3D(container);
      const startedCode = viewer.start();
      if (startedCode > 0) {
        console.error("Viewer gagal start:", startedCode);
        return;
      }

      console.log("🚀 Viewer dimulai, memuat model...");

      // 🟢 Gunakan URN dengan prefix 'urn:'
      Autodesk.Viewing.Document.load(
        `urn:${urn}`,
        (doc) => {
          const defaultModel = doc.getRoot().getDefaultGeometry();
          viewer.loadDocumentNode(doc, defaultModel).then(() => {
            console.log("✅ Model berhasil dimuat:", urn);
          });
        },
        (errCode, errMsg) => {
          console.error(`❌ Gagal memuat dokumen (${errCode}): ${errMsg}`);
          container.innerHTML = `<p>Gagal memuat model.<br>Periksa URN atau status translasi.</p>`;
        }
      );
    });
  } catch (err) {
    console.error("❌ Kesalahan saat inisialisasi viewer:", err);
    container.innerHTML = `<p>Kesalahan saat inisialisasi viewer: ${err.message}</p>`;
  }
}

document.addEventListener("DOMContentLoaded", initViewer);
