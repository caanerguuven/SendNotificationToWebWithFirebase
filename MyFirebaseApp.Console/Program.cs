using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MyFirebaseApp.Console.Extension;
using MyFirebaseApp.Console.Extension.Abstract;
using MyFirebaseApp.Library;
using System;

namespace MyFirebaseApp.Console
{
    class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        private static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
            .ConfigureAppConfiguration((hostContext, config) =>
            {

                config.AddJsonFile("appsettings.json", optional: true);
            })
            .ConfigureServices((hostContext, services) =>
            {
                var appSettingSection = hostContext.Configuration.GetSection("ApplicationSettings");

                services.Configure<AppSettings>(appSettingSection);

                services.AddSingleton<INotificationSender, FirebaseSender>();
            });
    }
}
