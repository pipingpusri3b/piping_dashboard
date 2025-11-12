function getUrnForCurrentPage() {
  const path = window.location.pathname.toLowerCase();

  const models = {
    "/index.html": "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bXlwbGFudDNkMjAyNTA5MDYvOTcwMDAubndk", // contoh URN
    "/construction/rwi.html": "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bXlwbGFudDNkMjAyNTA5MDYvOTcwMDAubndk",
    "/construction/interconnecting.html": "dXJuOmFkc2sub2JqZWN0czpvcy5ldS1jZW50cmFsLTEuLi4=",
    // tambahkan lainnya
  };

  return models[path];
}
