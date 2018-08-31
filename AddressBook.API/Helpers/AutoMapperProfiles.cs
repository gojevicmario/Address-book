using AddressBook.API.Dtos;
using AddressBook.API.Models;
using AutoMapper;

namespace AddressBook.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<ContactForListDto, Contact>();
        }
    }
}