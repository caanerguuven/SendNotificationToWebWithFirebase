using FirebaseAdmin;
using FirebaseAdmin.Messaging;
using Google.Apis.Auth.OAuth2;
using Microsoft.Extensions.Options;
using MyFirebaseApp.Console.Extension.Abstract;
using MyFirebaseApp.Library;
using MyFirebaseApp.Library.Notification;
using MyFirebaseApp.Library.Notification.Abstract;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MyFirebaseApp.Console.Extension
{
    public class FirebaseSender : INotificationSender
    {
        private readonly FirebaseSettings _firebaseSettings;
        private readonly FirebaseMessaging _firebaseMessaging;
        public FirebaseSender(IOptions<AppSettings> appSettings)
        {
            _firebaseSettings = appSettings.Value.FirebaseSettings;
            string jsonStr = JsonConvert.SerializeObject(_firebaseSettings);
            var app = FirebaseApp.Create(new AppOptions()
            {
                Credential = GoogleCredential.FromJson(jsonStr)
            }, "FirebaseSample");
            _firebaseMessaging = FirebaseMessaging.GetMessaging(app);

        }
        public async Task Send(INotification notification)
        {
            FirebaseNotification firebaseNotification = notification as FirebaseNotification;
            await this.Send(firebaseNotification);
        }
    }
}
