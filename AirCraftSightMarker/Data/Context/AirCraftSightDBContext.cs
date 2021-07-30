using AirCraftSpotterApp.Data.Entities.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirCraftSightMarker.Data.Context
{
    public class AirCraftSightDBContext : DbContext
    {

        public DbSet<AirCraftSight> AirCraftSights { get; set; }
        public AirCraftSightDBContext(DbContextOptions<AirCraftSightDBContext> options) : base (options)
        {

        }
    }
}
