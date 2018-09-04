using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AddressBook.API.Helpers;
using AddressBook.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace AddressBook.API.Data
{
    public class ContactTagRepository 
    {
        private readonly DataContext _context;

        public ContactTagRepository(DataContext context)
        {
            _context = context;

        }
        
          public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

         public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public void Update<T>(T entity) where T : class{
            _context.Update(entity);
        }

        public async Task<IEnumerable<Tag>> GetTags(int contactId)
        {
            var tags = await _context.ContactsTags.Where( ct => ct.ContactId == contactId).Select( ct => ct.Tag).ToListAsync();
            return tags;
        }

        public async Task<IEnumerable<Contact>> GetContacts(int tagId)
        {
            var contacts = await _context.ContactsTags.Where( ct => ct.TagId == tagId).Select( ct => ct.Contact).ToListAsync();
            return contacts;
        }

        public async Task<List<ContactTag>> GetContacstTags()
        {
            var contacts = await _context.ContactsTags.ToListAsync();
            return contacts;
        }

        public async Task<int> getTagId(string tagName){
            var tag = await _context.ContactsTags.Select( ct => ct.Tag).
            FirstOrDefaultAsync( t => t.TagName.Equals(tagName, StringComparison.InvariantCultureIgnoreCase));
            if (tag != null)
                return tag.Id;
            return -1;

        }

        public Task<int> GetNumberOfContactsForTag(int tagId){
            return _context.ContactsTags.CountAsync(ct => ct.TagId == tagId);
        }
        
        

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}