using System.Collections.Generic;
using AddressBook.API.Models;

namespace AddressBook.API.Dtos
{
    public class ContactDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public bool IsBookmarked { get; set; }
        public List<Number> NumberList { get; set; }        
        public List<Email> EmailList { get; set; }
        public List<Tag> TagList { get; set; }

    }
}