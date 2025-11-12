const models = {
  "/construction/rwi.html": "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bXlwbGFudDNkMjAyNTA5MDYvOTcwMDAubndk",
  "/construction/rwi": "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bXlwbGFudDNkMjAyNTA5MDYvOTcwMDAubndk",
  "/construction/wtp.html": "dXJuOmFkc2sub2JqZWN0czpvZ...",
  "/construction/wtp": "dXJuOmFkc2sub2JqZWN0czpvZ..."
};

function getUrnForCurrentPage() {
  const path = window.location.pathname.toLowerCase();
  const cleanPath = path.endsWith(".html") ? path : path + ".html";
  return models[path] || models[cleanPath];
}
