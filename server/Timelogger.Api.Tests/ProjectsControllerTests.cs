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
using System.Net;

namespace Timelogger.Api.Tests
{
    public class ProjectsControllerTests
    {

        [Test]
        public void HelloWorld_ShouldReply_HelloBack()
        {
            ProjectsController sut = new ProjectsController(null);

            string actual = sut.HelloWorld();

            Assert.AreEqual("Hello Back!", actual);
        }
        
        /*Add Project tests */

        [Test]
        public void AddProject_Deadline_InPastError()
        {
            ProjectsController sut = new ProjectsController(null);

            DateTime temp = DateTime.Now.Date;
            var testProject = new Project
            {
                Name = "e-conomic Interview",
                TotalHours = TimeSpan.FromHours(0),
                Deadline = temp.AddDays(-5),
                IsCompleted = false

            };
            var actual = sut.AddProject(testProject);

            BadRequestObjectResult brqObj = actual as BadRequestObjectResult;
            string message = brqObj.Value.ToString();


            Assert.AreEqual(StatusCodes.Status400BadRequest, brqObj.StatusCode);
            Assert.AreEqual("Project deadline can't be in the past.", message);
        }
        
 
        [Test]
        public void AddProject_ProjectName_EmptyError() { 
   
            ProjectsController sut = new ProjectsController(null);

            DateTime temp = DateTime.Now.Date;
            var testProject = new Project
            {
                Name = "",
                TotalHours = TimeSpan.FromHours(0),
                Deadline = temp.AddDays(5),
                IsCompleted = false

            };
            var actual = sut.AddProject(testProject);

            BadRequestObjectResult brqObj = actual as BadRequestObjectResult;
            string message = brqObj.Value.ToString();


            Assert.AreEqual(StatusCodes.Status400BadRequest, brqObj.StatusCode);
            Assert.AreEqual("Project name can't be empty.", message);
        }


        [Test]
        public void AddProject_Success()
        {
            var options = new DbContextOptionsBuilder<Timelogger.ApiContext>().UseInMemoryDatabase(databaseName: "AddProject_Success").Options;
            var _context = new ApiContext(options);

            ProjectsController sut = new ProjectsController(_context);
            DateTime temp = DateTime.Now.Date;

            var testProject = new Project
            {
                Name = "Project test",
                TotalHours = TimeSpan.FromMinutes(0),
                Deadline = temp.AddDays(5),
                IsCompleted = false
            };
  
            var actual = sut.AddProject(testProject);
            OkObjectResult result = actual as OkObjectResult;
        
            Assert.AreEqual(StatusCodes.Status200OK, result.StatusCode);
            Assert.IsNotNull(result.Value);
        }


      


    }
} 
