using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AirCraftSpotterApp.Data.Entities.Model
{
    public abstract class AbstractBaseEntity
    {
        [Key]
        public int SerialID { get; set; }

        public Guid VisibleID { get; set; }

        [ForeignKey("ModifiedBy")]
        public User ModifiedUser { get; set; }

        public DateTime ModifiedDateTime { get; set; }

        [DefaultValue(false)]
        public bool MarkedForDelete { get; set; }
    }
}
