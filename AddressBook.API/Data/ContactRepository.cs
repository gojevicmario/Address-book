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
    public class ContactRepository : IContactRepository
    {
        private readonly DataContext _context;
        public ContactRepository(DataContext context)
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

        public async Task<Contact> GetContact(int id)
        {
            var contact = await _context.Contacts.FirstOrDefaultAsync(c => c.Id == id);
            return contact;
        }

        public async Task<PagedList<Contact>> GetContacts(UserParams userParams)
        {
            var contacts = _context.Contacts.AsQueryable();
            if (userParams.IsBookmarked)
                contacts = _context.Contacts.Where(c => c.IsBookmarked);
            else if (!string.IsNullOrEmpty(userParams.FirstName))
                contacts = _context.Contacts.Where(c => string.Equals(c.FirstName, userParams.FirstName, StringComparison.OrdinalIgnoreCase));
            else if (!string.IsNullOrEmpty(userParams.LastName))
                contacts = _context.Contacts.Where(c => string.Equals(c.LastName, userParams.LastName, StringComparison.OrdinalIgnoreCase));
            else if (!string.IsNullOrEmpty(userParams.Tag)){
                
                // var idList = _context.Tags.Where(t => string.Equals(t.TagName, userParams.Tag, StringComparison.OrdinalIgnoreCase))
                // .Select( c => );
                // contacts = _context.Contacts.Where( c => idList.Contains(c.Id) );

            }
            return await PagedList<Contact>.CreateAsync(contacts, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}