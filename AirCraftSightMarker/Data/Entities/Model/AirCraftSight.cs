using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AirCraftSpotterApp.Data.Entities.Model
{
    public class AirCraftSight : AbstractBaseEntity
    {
        [Required]
        [MaxLength(128)]
        public String Make { get; set; }

        [Required]
        [MaxLength(128)]
        public String Model { get; set; }

        [Required]
        [RegularExpression(@"^([a-zA-Z0-9]{1,2}-[a-zA-Z0-9]{1,5})$")]
        public String Registration { get; set; }

        [Required]
        [MaxLength(255)]
        public String Location { get; set; }

        [Required]
        public DateTime DateandTime { get; set; }

        public String PhotoFileName { get; set; }
    }
}
