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
			if(projectId < 0){
				throw new Exception("Invalid project Id");
			}

            return Ok(_context.Timelogs.Where(t => t.ProjectId == projectId));
        }

		
        [HttpPost("addTimelog")]
        public IActionResult AddTimelog([FromBody] Timelog newTimelog)
        {
			Project findProject = _context.Projects.First(p => p.Id == newTimelog.ProjectId);
			//check if project exists and if ids match
			if(findProject == null || findProject.Id != newTimelog.ProjectId){
				throw new Exception("Can't find the project.");
			}
			//check if project is complited -  we don't want to all adding logs to completed projects
			if(findProject.IsCompleted == true){
				throw new Exception("Can't add timelogs to the complited project.");
			}

			//check if end time is before start time and return error
			if(newTimelog.EndTime < newTimelog.StartTime){
				throw new Exception("End time can't be before start time.");
			}
			
			newTimelog.TotalTime = (int)Math.Abs(newTimelog.EndTime.Subtract(newTimelog.StartTime).TotalMinutes);
			//make sure that task is 30min or longer
			if(newTimelog.TotalTime < 30){
				throw new Exception("Total time of task needs to be 30min or longer.");
			}
			
			//Assign unique ID
			newTimelog.Id = _context.LastTimelogsId;
			//Update total hours - might wan to recalculate total hours at some point
			_context.Projects.First(p => p.Id == newTimelog.ProjectId).TotalHours += newTimelog.TotalTime;

			_context.Timelogs.Add(newTimelog);
			_context.SaveChanges();

            return Ok(_context.Timelogs);
        }
    }
}