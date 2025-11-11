function getUrnForCurrentPage() {
  const path = window.location.pathname.toLowerCase();

  const models = {
    "/Construction/rwi.html": "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bXlwbGFudDNkMjAyNTA5MDYvOTcwMDAubndk",
    "/construction/interconnecting.html": "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6eHh4eHh4eC9Nb2RlbDIubnd0",
    "/construction/wtp.html": "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6eHh4eHh4eC9Nb2RlbDMubnd0",
    "/construction/cooling-tower.html": "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6eHh4eHh4eC9Nb2RlbDQubnd0",
  };

  return models[path] || null;
}
