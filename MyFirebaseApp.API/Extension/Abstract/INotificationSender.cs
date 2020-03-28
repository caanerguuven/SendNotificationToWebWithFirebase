using MyFirebaseApp.Library.Notification.Abstract;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MyFirebaseApp.API.Extension.Abstract
{
    public interface INotificationSender
    {
        Task Send(Dictionary<string,string> data);
    }
}
