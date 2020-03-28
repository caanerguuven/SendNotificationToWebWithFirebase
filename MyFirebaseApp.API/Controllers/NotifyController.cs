using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirebaseAdmin.Messaging;
using Microsoft.AspNetCore.Mvc;
using MyFirebaseApp.API.Extension.Abstract;
using MyFirebaseApp.Library.Notification;
using Newtonsoft.Json;

namespace MyFirebaseApp.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class NotifyController : Controller
    {
        private readonly INotificationSender _sender;
        public NotifyController(INotificationSender sender)
        {
            _sender = sender;
        }

        [HttpGet]
        public IActionResult HelloWorld()
        {
            return new JsonResult("Hello World");
        }

        [HttpPost]
        public IActionResult SendNotify([FromBody] Notification notification)
        {
            var data = new Dictionary<string, string>()
            {
                {"Data-1","Data 1 Content" },
                {"Data-2","Data 2 Content" },
                {"Notification",JsonConvert.SerializeObject(notification)}
            };

            try
            {
                _sender.Send(data);
            }
            catch (Exception ex)
            {

                throw ex;
            }
            
            return new JsonResult("Sent is successful");
        }
    }
}