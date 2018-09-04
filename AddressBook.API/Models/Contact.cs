using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AddressBook.API.Models
{
    public class Contact
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public bool IsBookmarked { get; set; }
        public List<Number> Numbers { get; set; }        
        public List<Email> Emails { get; set; }
        public ICollection<ContactTag> ContactsTags { get; set; }

    }
}