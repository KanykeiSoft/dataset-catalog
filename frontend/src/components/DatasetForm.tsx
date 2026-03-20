import { useState } from "react";
import type { Dataset, Status } from "../Dataset";

type DatasetFormProps = {
  onAddDataset: (dataset: Dataset) => void;
};

function DatasetForm({ onAddDataset }: DatasetFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    owner: "",
    qualityScore: "",
    status: "" as Status | "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (error) {
      setError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.domain.trim() ||
      !formData.owner.trim() ||
      formData.qualityScore === "" ||
      formData.status === ""
    ) {
      setError("Please fill in all fields.");
      return;
    }

    const emailIsValid = /\S+@\S+\.\S+/.test(formData.owner);
    if (!emailIsValid) {
      setError("Please enter a valid email address.");
      return;
    }

    const score = Number(formData.qualityScore);
    if (Number.isNaN(score) || score < 0 || score > 100) {
      setError("Quality score must be between 0 and 100.");
      return;
    }

    setError("");

    const newDataset: Dataset = {
      id: Date.now(),
      name: formData.name,
      domain: formData.domain,
      owner: formData.owner,
      qualityScore: score,
      status: formData.status as Status,
    };

    onAddDataset(newDataset);

    setFormData({
      name: "",
      domain: "",
      owner: "",
      qualityScore: "",
      status: "" as Status | "",
    });
  };

  return (
    <form className="dataset-form" onSubmit={handleSubmit}>
      <h2>Create Dataset</h2>

      <input
        name="name"
        placeholder="Dataset name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        name="domain"
        placeholder="Domain (e.g. Sales, HR)"
        value={formData.domain}
        onChange={handleChange}
      />

      <input
        name="owner"
        placeholder="Owner email"
        value={formData.owner}
        onChange={handleChange}
      />

      <input
        name="qualityScore"
        type="number"
        min="0"
        max="100"
        placeholder="Quality Score (0-100)"
        value={formData.qualityScore}
        onChange={handleChange}
      />

      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="">Select status</option>
        <option value="Approved">Approved</option>
        <option value="NeedsReview">NeedsReview</option>
        <option value="Rejected">Rejected</option>
      </select>

      {error && <p className="form-error">{error}</p>}

      <button type="submit">Add Dataset</button>
    </form>
  );
}

export default DatasetForm;