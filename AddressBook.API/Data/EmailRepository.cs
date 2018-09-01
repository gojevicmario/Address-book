using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AddressBook.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AddressBook.API.Data
{
    public class EmailRepository 
    {
        private readonly DataContext _context;
        public EmailRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Email> GetDetail(int FkId, int PkId)
        {
            var email = await _context.Emails.Where( e => e.ContactId == FkId).FirstOrDefaultAsync( e => e.Id == PkId);
            return email;
        }

        public async Task<IEnumerable<Email>> GetDetailsAsync(int FkId)
        {
            var emails = await _context.Emails.Where( e => e.ContactId == FkId).ToListAsync();
            return emails;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}