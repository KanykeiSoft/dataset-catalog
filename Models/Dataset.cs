namespace DatasetApi.Models
{
    public class Dataset
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Domain { get; set; } = string.Empty;
        public string AiInsight { get; set; } = string.Empty;
    }
}