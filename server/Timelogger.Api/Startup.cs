using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;
using Timelogger.Entities;
using System;
using System.Globalization;

namespace Timelogger.Api
{
	public class Startup
	{
		private readonly IWebHostEnvironment _environment;
		public IConfigurationRoot Configuration { get; }

		public Startup(IWebHostEnvironment env)
		{
			_environment = env;

			var builder = new ConfigurationBuilder()
				.SetBasePath(env.ContentRootPath)
				.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
				.AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
				.AddEnvironmentVariables();
			Configuration = builder.Build();
		}

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			// Add framework services.
			services.AddDbContext<ApiContext>(opt => opt.UseInMemoryDatabase("e-conomic interview"));
			services.AddLogging(builder =>
			{
				builder.AddConsole();
				builder.AddDebug();
			});

			services.AddMvc(options => options.EnableEndpointRouting = false);

			if (_environment.IsDevelopment())
			{
				services.AddCors();
			}
		}

		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseCors(builder => builder
					.AllowAnyMethod()
					.AllowAnyHeader()
					.SetIsOriginAllowed(origin => true)
					.AllowCredentials());
			}

			app.UseMvc();


			var serviceScopeFactory = app.ApplicationServices.GetService<IServiceScopeFactory>();
			using (var scope = serviceScopeFactory.CreateScope())
			{
				SeedDatabase(scope);
			}
		}

		private static void SeedDatabase(IServiceScope scope)
		{
			DateTime temp = DateTime.Now.Date;
			var context = scope.ServiceProvider.GetService<ApiContext>();
			var testProject1 = new Project
			{
				Id = 1,
				Name = "e-conomic Interview",
				TotalHours = TimeSpan.FromMinutes(120),
				Deadline = temp.AddDays(5),
				IsCompleted = false

			};
			var testProject2 = new Project
			{
				Id = 2,
				Name = "Learn React",
				TotalHours = TimeSpan.FromMinutes(60),
				Deadline = temp.AddDays(20),
				IsCompleted = false

			};
			var testProject3 = new Project
			{
				Id = 3,
				Name = "Jumbo",
				TotalHours = TimeSpan.FromMinutes(30), 	
				Deadline = temp.AddMonths(2),
				IsCompleted = false

			};

			context.Projects.Add(testProject1);
			context.Projects.Add(testProject2);
			context.Projects.Add(testProject3);

			var testTimelog1 = new Timelog
			{
				Id = 1,
				ProjectId = 1,
				Description = "Unit tests",
				StartTime = temp.AddHours(-10),
				EndTime = temp.AddHours(-8),
				TotalTime = TimeSpan.FromMinutes(120)
			};

			var testTimelog2 = new Timelog
			{
				Id = 2,
				ProjectId = 2,
				Description = "Unit tests2",
				StartTime = temp.AddHours(-25),
				EndTime = temp.AddHours(-24),
				TotalTime = TimeSpan.FromMinutes(60)
			};

			var testTimelog3 = new Timelog
			{
				Id = 3,
				ProjectId = 3,
				Description = "Unit tests 3",
				StartTime = temp.AddDays(-4),
				EndTime = temp.AddDays(-4).AddMinutes(30),
                TotalTime = TimeSpan.FromMinutes(30)
			};

			context.Timelogs.Add(testTimelog1);
			context.Timelogs.Add(testTimelog2);
			context.Timelogs.Add(testTimelog3);

			context.SaveChanges();
		}
	}
}