using System.ComponentModel.DataAnnotations;

namespace AddressBook.API.Models
{
    public class Tag
    {
        [Key]
        public int Id { get; set; }
        public string TagName { get; set; }
        public Contact Contact { get; set; }
        public int ContactId { get; set; }

    }
}