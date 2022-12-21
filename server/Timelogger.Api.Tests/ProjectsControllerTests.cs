using Timelogger.Api.Controllers;
using NUnit.Framework;
using Timelogger.Entities;
using System;
using System.Runtime.ConstrainedExecution;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Server.IIS;

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
        
        [Test]
        public void ProjectDeadline_ShouldNotBe_InPast()
        {
            ProjectsController sut = new ProjectsController(null);

            DateTime temp = DateTime.Now.Date;
            var testProject = new Project
            {
                Name = "e-conomic Interview",
                TotalHours = 0,
                Deadline = temp.AddDays(-5),
                IsCompleted = false

            };
            var actual = sut.AddProject(testProject);

            var data = new BadRequestObjectResult(actual);            
            
            
            Assert.AreEqual(StatusCodes.Status400BadRequest, data.StatusCode);
            //Assert.AreEqual("Project deadline can't be in the past.", (string)(test.Value));
        }
        
 
        [Test]
        public void TestProject_Name_Empty() { 
   
            ProjectsController sut = new ProjectsController(null);

            DateTime temp = DateTime.Now.Date;
            var testProject = new Project
            {
                Name = "",
                TotalHours = 0,
                Deadline = temp.AddDays(5),
                IsCompleted = false

            };
            var actual = sut.AddProject(testProject);

            var data = new BadRequestObjectResult(actual);


            Assert.AreEqual(StatusCodes.Status400BadRequest, data.StatusCode);
            //Assert.AreEqual("Project deadline can't be in the past.", (string)(test.Value));
        }
        

    }
} 
