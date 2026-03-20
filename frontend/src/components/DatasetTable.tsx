import { Fragment } from "react";
import type { Dataset } from "../Dataset";

type DatasetTableProps = {
  datasets: Dataset[];
};

function DatasetTable({ datasets }: DatasetTableProps) {
  if (datasets.length === 0) {
    return <p>No datasets yet</p>;
  }

  return (
    <table className="dataset-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Domain</th>
          <th>Owner</th>
          <th>Score</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {datasets.map((dataset) => (
          <Fragment key={dataset.id}>
            <tr>
              <td>{dataset.name}</td>
              <td>{dataset.domain}</td>
              <td>{dataset.owner}</td>
              <td>{dataset.qualityScore}</td>
              <td>{dataset.status}</td>
            </tr>

            {dataset.qualityScore < 60 && (
              <tr className="insight-row">
                <td colSpan={5}>
                  <div className="insight-box">
                  <strong>AI Insight:</strong> Dataset "{dataset.name}" may require review.
                  </div>
                </td>
              </tr>
            )}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default DatasetTable;