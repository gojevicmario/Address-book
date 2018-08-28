using AddressBook.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AddressBook.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

        public DbSet<Contact> Contacts { get; set; }
        
    }
}