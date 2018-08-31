using System.Collections.Generic;
using System.Threading.Tasks;
using AddressBook.API.Models;

namespace AddressBook.API.Data
{
    public interface IContactRepository
    {
        void Add<T>(T entity) where T : class;

        void Delete<T>(T entity) where T : class;
        Task<Contact> GetContact(int id);
        Task<IEnumerable<Contact>> GetContactsAsync();
        Task<bool> SaveAll();
    }
}