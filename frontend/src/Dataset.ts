export type Status = "Approved" | "NeedsReview" | "Rejected";

export type Dataset = {
  id: number;
  name: string;
  domain: string;
  owner: string;
  qualityScore: number;
  status: Status;
};