export async function initializeViewer(container, urn, token) {
  const options = {
    env: "AutodeskProduction",
    api: "streamingV2",
    getAccessToken: (onTokenReady) => {
      onTokenReady(token.access_token, token.expires_in);
    },
  };

  return new Promise((resolve, reject) => {
    Autodesk.Viewing.Initializer(options, () => {
      const viewer = new Autodesk.Viewing.GuiViewer3D(container);
      const startedCode = viewer.start();
      if (startedCode > 0) {
        reject(new Error("Viewer gagal start: " + startedCode));
        return;
      }

      Autodesk.Viewing.Document.load(
        "urn:" + urn,
        (doc) => {
          const defaultModel = doc.getRoot().getDefaultGeometry();
          viewer.loadDocumentNode(doc, defaultModel).then(() => {
            resolve(viewer);
          });
        },
        (code, message) => {
          reject(new Error(`Gagal memuat dokumen (${code}): ${message}`));
        }
      );
    });
  });
}

