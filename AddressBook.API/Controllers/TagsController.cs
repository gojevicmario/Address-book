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
    public class TagsController : ControllerBase
    {
        private readonly TagRepository _repo;
        public TagsController(TagRepository repo)
        {
            _repo = repo;
        }

        [HttpPost("{contactId}")]
        public async Task<IActionResult> CreateTag(int contactId, DetailInfoForUpdateDto details)
        {
            Tag tag = new Tag();
            tag.TagName = details.tagName;
            tag.ContactId = contactId;
            _repo.Add(tag);
            await _repo.SaveAll();
            return Ok();
        }

        [HttpGet("{contactId}/{tagId}")]
        public async Task<IActionResult> GetTag(int contactId, int tagId)
        {
            var Tag = await _repo.GetTag(contactId, tagId);
            return Ok(Tag);
        }

        [HttpGet("{contactId}")]
        public async Task<IActionResult> GetTags(int contactId)
        {
            var Tags = await _repo.GetTags(contactId);
            return Ok(Tags);
        }

        [HttpDelete("{contactId}/{tagId}")]
        public async Task<IActionResult> DeleteTag(int contactId, int tagId)
        {
            _repo.Delete(await _repo.GetTag(contactId, tagId));
            await _repo.SaveAll();
            return Ok();
        }

        [HttpPut("{contactId}/{tagId}")]
        public async Task<IActionResult> UpdateTag(int contactId, int tagId,
        DetailInfoForUpdateDto detailInfoForUpdateDto){
            var tag = await _repo.GetTag(contactId,tagId);
            tag.TagName = detailInfoForUpdateDto.tagName;
            if(await _repo.SaveAll())
                return NoContent();
            throw new Exception($"Updating Tag with {contactId} failed on save");
        }

    }
}