using AirCraftSightMarker.Data.Repo.Impl;
using AirCraftSightMarker.Data.Repo.Interface;
using AirCraftSpotterApp.Data.Entities.Model;
using AirCraftSpotterApp.Data.Entities.ViewModel;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AirCraftSightMarker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirCraftSightsController : ControllerBase
    {
        private readonly IAirCraftSightRepo _airCraftSightRepo;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public AirCraftSightsController(IAirCraftSightRepo airCraftSightRepo, IMapper mapper, IWebHostEnvironment webHostEnvironment)
        {
            _airCraftSightRepo = airCraftSightRepo;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet]
        public ActionResult<IEnumerable<AirCraftSightViewModel>> GetAllAirCraftSights()
        {
            var airCraftSights = _airCraftSightRepo.GetAllAirCraftSights();

            return Ok(_mapper.Map<IEnumerable<AirCraftSightViewModel>>(airCraftSights));
        }

        [HttpGet("{visibleID}", Name = "GetAirCraftSightById")]
        public ActionResult<AirCraftSightViewModel> GetAirCraftSightById(Guid visibleID)
        {
            var airCraftSight = _airCraftSightRepo.GetAirCraftSightById(visibleID);

            if (airCraftSight != null)
            {
                return Ok(_mapper.Map<AirCraftSightViewModel>(airCraftSight));
            }

            return NotFound();
        }

        [HttpPost]
        public ActionResult<AirCraftSightViewModel> AddAirCraftSight(AirCraftSightViewModel airCraftSightViewModel)
        {
            var airCraftSightModel = _mapper.Map<AirCraftSight>(airCraftSightViewModel);

            _airCraftSightRepo.AddAirCraftSight(airCraftSightModel);
            _airCraftSightRepo.SaveChanges();

            airCraftSightViewModel = _mapper.Map<AirCraftSightViewModel>(airCraftSightModel);

            return CreatedAtRoute(nameof(GetAirCraftSightById), new { visibleID = airCraftSightViewModel.VisibleID }, airCraftSightViewModel);
        }

        [HttpPut("{visibleID}")]
        public ActionResult UpdateAirCraftSight(Guid visibleID, AirCraftSightViewModel airCraftSightViewModel)
        {
            var currentFromRepo = _airCraftSightRepo.GetAirCraftSightById(visibleID);

            if (currentFromRepo == null)
            {
                return NotFound();
            }

            _mapper.Map(airCraftSightViewModel, currentFromRepo);

            _airCraftSightRepo.UpdateAirCraftSight(currentFromRepo);
            _airCraftSightRepo.SaveChanges();

            return new JsonResult("Updated Successfully" + visibleID);
        }

        [HttpDelete("{visibleID}")]
        public ActionResult DeleteAirCraftSight(Guid visibleID)
        {
            var currentFromRepo = _airCraftSightRepo.GetAirCraftSightById(visibleID);

            if (currentFromRepo == null)
            {
                return NotFound();
            }

            _airCraftSightRepo.DeleteAirCraftSight(currentFromRepo);
            _airCraftSightRepo.SaveChanges();

            return new JsonResult("Deleted Successfully" + visibleID);
        }

        [Route("saveimage")]
        [HttpPost]
        public ActionResult SavePhotoToServer()
        {
            try
            {
                var httpRequest = Request.Form;
                var uploadedFile = httpRequest.Files[0];
                var uploadedFileName = uploadedFile.FileName;
                var path = _webHostEnvironment.ContentRootPath + "/Photos/" + uploadedFileName;

                using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    uploadedFile.CopyTo(fileStream);
                }

                return new JsonResult(uploadedFileName);
            }
            catch(Exception ex)
            {
                return new JsonResult("Upload Failed Due to Exception" + ex.Message);
            }

            
        }
    }
}
