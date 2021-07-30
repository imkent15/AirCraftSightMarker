using AirCraftSpotterApp.Data.Entities.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirCraftSightMarker.Data.Repo.Interface
{
    public interface IAirCraftSightRepo
    {
        IEnumerable<AirCraftSight> GetAllAirCraftSights();
        AirCraftSight GetAirCraftSightById(Guid visibleID);

        void AddAirCraftSight(AirCraftSight airCraftSight);

        void UpdateAirCraftSight(AirCraftSight airCraftSight);

        void DeleteAirCraftSight(AirCraftSight airCraftSight);

        bool SaveChanges();

    }
}
