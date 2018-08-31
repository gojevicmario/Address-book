using System.Linq;
using System.Threading.Tasks;
using AddressBook.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AddressBook.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagsController : ControllerBase
    {
        private readonly DataContext _context;
        public TagsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetNumbers(int id)
        {
            var values = await _context.Tags.Where( t => t.ContactId == id).ToListAsync();

            return Ok(values);
        }

    }
}