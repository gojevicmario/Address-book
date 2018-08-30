using System.Collections.Generic;
using AddressBook.API.Models;
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
            var contactdata = System.IO.File.ReadAllText("Data/SeedData.json");
            var users = JsonConvert.DeserializeObject<List<Contact>>(contactdata);
            foreach (var contact in users)
            {
                _context.Contacts.Add(contact);
            }
            _context.SaveChanges();
        }
    }
}