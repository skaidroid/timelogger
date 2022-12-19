using Microsoft.AspNetCore.Mvc;
using Timelogger.Entities;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace Timelogger.Api.Controllers
{
	[Route("api/[controller]")]
	public class TimelogsController : Controller
	{
        private readonly ApiContext _context;

		public TimelogsController(ApiContext context)
		{
			_context = context;
		}

		[HttpGet]
		public IActionResult Get()
		{
			return Ok(_context.Timelogs);
		}

		[HttpGet("getTasksById/{projectId}")]
        public IActionResult GetTasksById(int projectId)
        {
            return Ok(_context.Timelogs.Where(t => t.ProjectId == projectId));
        }

		
        [HttpPost("addTimelog")]
        public IActionResult AddTimelog([FromBody] Timelog newTimelog)
        {
			//This is used to replace the database assigned IDs
			newTimelog.Id = _context.LastTimelogsId;
			
			//TODO: Check if task lasted 30min or more and that required field are correct 
			TimeSpan getDifference = newTimelog.EndTime.Subtract(newTimelog.StartTime);
			newTimelog.TotalTime += ((getDifference.Hours * 60) + getDifference.Minutes);

			//Update total hours - might wan to recalculate total hours at some point
			_context.Projects.FirstOrDefault(p => p.Id == newTimelog.ProjectId).TotalHours += newTimelog.TotalTime;

			_context.Timelogs.Add(newTimelog);
			_context.SaveChanges();

            return Ok(_context.Timelogs);
        }
    }
}