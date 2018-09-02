namespace AddressBook.API.Helpers
{
    public class UserParams
    {
        private const int _maxPageSize = 20;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10;
        public int PageSize
        {
            get { return _pageSize;}
            set { _pageSize = (value >_maxPageSize) ? _maxPageSize : value;}
        }
        public int ContactId { get; set; }
        public bool IsBookmarked { get; set; }
        public string Tag { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}