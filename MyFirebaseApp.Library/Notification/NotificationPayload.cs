using FirebaseAdmin.Messaging;
using MyFirebaseApp.Library.Notification.Abstract;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyFirebaseApp.Library.Notification
{
    public class NotificationPayload : INotification
    {
        [JsonProperty("topic")]
        public string Topic { get; set; }
        [JsonProperty("title")]
        public string Title { get; set; }
        [JsonProperty("body")]
        public string Body { get; set; }
        [JsonProperty("imageUrl")]
        public string ImageUrl { get; set; }
        [JsonProperty("urgency")]
        public string Urgency { get; set; }
        [JsonProperty("language")]
        public string Language { get; set; }
        [JsonProperty("data")]
        public Dictionary<string,string> Data { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
