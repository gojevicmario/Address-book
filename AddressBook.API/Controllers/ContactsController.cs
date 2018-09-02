using System.Collections.Generic;
using System.Threading.Tasks;
using AddressBook.API.Data;
using AddressBook.API.Dtos;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System;
using AddressBook.API.Models;
using AddressBook.API.Helpers;

namespace AddressBook.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly IContactRepository _repo;
        private readonly IMapper _mapper;
        public ContactsController(IContactRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        public async Task<IActionResult> GetContacts([FromQuery]UserParams userParams)
        {

            var contacts = await _repo.GetContacts(userParams);
            var contactsToReturn = Mapper.Map<IEnumerable<ContactForListDto>>(contacts);
            Response.AddPagination(contacts.Currentpage, contacts.PageSize, contacts.TotalCount, contacts.TotalPages);
            return Ok(contactsToReturn);
        }

        [HttpPost]
        public async Task<IActionResult> CreateContact(ContactForUpdateDto newContact)
        {
            Contact contact = new Contact();
            _mapper.Map(newContact, contact);
            _repo.Add(contact);
            await _repo.SaveAll();
            int id = contact.Id;
            return Ok(id);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetContact(int id)
        {
            var contact = await _repo.GetContact(id);
            var contactToReturn = _mapper.Map<ContactForListDto>(contact);
            return Ok(contactToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContact(int id, ContactForUpdateDto ContactForUpdateDto)
        {
            var contactFromRepo = await _repo.GetContact(id);
            _mapper.Map(ContactForUpdateDto, contactFromRepo);
            if (await _repo.SaveAll())
                return NoContent();
            throw new Exception($"Updating contact with {id} failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            _repo.Delete(await _repo.GetContact(id));
            await _repo.SaveAll();
            return Ok();
        }

    }
}