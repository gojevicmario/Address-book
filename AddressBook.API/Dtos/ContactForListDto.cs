using System.Collections.Generic;
using AddressBook.API.Models;

namespace AddressBook.API.Dtos
{
    public class ContactForListDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsBookmarked { get; set; }


    }
}