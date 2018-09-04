using System;
using System.Linq;
using System.Collections.Generic;
using AddressBook.API.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace AddressBook.API.Data
{
    public class Seed
    {
        private readonly DataContext _context;

        public Seed(DataContext context)
        {
            _context = context;
        }
        public void SeedContacts()
        {
            var contacts = JsonConvert.DeserializeObject<List<Contact>>(System.IO.File.ReadAllText("Data/SeedData.json"));
            var tags = JsonConvert.DeserializeObject<List<Tag>>(System.IO.File.ReadAllText("Data/tags.json"));
            var contactsTags = JsonConvert.DeserializeObject<List<ContactTag>>(System.IO.File.ReadAllText("Data/seedContactTags.json"));
            foreach (var contact in contacts)
            {
                _context.Contacts.Add(contact);
            }
            _context.SaveChanges();
            foreach (var tag in tags)
            {
                _context.Tags.Add(tag);
            }
            _context.SaveChanges();
            var contactsList = _context.Contacts.ToList();
            Random random = new Random();
            int newTagId;
            for (int i = contactsList.First().Id; i <= contactsList.Last().Id; i++)
            {
                newTagId = random.Next(1,4);
                _context.Add(new ContactTag {TagId = newTagId, ContactId = i});
            }
            _context.SaveChanges();
        }
    }
}