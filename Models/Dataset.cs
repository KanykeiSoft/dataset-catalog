namespace DatasetApi.Models
{
    public enum Status
    {
        Approved,
        NeedsReview,
        Rejected
    }

    public class Dataset
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Domain { get; set; }
        public string Owner { get; set; }
        public int QualityScore { get; set; }
        public Status Status { get; set; }
    }
}