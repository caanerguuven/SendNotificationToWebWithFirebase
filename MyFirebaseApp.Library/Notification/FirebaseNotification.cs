using FirebaseAdmin.Messaging;
using MyFirebaseApp.Library.Notification.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyFirebaseApp.Library.Notification
{
    public class FirebaseNotification:INotification
    {
        public Message Message { get; set; }

    }
}
