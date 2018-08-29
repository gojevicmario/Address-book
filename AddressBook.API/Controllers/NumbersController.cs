using System.Linq;
using System.Threading.Tasks;
using AddressBook.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AddressBook.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NumbersController : ControllerBase
    {
        private readonly DataContext _context;
        public NumbersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmails(int id)
        {
            var values = await _context.Emails.Where( e => e.Id == id).ToListAsync();

            return Ok(values);
        }

    }
}