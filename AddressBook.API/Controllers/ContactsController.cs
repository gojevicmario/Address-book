using System.Collections.Generic;
using System.Threading.Tasks;
using AddressBook.API.Data;
using AddressBook.API.Dtos;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet]
        public async Task<IActionResult> GetContacts()
        {
            var contacts = await _repo.GetContactsAsync();
            var contactsToReturn = Mapper.Map<IEnumerable<ContactForListDto>>(contacts);
            return Ok(contactsToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetContact(int id)
        {
            var contact = await _repo.GetContact(id);
            var contactToReturn = _mapper.Map<ContactForListDto>(contact);
            return Ok(contactToReturn);
        }

    }
}