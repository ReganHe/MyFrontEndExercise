using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SportStore.Domain.Abstract;
using SportStore.Domain.Entities;
using SportStore.WebUI.Controllers;
using System.Linq;
using System.Collections.Generic;
using System;
using Microsoft.VisualStudio.TestTools.UnitTesting.Web;

namespace SportStore.UnitTests
{
    [TestClass()]
    public class AdminControllerTest
    {
        [TestMethod()]
        public void IndexTest()
        {
            var mock = new Mock<IProductRepository>();
            mock.Setup(m => m.Products).Returns(new Product[] { 
                new Product{ ProductID=1, Name="P1"},
                new Product{ ProductID=2, Name="P2"},
                new Product{ ProductID=3, Name="P3"}
            }.AsQueryable());
            var target = new AdminController(mock.Object);
            Product[] result = ((IEnumerable<Product>)target.Index().ViewData.Model).ToArray();

            Assert.AreEqual(result.Length, 3);
            Assert.AreEqual("P1", result[0].Name);
            Assert.AreEqual("P2", result[1].Name);
            Assert.AreEqual("P3", result[2].Name);
        }

        [TestMethod()]
        public void EditTest_ProductIDExists_CanEdit()
        {
            var mock = new Mock<IProductRepository>();
            mock.Setup(m => m.Products).Returns(new Product[] { 
                new Product{ ProductID=1, Name="P1"},
                new Product{ ProductID=2, Name="P2"},
                new Product{ ProductID=3, Name="P3"}
            }.AsQueryable());
            AdminController target = new AdminController(mock.Object);
            Product p1 = target.Edit(1).ViewData.Model as Product;
            Product p2 = target.Edit(2).ViewData.Model as Product;
            Product p3 = target.Edit(3).ViewData.Model as Product;
            Assert.AreEqual(1, p1.ProductID);
            Assert.AreEqual(2, p2.ProductID);
            Assert.AreEqual(3, p3.ProductID);
        }

        [TestMethod()]
        public void EditTest_ProductIdNotExist_CannotEdit()
        {
            var mock = new Mock<IProductRepository>();
            mock.Setup(m => m.Products).Returns(new Product[] { 
                new Product{ ProductID=1, Name="P1"},
                new Product{ ProductID=2, Name="P2"},
                new Product{ ProductID=3, Name="P3"}
            }.AsQueryable());
            var target = new AdminController(mock.Object);
            Product result = (Product)target.Edit(4).ViewData.Model;
            Assert.IsNull(result);
        }

        [TestMethod()]
        public void EditTest_CanSaveValidChanges()
        {
            var mock = new Mock<IProductRepository>();
            var target = new AdminController(mock.Object);
            var product = new Product { Name = "Test" };
            ActionResult actual = target.Edit(product, null);
            ////检查是否调用了存储库
            mock.Verify(m => m.SaveProduct(product));
            ////检查方法的结果类型
            Assert.IsNotInstanceOfType(actual, typeof(ViewResult));
        }

        [TestMethod]
        public void EditTest_CannotSaveInvalidChanges()
        {
            var mock = new Mock<IProductRepository>();
            var target = new AdminController(mock.Object);
            var product = new Product { Name = "Test" };
            target.ModelState.AddModelError("error", "error");
            ActionResult actual = target.Edit(product, null);
            ////检查是否调用了存储库
            mock.Verify(m => m.SaveProduct(It.IsAny<Product>()), Times.Never());
            ////检查方法的结果类型
            Assert.IsInstanceOfType(actual, typeof(ViewResult));
        }

        [TestMethod]
        public void Can_Delete_Valid_Products()
        {
            var product = new Product { ProductID = 2, Name = "Test" };
            var mock = new Mock<IProductRepository>();
            mock.Setup(m => m.Products).Returns(new Product[]
            {
                new Product {ProductID = 1, Name = "P1"},
                new Product {ProductID = 3, Name = "P3"}
            }.AsQueryable());
            var target = new AdminController(mock.Object);
            target.Delete(product.ProductID);
            mock.Verify(m => m.DeleteProduct(product.ProductID));
        }
    }
}
