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

		//filter only names
		[HttpGet("getNames")]
		public IActionResult GetAllProjectNames()
		{
			List<string> projectNames = _context.Projects.Select(p => p.Name).ToList();
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

			//This is used to replace the database assigned IDs
			_context.LastProjectId++;
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
