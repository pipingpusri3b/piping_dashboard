// scripts/viewer.js
import { API_URL } from "./config.js";
import { MODELS } from "./models.js";

async function getAccessToken() {
  const res = await fetch(API_URL);
  const data = await res.json();
  return { access_token: data.access_token, expires_in: data.expires_in };
}

async function initViewer() {
  const token = await getAccessToken();

  const options = {
    env: "AutodeskProduction",
    getAccessToken: (onTokenReady) => {
      onTokenReady(token.access_token, token.expires_in);
    }
  };

  Autodesk.Viewing.Initializer(options, () => {
    const htmlPath = window.location.pathname;
    const parts = htmlPath.split("/").filter(Boolean);
    // contoh: /construction/rwi.html → ['construction', 'rwi.html']
    const section = parts[0];
    const page = parts[1]?.replace(".html", "");

    const urn = MODELS[section]?.[page];
    if (!urn) {
      console.error("Model URN not found for this page:", section, page);
      return;
    }

    const viewerDiv = document.getElementById("forgeViewer");
    const viewer = new Autodesk.Viewing.GuiViewer3D(viewerDiv);
    viewer.start();

    Autodesk.Viewing.Document.load(urn, (doc) => {
      const viewable = doc.getRoot().getDefaultGeometry();
      viewer.loadDocumentNode(doc, viewable);
    }, (errCode) => {
      console.error("Error loading document:", errCode);
    });
  });
}

initViewer();

