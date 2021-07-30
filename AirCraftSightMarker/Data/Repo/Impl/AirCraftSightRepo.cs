using AirCraftSightMarker.Data.Context;
using AirCraftSightMarker.Data.Repo.Interface;
using AirCraftSpotterApp.Data.Entities.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirCraftSightMarker.Data.Repo.Impl
{
    public class AirCraftSightRepo : IAirCraftSightRepo
    {
        private readonly AirCraftSightDBContext _airCraftSightDBContext;

        public AirCraftSightRepo(AirCraftSightDBContext airCraftSightDBContext)
        {
               _airCraftSightDBContext = airCraftSightDBContext;
        }

        public void AddAirCraftSight(AirCraftSight airCraftSight)
        {
            if (airCraftSight == null)
            {
                throw new ArgumentNullException(nameof(airCraftSight));
            }

            airCraftSight.VisibleID = Guid.NewGuid();
            airCraftSight.ModifiedDateTime = DateTime.UtcNow;

            _airCraftSightDBContext.AirCraftSights.Add(airCraftSight);
        }

        public void UpdateAirCraftSight(AirCraftSight airCraftSight)
        {
            if (airCraftSight == null)
            {
                throw new ArgumentNullException(nameof(airCraftSight));
            }

            airCraftSight.ModifiedDateTime = DateTime.UtcNow;
            _airCraftSightDBContext.AirCraftSights.Update(airCraftSight);
        }

        public AirCraftSight GetAirCraftSightById(Guid visibleID)
        {
            return _airCraftSightDBContext.AirCraftSights.FirstOrDefault(sight => sight.VisibleID == visibleID);
        }

        public void DeleteAirCraftSight(AirCraftSight airCraftSight)
        {
            if (airCraftSight == null)
            {
                throw new ArgumentNullException(nameof(airCraftSight));
            }

            _airCraftSightDBContext.AirCraftSights.Remove(airCraftSight);
        }

        public IEnumerable<AirCraftSight> GetAllAirCraftSights()
        {
            return _airCraftSightDBContext.AirCraftSights.ToList();
        }

        public bool SaveChanges()
        {
            return (_airCraftSightDBContext.SaveChanges() >= 0);
        }
    }
}
