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
				TotalHours = 60,
				Deadline = temp,
				IsCompleted = false

			};
			var testProject2 = new Project
			{
				Id = 2,
				Name = "Test something",
				TotalHours = 120,
				Deadline = temp,
				IsCompleted = false

			};
			var testProject3 = new Project
			{
				Id = 3,
				Name = "Jumbo",
				TotalHours = 0, 	
				Deadline = temp,
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
				StartTime = temp,
				EndTime = temp,
				TotalTime = 55
			};

			var testTimelog2 = new Timelog
			{
				Id = 2,
				ProjectId = 2,
				Description = "Unit tests2",
				StartTime = temp,
				EndTime = temp,
				TotalTime = 51
			};

			var testTimelog3 = new Timelog
			{
				Id = 3,
				ProjectId = 3,
				Description = "Unit tests 3",
				StartTime = temp,
				EndTime = temp,
				TotalTime = 54
			};

			context.Timelogs.Add(testTimelog1);
			context.Timelogs.Add(testTimelog2);
			context.Timelogs.Add(testTimelog3);

			context.SaveChanges();
		}
	}
}