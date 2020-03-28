using MyFirebaseApp.Library.Notification.Abstract;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MyFirebaseApp.Console.Extension.Abstract
{
    public interface INotificationSender
    {
        Task Send(INotification notification);
    }
}
