import { useEffect, useMemo, useState } from "react";
import "./App.css";

type Dataset = {
  id: number;
  name: string;
  domain: string;
};

function App() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [search, setSearch] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5156/api/datasets")
      .then((res) => res.json())
      .then((data) => {
        setDatasets(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load datasets");
        setLoading(false);
      });
  }, []);

  const domains = useMemo(() => {
    const uniqueDomains = [...new Set(datasets.map((d) => d.domain))];
    return ["All", ...uniqueDomains];
  }, [datasets]);

  const filteredDatasets = datasets.filter((dataset) => {
    const matchesSearch =
      dataset.name.toLowerCase().includes(search.toLowerCase()) ||
      dataset.domain.toLowerCase().includes(search.toLowerCase());

    const matchesDomain =
      selectedDomain === "All" || dataset.domain === selectedDomain;

    return matchesSearch && matchesDomain;
  });

  const getInsight = (domain: string) => {
    switch (domain) {
      case "Finance":
        return "Useful for revenue tracking, forecasting, and business performance analysis.";
      case "Marketing":
        return "Helpful for customer segmentation, campaign analysis, and engagement trends.";
      case "Product":
        return "Supports product decisions, feature performance review, and usage insights.";
      default:
        return "Provides business insight for analytics and reporting.";
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h1>Dataset Catalog</h1>
        <p className="subtitle">
          Browse datasets and explore quick AI-generated insights.
        </p>

        {loading && <div className="empty-state">Loading datasets...</div>}
        {error && <div className="empty-state">{error}</div>}

        {!loading && !error && (
          <>
            <div className="controls">
              <input
                type="text"
                placeholder="Search datasets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
              >
                {domains.map((domain) => (
                  <option key={domain} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>
            </div>

            <div className="results-count">
              Showing {filteredDatasets.length} dataset
              {filteredDatasets.length !== 1 ? "s" : ""}
            </div>

            <div className="card-grid">
              {filteredDatasets.map((dataset) => (
                <div key={dataset.id} className="card">
                  <div className="badge">{dataset.domain}</div>
                  <h2>{dataset.name}</h2>
                  <p>
                    <strong>Domain:</strong> {dataset.domain}
                  </p>
                  <div className="insight-box">
                    <strong>AI Insight:</strong> {getInsight(dataset.domain)}
                  </div>
                </div>
              ))}
            </div>

            {filteredDatasets.length === 0 && (
              <div className="empty-state">No datasets found.</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;