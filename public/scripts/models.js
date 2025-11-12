function getUrnForCurrentPage() {
  const path = window.location.pathname.toLowerCase();

  const models = {
    "/construction/rwi.html": "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bXlwbGFudDNkMjAyNTA5MDYvOTcwMDAubndk.",
    "/construction/rwi": "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bXlwbGFudDNkMjAyNTA5MDYvOTcwMDAubndk", // ✅ clean URL support

    "/construction/interconnecting.html": "dXJuOmFkc2sub2JqZWN0czpv...",
    "/construction/interconnecting": "dXJuOmFkc2sub2JqZWN0czpv...",

    "/construction/wtp.html": "dXJuOmFkc2sub2JqZWN0czpv...",
    "/construction/wtp": "dXJuOmFkc2sub2JqZWN0czpv...",

    "/construction/cooling-tower.html": "dXJuOmFkc2sub2JqZWN0czpv...",
    "/construction/cooling-tower": "dXJuOmFkc2sub2JqZWN0czpv..."
  };


  return models[path] || null;
}
