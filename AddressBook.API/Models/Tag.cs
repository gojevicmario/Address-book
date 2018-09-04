using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AddressBook.API.Models
{
    public class Tag
    {
        [Key]
        public int Id { get; set; }
        public string TagName { get; set; }
        public ICollection<ContactTag> ContactsTags { get; set; }


    }
}