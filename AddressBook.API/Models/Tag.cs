using System.ComponentModel.DataAnnotations;

namespace AddressBook.API.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public string TagName { get; set; }
    }
}