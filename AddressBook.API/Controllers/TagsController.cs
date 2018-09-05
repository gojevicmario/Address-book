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
        private readonly TagRepository _tagsRepo;
        private readonly ContactTagRepository _contactTagRepo;
        public TagsController(TagRepository tagsRepo, ContactTagRepository contactTagRepo)
        {
            _tagsRepo = tagsRepo;
            _contactTagRepo = contactTagRepo;
        }

        [HttpPost("{contactId}")]
        public async Task<IActionResult> CreateTag(int contactId, DetailInfoForUpdateDto details)
        {
            Tag tag = new Tag();
            int tagIdFromRepo = await _contactTagRepo.getTagId(details.tagName);
            if (tagIdFromRepo == -1)
            {
                tag.TagName = details.tagName;
                _tagsRepo.Add(tag);
                _contactTagRepo.Add(new ContactTag { TagId = tag.Id, ContactId = contactId });
                await _tagsRepo.SaveAll();
                await _contactTagRepo.SaveAll();
            }
            else
            {
                var tagsFromRepo = await _contactTagRepo.GetTags(contactId);
                if (tagsFromRepo.Any(t => t.TagName == details.tagName))
                {
                    return BadRequest();
                }
                else
                {
                    _contactTagRepo.Add(new ContactTag { TagId = tagIdFromRepo, ContactId = contactId });
                    await _contactTagRepo.SaveAll();
                }

            }
            return Ok();
        }

        [HttpGet("{contactId}/{tagId}")]
        public async Task<IActionResult> GetTag(int contactId, int tagId)
        {
            var Tag = await _tagsRepo.GetTag(contactId, tagId);
            return Ok(Tag);
        }
        [HttpGet("{contactId}")]
        public async Task<IActionResult> GetTags(int contactId)
        {
            var Tags = await _tagsRepo.GetTags(contactId);
            return Ok(Tags);
        }

        [HttpDelete("{contactId}/{tagId}")]
        public async Task<IActionResult> DeleteTag(int contactId, int tagId)
        {
            _tagsRepo.Delete(await _tagsRepo.GetTag(contactId, tagId));
            await _tagsRepo.SaveAll();
            return Ok();
        }
        // update ne radi jos
        [HttpPut("{contactId}/{tagId}")]
        public async Task<IActionResult> UpdateTag(int contactId, int tagId,
        DetailInfoForUpdateDto detailInfoForUpdateDto)
        {

            var tag = await _tagsRepo.GetTag(contactId, tagId);
            if( (await _contactTagRepo.GetNumberOfContactsForTag(tagId)) == 1 )
            {
                tag.TagName = detailInfoForUpdateDto.tagName;
                if (await _tagsRepo.SaveAll())
                    return NoContent();
            }
            else
            {
                _contactTagRepo.Delete(new ContactTag {TagId = tagId,ContactId = contactId});
                var tagIdFromRepo = await _contactTagRepo.getTagId(detailInfoForUpdateDto.tagName);
                if(tagIdFromRepo >= 0){
                    _contactTagRepo.Update(new ContactTag {ContactId = contactId, TagId = tagIdFromRepo});
                }
                else {
                    await CreateTag(contactId, detailInfoForUpdateDto);
                }
                await _tagsRepo.SaveAll();
                await _contactTagRepo.SaveAll();
                return NoContent();
            }

            throw new Exception($"Updating Tag with {tagId} failed on save");
        }

    }
}