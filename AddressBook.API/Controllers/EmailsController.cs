using System;
using System.Diagnostics;
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
    public class EmailsController : ControllerBase
    {
        private readonly EmailRepository _repo;
        public EmailsController(EmailRepository repo)
        {
            _repo = repo;
        }


        [HttpGet("{contactId}/{emailId}")]
        public async Task<IActionResult> GetEmail(int contactId, int emailId)
        {
            var email = await _repo.GetDetail(contactId, emailId);
            return Ok(email);
        }

        [HttpGet("{contactId}")]
        public async Task<IActionResult> GetEmails(int contactId)
        {
            var emails = await _repo.GetDetailsAsync(contactId);
            return Ok(emails);
        }

        [HttpDelete("{contactId}/{emailId}")]
        public async Task<IActionResult> DeleteEmail(int contactId, int emailId)
        {
            _repo.Delete(await _repo.GetDetail(contactId, emailId));
            await _repo.SaveAll();
            return Ok();
        }

        [HttpPut("{contactId}/{emailId}")]
        public async Task<IActionResult> UpdateContact(int contactId, int emailId, EmailForUpdateDto emailForUpdateDto){
            var email = await _repo.GetDetail(contactId,emailId);
            email.EmailAddress = emailForUpdateDto.EmailAddress;
            if(await _repo.SaveAll())
                return NoContent();
            throw new Exception($"Updating Email with {contactId} failed on save");
        }


    }
}