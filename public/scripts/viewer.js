async function initViewer() {
  const container = document.getElementById("viewer");

  if (!container) {
    console.error("Elemen #viewer tidak ditemukan di halaman.");
    return;
  }

  // Ambil URN dari models.js (pastikan models.js sudah di-load dulu di HTML)
  const urn = getUrnForCurrentPage();
  if (!urn) {
    container.innerHTML = "<p>Model belum tersedia untuk halaman ini.</p>";
    console.warn("Model belum tersedia untuk halaman:", window.location.pathname);
    return;
  }

  try {
    // Ambil token dari API Vercel (harusnya diarahkan ke EU di /api/token)
    const tokenResponse = await fetch("/api/token");
    if (!tokenResponse.ok) throw new Error("Gagal fetch token");
    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) throw new Error("Token kosong atau invalid");

    console.log("✅ Token berhasil didapat dari EU API");

    // Gunakan environment & API region EU
    const options = {
      env: "AutodeskProduction2",  // 🔹 environment untuk EU
      api: "derivativeV2_EU",      // 🔹 API EU
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

      console.log("🚀 Viewer berhasil dimulai, memuat model...");

      Autodesk.Viewing.Document.load(
        "urn:" + urn,
        (doc) => {
          const defaultModel = doc.getRoot().getDefaultGeometry();
          viewer.loadDocumentNode(doc, defaultModel).then(() => {
            console.log("✅ Model berhasil dimuat:", urn);
          });
        },
        (errCode, errMsg) => {
          console.error(`❌ Gagal memuat dokumen (${errCode}): ${errMsg}`);
          container.innerHTML = `<p>Gagal memuat model.<br>Periksa URN atau status translasi di region EU.</p>`;
        }
      );
    });
  } catch (err) {
    console.error("❌ Kesalahan saat inisialisasi viewer:", err);
    container.innerHTML = `<p>Kesalahan saat inisialisasi viewer: ${err.message}</p>`;
  }
}

document.addEventListener("DOMContentLoaded", initViewer);
