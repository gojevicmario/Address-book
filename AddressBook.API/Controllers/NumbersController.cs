using System;
using System.Linq;
using System.Threading.Tasks;
using AddressBook.API.Data;
using AddressBook.API.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AddressBook.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NumbersController : ControllerBase
    {
        private readonly NumberRepository _repo;
        public NumbersController(NumberRepository repo)
        {
            _repo = repo;
        }


        [HttpGet("{contactId}/{numberId}")]
        public async Task<IActionResult> GetNumber(int contactId, int numberId)
        {
            var number = await _repo.GetNumber(contactId, numberId);
            return Ok(number);
        }

        [HttpGet("{contactId}")]
        public async Task<IActionResult> GetNumbers(int contactId)
        {
            var numbers = await _repo.GetNumbers(contactId);
            return Ok(numbers);
        }

        [HttpDelete("{contactId}/{numberId}")]
        public async Task<IActionResult> DeleteNumber(int contactId, int numberId)
        {
            _repo.Delete(await _repo.GetNumber(contactId, numberId));
            await _repo.SaveAll();
            return Ok();
        }

        [HttpPut("{contactId}/{numberId}")]
        public async Task<IActionResult> UpdateContact(int contactId, int numberId, DetailInfoForUpdateDto numberForUpdateDto)
        {
            var number = await _repo.GetNumber(contactId, numberId);
            number.PhoneNumber = numberForUpdateDto.PhoneNumber;
            if (await _repo.SaveAll())
                return NoContent();
            throw new Exception($"Updating Number with {contactId} failed on save");
        }
    }
}