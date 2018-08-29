using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AddressBook.API.Models
{
    public class Contact
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public bool IsBookmarked { get; set; }
        public List<Number> NumberList { get; set; }        
        public List<Email> EmailList { get; set; }
        public List<Tag> TagList { get; set; }

    }
}