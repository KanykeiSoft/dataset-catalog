using Microsoft.AspNetCore.Mvc;
using DatasetApi.Models;

namespace DatasetApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DatasetsController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var datasets = new List<Dataset>
            {
                new Dataset 
                { 
                    Id = 1, 
                    Name = "Sales Data", 
                    Domain = "Finance",
                    AiInsight = "Useful for revenue tracking and financial forecasting."
                },
                new Dataset 
                { 
                    Id = 2, 
                    Name = "Customer Info", 
                    Domain = "Marketing",
                    AiInsight = "Helps analyze customer behavior and marketing performance."
                },
                new Dataset 
                { 
                    Id = 3, 
                    Name = "Product Metrics", 
                    Domain = "Product",
                    AiInsight = "Supports product performance and user engagement insights."
                }
            };

            return Ok(datasets);
        }
    }
}