using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SportStore.Domain.Abstract;
using SportStore.Domain.Entities;
using System;
using System.Linq;
using System.Web.Mvc;
using SportStore.WebUI.Controllers;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting.Web;

namespace SportStore.UnitTests
{
    [TestClass()]
    public class NavControllerTest
    {
        [TestMethod()]
        public void MenuTest_CanCreateCategories()
        {
            var mock = new Mock<IProductRepository>();
            mock.Setup(m => m.Products).Returns(new Product[] {
            new Product{ ProductID=1,Name="P1", Category="Apples"},
            new Product{ ProductID=2,Name="P2", Category="Apples"},
            new Product{ ProductID=3,Name="P3", Category="Plums"},
            new Product{ ProductID=4,Name="P4", Category="Oranges"},
            }.AsQueryable());

            var target = new NavController(mock.Object);
            string[] results = ((IEnumerable<string>)target.Menu().Model).ToArray();

            Assert.AreEqual(results.Length, 3);
            Assert.AreEqual(results[0], "Apples");
            Assert.AreEqual(results[1], "Oranges");
            Assert.AreEqual(results[2], "Plums");
        }

        [TestMethod()]
        public void MenuTest_IndicatesSelectedCategory()
        {
            var mock = new Mock<IProductRepository>();
            mock.Setup(m => m.Products).Returns(new Product[] {
                new Product{ ProductID=1,Name="P1", Category="Apples"},
                new Product{ ProductID=4,Name="P2", Category="Oranges"}
            }.AsQueryable());
            var target = new NavController(mock.Object);
            string categoryToSelect = "Apples";
            string result = target.Menu(categoryToSelect).ViewBag.SelectedCategory;
            Assert.AreEqual(categoryToSelect, result);
        }
    }
}
