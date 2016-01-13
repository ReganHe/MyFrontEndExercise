using System;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SportStore.Domain.Abstract;
using SportStore.WebUI.Controllers;
using SportStore.WebUI.Models;

namespace SportStore.UnitTests
{
    [TestClass]
    public class AdminSecurityTest
    {
        [TestMethod]
        public void Can_Login_With_Valid_Credentials()
        {
            var mock = new Mock<IAuthProvider>();
            mock.Setup(m => m.Authenticate("admin", "secret"))
                .Returns(true);
            var model = new LoginViewModel
            {
                UserName = "admin",
                Password = "secret"
            };
            var target = new AccountController(mock.Object);
            ActionResult result = target.Login(model, "/MyURL");
            Assert.IsInstanceOfType(result, typeof(RedirectResult));
            Assert.AreEqual("/MyURL", ((RedirectResult)result).Url);
        }

        public void Cannot_Login_With_Invalid_Credentials()
        {
            var mock = new Mock<IAuthProvider>();
            mock.Setup(m => m.Authenticate("badUser", "badPass"))
                .Returns(false);
            var model = new LoginViewModel
            {
                UserName = "badUser",
                Password = "badPass"
            };
            var target = new AccountController(mock.Object);
            ActionResult result = target.Login(model, "/MyURL");
            Assert.IsInstanceOfType(result, typeof(ViewResult));
            Assert.IsFalse(((ViewResult)result).ViewData.ModelState.IsValid);
        }
    }
}
