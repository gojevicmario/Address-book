namespace AddressBook.API.Dtos
{
    public class ContactForUpdateDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsBookmarked { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
    }
}