using Timelogger.Api.Controllers;
using NUnit.Framework;
using Timelogger.Entities;
using System;
using System.Runtime.ConstrainedExecution;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Server.IIS;
using Microsoft.EntityFrameworkCore;

namespace Timelogger.Api.Tests
{
    public class TimelogsControllerTests
    {

        /* Get tasks for project*/
        [Test]
        public void GetTasksById_Empty_Success()
        {
            var _context = AddTimelogstestData();
            TimelogsController sut = new TimelogsController(_context);

            var actual = sut.GetTasksById(2);

            OkObjectResult result = actual as OkObjectResult;

            Assert.AreEqual(StatusCodes.Status200OK, result.StatusCode);
            Assert.IsNotNull(result.Value);

        }

        [Test]
        public void GetTasksById_Success()
        {
            var _context = AddTimelogstestData();
            TimelogsController sut = new TimelogsController(_context);


            var actual = sut.GetTasksById(1);

            OkObjectResult result = actual as OkObjectResult;

            Assert.AreEqual(StatusCodes.Status200OK, result.StatusCode);
        }

        /*Add Timelogs tests */
        [Test]
        public void AddTimelog_Project_NotFound()
        {
            var _context = CreateProjectTestData();
            TimelogsController sut = new TimelogsController(_context);
            
            DateTime temp = DateTime.Now.Date;
            var testTimelog = new Timelog
            {
                ProjectId = 5,
                Description = "Unit Tests",
                StartTime = temp.AddHours(-10),
                EndTime = temp.AddHours(-8),
            };

            var actual = sut.AddTimelog(testTimelog);

            BadRequestObjectResult brqObj = actual as BadRequestObjectResult;
            string message = brqObj.Value.ToString();


            Assert.AreEqual(StatusCodes.Status400BadRequest, brqObj.StatusCode);
            Assert.AreEqual("Can't find the project.", message);
        }
        
 
        [Test]
        public void AddTimelog_ProjectCompleted_Error() {

            var _context = CreateProjectTestData();
            TimelogsController sut = new TimelogsController(_context);

            DateTime temp = DateTime.Now.Date;
            var testTimelog = new Timelog
            {
                ProjectId = 2,
                Description = "Unit Tests",
                StartTime = temp.AddHours(-10),
                EndTime = temp.AddHours(-8),
            };

            var actual = sut.AddTimelog(testTimelog);

            BadRequestObjectResult brqObj = actual as BadRequestObjectResult;
            string message = brqObj.Value.ToString();


            Assert.AreEqual(StatusCodes.Status400BadRequest, brqObj.StatusCode);
            Assert.AreEqual("Can't add timelogs to the complited project.", message);
        }

        [Test]
        public void AddTimelog_DescriptionEmpty_Error()
        {

            var _context = CreateProjectTestData();
            TimelogsController sut = new TimelogsController(_context);

            DateTime temp = DateTime.Now.Date;
            var testTimelog = new Timelog
            {
                ProjectId = 1,
                Description = "",
                StartTime = temp.AddHours(-10),
                EndTime = temp.AddHours(-8),
            };

            var actual = sut.AddTimelog(testTimelog);

            BadRequestObjectResult brqObj = actual as BadRequestObjectResult;
            string message = brqObj.Value.ToString();


            Assert.AreEqual(StatusCodes.Status400BadRequest, brqObj.StatusCode);
            Assert.AreEqual("Description can't be empty.", message);
        }

        [Test]
        public void AddTimelog_EndTimeBeforeStart_Error()
        {
            var _context = CreateProjectTestData();
            TimelogsController sut = new TimelogsController(_context);

            DateTime temp = DateTime.Now.Date;
            var testTimelog = new Timelog
            {
                ProjectId = 1,
                Description = "Unit Tests",
                StartTime = temp.AddHours(-5),
                EndTime = temp.AddHours(-8),
            };

            var actual = sut.AddTimelog(testTimelog);

            BadRequestObjectResult brqObj = actual as BadRequestObjectResult;
            string message = brqObj.Value.ToString();


            Assert.AreEqual(StatusCodes.Status400BadRequest, brqObj.StatusCode);
            Assert.AreEqual("End time can't be before start time.", message);
        }

        [Test]
        public void AddTimelog_TotalTime_LessThan30_Error()
        {
            var _context = CreateProjectTestData();
            TimelogsController sut = new TimelogsController(_context);

            DateTime temp = DateTime.Now.Date;
            var testTimelog = new Timelog
            {
                ProjectId = 1,
                Description = "Unit Tests",
                StartTime = temp.AddHours(-1),
                EndTime = temp.AddMinutes(-40),
            };

            var actual = sut.AddTimelog(testTimelog);

            BadRequestObjectResult brqObj = actual as BadRequestObjectResult;
            string message = brqObj.Value.ToString();


            Assert.AreEqual(StatusCodes.Status400BadRequest, brqObj.StatusCode);
            Assert.AreEqual("Total time of task needs to be 30min or longer.", message);
        }

        [Test]
        public void AddTimelog_TotalTime30_Success()
        {
            var _context = CreateProjectTestData();
            TimelogsController sut = new TimelogsController(_context);

            DateTime temp = DateTime.Now.Date;
            var testTimelog = new Timelog
            {
                ProjectId = 1,
                Description = "Unit Tests",
                StartTime = temp.AddHours(-1),
                EndTime = temp.AddMinutes(-30),
            };

            var actual = sut.AddTimelog(testTimelog);

            OkObjectResult result = actual as OkObjectResult;

            Assert.AreEqual(StatusCodes.Status200OK, result.StatusCode);
            Assert.IsNotNull(result.Value);
        }

        [Test]
        public void AddTimelog_Success()
        {
            var _context = CreateProjectTestData();
            TimelogsController sut = new TimelogsController(_context);

            DateTime temp = DateTime.Now.Date;
            var testTimelog = new Timelog
            {
                ProjectId = 1,
                Description = "Unit Tests",
                StartTime = temp.AddHours(-8),
                EndTime = temp.AddHours(-5)
            };

            var actual = sut.AddTimelog(testTimelog);

            OkObjectResult result = actual as OkObjectResult;

            Assert.AreEqual(StatusCodes.Status200OK, result.StatusCode);
            Assert.IsNotNull(result.Value);
        }


        [DbFunction]
        private ApiContext CreateProjectTestData()
        {
            var options = new DbContextOptionsBuilder<Timelogger.ApiContext>().UseInMemoryDatabase(databaseName: "createProjectTestData").Options;
            var _context = new ApiContext(options);

            DateTime temp = DateTime.Now.Date;

            var testProject = new Project
            {
                Id = 1,
                Name = "Project test",
                TotalHours = 0,
                Deadline = temp.AddDays(5),
                IsCompleted = false
            };

            var testProject2 = new Project
            {
                Id = 2,
                Name = "Project test2",
                TotalHours = 0,
                Deadline = temp.AddDays(8),
                IsCompleted = true
            };

            _context.Projects.Add(testProject);
            _context.Projects.Add(testProject2);

            _context.SaveChanges();
            return _context;
        }

        [DbFunction]
        private ApiContext AddTimelogstestData()
        {
            ApiContext _context = CreateProjectTestData();

            DateTime temp = DateTime.Now.Date;
            var testTimelog = new Timelog
            {
                ProjectId = 1,
                Description = "Unit Tests",
                StartTime = temp.AddHours(-10),
                EndTime = temp.AddHours(-8),
            };

            _context.Timelogs.Add(testTimelog);
            _context.LastTimelogsId = 2;
            _context.SaveChanges();


            return _context;
        }
    }
} 
