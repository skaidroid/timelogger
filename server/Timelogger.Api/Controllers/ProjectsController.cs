using Microsoft.AspNetCore.Mvc;
using Timelogger.Entities;
using System;
using System.Globalization;
using System.Collections.Generic;
using System.Linq;

namespace Timelogger.Api.Controllers
{
	[Route("api/[controller]")]
	public class ProjectsController : Controller
	{
		private readonly ApiContext _context;

		public ProjectsController(ApiContext context)
		{
			_context = context;
		}

		[HttpGet]
		[Route("hello-world")]
		public string HelloWorld()
		{
			return "Hello Back!";
		}

		// GET api/projects
		[HttpGet]
		public IActionResult Get()
		{
			return Ok(_context.Projects);
		}

			// GET api/projects
		[HttpPost]
		public IActionResult filterProjects([FromBody] string search)
		{
			return Ok(_context.Projects.Where(p => p.Name.Contains(search)));
		}


		//filter only names
		[HttpGet("getActiveNames")]
		public IActionResult GetAllProjectNames()
		{
			
			var projectNames = _context.Projects.Where(p => p.IsCompleted == false).Select(p => new { Id = p.Id.ToString(), Name = p.Name}).ToList();
			return Ok(projectNames);
		}

		// POST api/projects/addProject
        [HttpPost("addProject")]
        public IActionResult AddProject([FromBody] Project newProject)
        {
			DateTime todaysDate = DateTime.Now;
	
			if(newProject.Deadline < todaysDate){
				throw new Exception("Project deadline can't be in the past.");
			}

			if(String.IsNullOrEmpty(newProject.Name)){
				throw new Exception("Project name can't be empty.");
			}

			newProject.Id = _context.LastProjectId;

			//Seting data for new project
			newProject.TotalHours = 0;
			newProject.IsCompleted = false;
			newProject.Deadline = newProject.Deadline.Date;

			_context.Projects.Add(newProject);
			_context.SaveChanges();
            return Ok(_context.Projects);
        }
	}
}
