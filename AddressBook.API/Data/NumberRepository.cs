using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AddressBook.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AddressBook.API.Data
{
    public class NumberRepository
    {
        private readonly DataContext _context;
        public NumberRepository(DataContext context)
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

        public async Task<Number> GetNumber(int FkId, int PkId)
        {
            var Number = await _context.Numbers.Where( e => e.ContactId == FkId).FirstOrDefaultAsync( e => e.Id == PkId);
            return Number;
        }

        public async Task<IEnumerable<Number>> GetNumbers(int FkId)
        {
            var Numbers = await _context.Numbers.Where( e => e.ContactId == FkId).ToListAsync();
            return Numbers;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}