using FirebaseAdmin;
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
        public async Task Send(Dictionary<string,string> data)
        {
            WebpushConfig headerInfo = new WebpushConfig()
            {
                Headers = new Dictionary<string, string>() {
                             {"Content-Type","application/json"},
                             {"Authorization", _firebaseSettings.Server_Api_key}
                         }
            };

            FirebaseNotification firebaseNotification = new FirebaseNotification()
            {
                Message = new Message()
                {
                    Webpush = headerInfo,
                    Data = data,
                    Token = _firebaseSettings.Device_token
                }
            };

            try
            {
                var response = await _firebaseMessaging.SendAsync(firebaseNotification.Message);
                Console.WriteLine(response);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
