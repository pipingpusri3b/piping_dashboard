function getUrnForCurrentPage() {
  const path = window.location.pathname.toLowerCase();

  const models = {
    "/Construction/RWI.html": "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bXlwbGFudDNkMjAyNTA5MDYvOTcwMDAubndk",
    "/Construction/interconnecting.html": "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6eHh4eHh4eC9Nb2RlbDIubnd0",
    "/Construction/wtp.html": "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6eHh4eHh4eC9Nb2RlbDMubnd0",
    "/Construction/cooling-tower.html": "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6eHh4eHh4eC9Nb2RlbDQubnd0",
  };

  return models[path] || null;
}
