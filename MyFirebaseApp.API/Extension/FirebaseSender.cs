using FirebaseAdmin;
using FirebaseAdmin.Auth;
using FirebaseAdmin.Messaging;
using Google.Apis.Auth.OAuth2;
using Microsoft.Extensions.Options;
using MyFirebaseApp.API.Extension.Abstract;
using MyFirebaseApp.Library;
using MyFirebaseApp.Library.Notification;
using MyFirebaseApp.Library.Notification.Abstract;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MyFirebaseApp.API.Extension
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
            });

            _firebaseMessaging = FirebaseMessaging.GetMessaging(app);

        }
        public async Task Send(NotificationPayload firebaseNotification)
        {
            WebpushConfig headerInfo = new WebpushConfig()
            {
                Headers = new Dictionary<string, string>() {
                             {"Content-Type","application/json"},
                             {"Authorization", _firebaseSettings.Server_Api_key},
                             {"Urgency",firebaseNotification.Urgency}
                }
            };

            Notification pushNotification = new Notification()
            {
                Title = firebaseNotification.Title,
                Body = firebaseNotification.Body,
                ImageUrl = firebaseNotification.ImageUrl
            };

            firebaseNotification.Data.Add("Notification", JsonConvert.SerializeObject(pushNotification));

            Message message = new Message()
            {
                Webpush = headerInfo,
                Data = firebaseNotification.Data,
                Topic = $"/topics/{firebaseNotification.Topic}",
            };
            
            try
            {
                var response = await _firebaseMessaging.SendAsync(message);
                Console.WriteLine(response);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
