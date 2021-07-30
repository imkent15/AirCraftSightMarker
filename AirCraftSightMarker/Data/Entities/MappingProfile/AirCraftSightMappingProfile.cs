using AirCraftSpotterApp.Data.Entities.Model;
using AirCraftSpotterApp.Data.Entities.ViewModel;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirCraftSightMarker.Data.Entities.MappingProfile
{
    public class AirCraftSightMappingProfile : Profile
    {
        public AirCraftSightMappingProfile()
        {
            CreateMap<AirCraftSight, AirCraftSightViewModel>().ReverseMap();
        }
    }
}
