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

  // Ambil token dari backend (token.js)
  let tokenData;
  try {
    const res = await fetch("/api/token");
    if (!res.ok) throw new Error("Gagal mengambil token dari server");
    tokenData = await res.json();
  } catch (err) {
    console.error("❌ Gagal mendapatkan token:", err);
    container.innerHTML = `<p>Gagal mengambil token dari server.</p>`;
    return;
  }

  // Viewer options untuk region EU
  const options = {
    env: "AutodeskProduction2", // region EU
    api: "derivativeV2_EU",     // region EU
    getAccessToken: (onTokenReady) => {
      onTokenReady(tokenData.access_token, tokenData.expires_in);
    },
  };

  // Inisialisasi viewer
  Autodesk.Viewing.Initializer(options, () => {
    const viewer = new Autodesk.Viewing.GuiViewer3D(container);
    viewer.start();

    console.log("🚀 Viewer dimulai, memuat model:", urn);

    Autodesk.Viewing.Document.load(
      `urn:${urn}`,
      (doc) => {
        const defaultModel = doc.getRoot().getDefaultGeometry();
        viewer.loadDocumentNode(doc, defaultModel);
        console.log("✅ Model berhasil dimuat:", urn);
      },
      (errCode, errMsg) => {
        console.error("❌ Gagal memuat model:", errCode, errMsg);
        container.innerHTML = `<p>Gagal memuat model.<br>Pastikan URN dan region benar.</p>`;
      }
    );
  });
}

document.addEventListener("DOMContentLoaded", initViewer);
