using System.ComponentModel.DataAnnotations;

namespace AddressBook.API.Models
{
    public class Number
    {
        [Key]
        public int Id { get; set; }
        public string PhoneNumber { get; set; }
        public Contact Contact { get; set; }
        public int ContactId { get; set; }
    
    }
}