using System.Collections.Generic;
using System.Threading.Tasks;
using AddressBook.API.Data;
using AddressBook.API.Dtos;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

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

        public async Task<IActionResult> GetContacts()
        {
            //bool IsBookmarked = false;
            var contacts = await _repo.GetContactsAsync();
            //if(IsBookmarked)
              //  return Ok(Mapper.Map<IEnumerable<ContactForListDto>>(contacts.Where(c => c.IsBookmarked)));
            return Ok(Mapper.Map<IEnumerable<ContactForListDto>>(contacts));
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