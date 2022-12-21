using Timelogger.Api.Controllers;
using NUnit.Framework;

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
        /*
        [TestMethod]
        public void ProjectDeadline_ShouldNotBe_InPast()
        {
            ProjectsController sut = new ProjectsController(null);

            string actual = sut.addProject();

            Assert.AreEqual("Project deadline can't be in the past.", actual);
        }
        */
        /*
        [TestMethod]
        public void TestStartDateBeforeEndDate()
        {
            // Arrange
            DateTime startDate = new DateTime(2020, 1, 1);
            DateTime endDate = new DateTime(2020, 1, 31);

            // Act
            // bool result = IsStartDateBeforeEndDate(startDate, endDate);

            // Assert
            // Assert.IsTrue(result);
        }
        */

    }
} 
