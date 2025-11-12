function getUrnForCurrentPage() {
  const path = window.location.pathname.toLowerCase();
  console.log("🧭 Current path:", path);

  const models = {
    "/": "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bXlwbGFudDNkMjAyNTA5MDYvOTcwMDAubndk", // model utama di index.html
    "/index.html": "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bXlwbGFudDNkMjAyNTA5MDYvOTcwMDAubndk", // fallback jika dibuka secara langsung
    "/construction/rwi": "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bXlwbGFudDNkMjAyNTA5MDYvOTcwMDAubndk",
    "/construction/rwi.html": "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bXlwbGFudDNkMjAyNTA5MDYvOTcwMDAubndk",
    "/construction/interconnecting": "dXJuOmFkc2sub2JqZWN0czpvcy5ldS1jZW50cmFsLTEuLi4=",
    "/construction/interconnecting.html": "dXJuOmFkc2sub2JqZWN0czpvcy5ldS1jZW50cmFsLTEuLi4=",
  };

  const urn = models[path];
  if (!urn) console.warn("⚠️ URN tidak ditemukan untuk path:", path);
  return urn;
}
