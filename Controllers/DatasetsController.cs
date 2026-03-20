using Microsoft.AspNetCore.Mvc;
using DatasetApi.Models;

namespace DatasetApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DatasetsController : ControllerBase
    {
        [HttpGet]
        public ActionResult<List<Dataset>> Get()
        {
            var datasets = new List<Dataset>(); // пустой список по заданию

            return Ok(datasets);
        }
    }
}