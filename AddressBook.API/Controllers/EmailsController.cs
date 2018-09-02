using System;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using AddressBook.API.Data;
using AddressBook.API.Dtos;
using AddressBook.API.Models;
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

        [HttpPost("{contactId}")]
        public async Task<IActionResult> CreateEmail(int contactId, DetailInfoForUpdateDto details)
        {
            Email email = new Email();
            email.EmailAddress = details.emailAddress;
            email.ContactId = contactId;
            _repo.Add(email);
            await _repo.SaveAll();
            return Ok();
        }

        [HttpGet("{contactId}/{emailId}")]
        public async Task<IActionResult> GetEmail(int contactId, int emailId)
        {
            var email = await _repo.GetEmail(contactId, emailId);
            return Ok(email);
        }

        [HttpGet("{contactId}")]
        public async Task<IActionResult> GetEmails(int contactId)
        {
            var emails = await _repo.GetEmails(contactId);
            return Ok(emails);
        }

        [HttpDelete("{contactId}/{emailId}")]
        public async Task<IActionResult> DeleteEmail(int contactId, int emailId)
        {
            _repo.Delete(await _repo.GetEmail(contactId, emailId));
            await _repo.SaveAll();
            return Ok();
        }

        [HttpPut("{contactId}/{emailId}")]
        public async Task<IActionResult> UpdateContact(int contactId, int emailId, DetailInfoForUpdateDto emailForUpdateDto)
        {
            var email = await _repo.GetEmail(contactId, emailId);
            email.EmailAddress = emailForUpdateDto.emailAddress;
            if (await _repo.SaveAll())
                return NoContent();
            throw new Exception($"Updating Email with {contactId} failed on save");
        }
    }
}