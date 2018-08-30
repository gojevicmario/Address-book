using System.ComponentModel.DataAnnotations;

namespace AddressBook.API.Models
{
    public class Email
    {
        [Key]
        public int Id { get; set; }
        public string EmailAddress { get; set; }
        public Contact Contact { get; set; }
        public int ContactId { get; set; }
    }
}