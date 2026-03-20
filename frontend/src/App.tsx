import { useEffect, useMemo, useState } from "react";
import "./App.css";
import type { Dataset } from "./Dataset";
import DatasetForm from "./components/DatasetForm";
import DatasetFilters from "./components/DatasetFilters";
import DatasetTable from "./components/DatasetTable";

function App() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [domainFilter, setDomainFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5156/api/datasets")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load datasets");
        }
        return res.json();
      })
      .then((data: Dataset[]) => {
        setDatasets(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load datasets");
        setLoading(false);
      });
  }, []);

  const handleAddDataset = (dataset: Dataset) => {
    setDatasets((prev) => [...prev, dataset]);
  };

  const domains = useMemo(() => {
    const uniqueDomains = Array.from(new Set(datasets.map((d) => d.domain)));
    return ["All", ...uniqueDomains];
  }, [datasets]);

  const filteredDatasets = datasets.filter((dataset) => {
    const matchesDomain =
      domainFilter === "All" || dataset.domain === domainFilter;

    const matchesStatus =
      statusFilter === "All" || dataset.status === statusFilter;

    return matchesDomain && matchesStatus;
  });

  return (
    <div className="page">
      <div className="container">
        <h1>Dataset Catalog</h1>

        <DatasetForm onAddDataset={handleAddDataset} />

        <DatasetFilters
          domains={domains}
          domainFilter={domainFilter}
          statusFilter={statusFilter}
          onDomainChange={setDomainFilter}
          onStatusChange={setStatusFilter}
        />

        {loading ? (
          <p>Loading datasets...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <DatasetTable datasets={filteredDatasets} />
        )}
      </div>
    </div>
  );
}

export default App;