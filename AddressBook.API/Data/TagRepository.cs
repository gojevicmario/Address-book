using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AddressBook.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AddressBook.API.Data
{
    public class TagRepository
    {
        private readonly DataContext _context;
        public TagRepository(DataContext context)
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

        public async Task<Tag> GetTag(int FkId, int PkId)
        {
            var Tag = await _context.Tags.Where( e => e.ContactId == FkId).FirstOrDefaultAsync( e => e.Id == PkId);
            return Tag;
        }

        public async Task<IEnumerable<Tag>> GetTags(int FkId)
        {
            var Tags = await _context.Tags.Where( e => e.ContactId == FkId).ToListAsync();
            return Tags;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}