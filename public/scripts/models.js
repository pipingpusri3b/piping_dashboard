// Contoh models.js
function getUrnForCurrentPage() {
  const path = window.location.pathname.toLowerCase();

  const models = {
    "/Construction/rwi.html": "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bXlwbGFudDNkMjAyNTA5MDYvOTcwMDAubndk",  // contoh
    "/Construction/interconnecting.html": "dXJuOmFkc2sub2JqZWN0czpvcy5ldS1jZW50cmFsLTEuLi4=",
    // tambahkan lainnya
  };

  return models[path];
}
