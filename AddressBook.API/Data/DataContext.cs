using AddressBook.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AddressBook.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ContactTag>().HasKey(ct => new { ct.ContactId, ct.TagId });

            modelBuilder.Entity<ContactTag>()
            .HasOne<Contact>(ct => ct.Contact)
            .WithMany(c => c.ContactsTags)
            .HasForeignKey(ct => ct.ContactId);

            modelBuilder.Entity<ContactTag>()
            .HasOne<Tag>(ct => ct.Tag)
            .WithMany(c => c.ContactsTags)
            .HasForeignKey(ct => ct.TagId);
        }

        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Email> Emails { get; set; }
        public DbSet<Number> Numbers { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<ContactTag> ContactsTags { get; set; }


    }
}