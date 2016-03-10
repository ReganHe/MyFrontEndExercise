using System;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.VisualStudio.TestTools.UnitTesting.Web;
using SportStore.Domain.Abstract;
using SportStore.Domain.Entities;
using SportStore.WebUI.Controllers;
using Moq;
using System.Linq;
using System.Collections.Generic;
using SportStore.WebUI.Models;


namespace SportStore.UnitTests
{
    [TestClass()]
    public class ProductControllerTest
    {
        [TestMethod()]
        public void ListTest_CanPaginate()
        {
            Mock<IProductRepository> mock = new Mock<IProductRepository>();
            mock.Setup(m => m.Products).Returns(new Product[] { 
                new Product{ ProductID=1,Name="P1"},
                new Product{ ProductID=2,Name="P2"},
                new Product{ ProductID=3,Name="P3"},
                new Product{ ProductID=4,Name="P4"},
                new Product{ ProductID=5,Name="P5"}
            }.AsQueryable());
            var controller = new ProductController(mock.Object) { PageSize = 3 };
            var result = (ProductsListViewModel)controller.List(null, 2).Model;
            Product[] prodArray = result.Products.ToArray();
            Assert.IsTrue(prodArray.Length == 2);
            Assert.AreEqual(prodArray[0].Name, "P4");
            Assert.AreEqual(prodArray[1].Name, "P5");
        }

        [TestMethod()]
        public void ListTest_CanSendPaginationViewModel()
        {
            Mock<IProductRepository> mock = new Mock<IProductRepository>();
            mock.Setup(m => m.Products).Returns(new Product[] { 
                new Product{ ProductID=1,Name="P1"},
                new Product{ ProductID=2,Name="P2"},
                new Product{ ProductID=3,Name="P3"},
                new Product{ ProductID=4,Name="P4"},
                new Product{ ProductID=5,Name="P5"}
            }.AsQueryable());
            var controller = new ProductController(mock.Object) { PageSize = 3 };
            var result = (ProductsListViewModel)controller.List(null, 2).Model;

            PagingInfo pageInfo = result.PagingInfo;
            Assert.AreEqual(pageInfo.CurrentPage, 2);
            Assert.AreEqual(pageInfo.ItemsPerPage, 3);
            Assert.AreEqual(pageInfo.TotalItems, 5);
            Assert.AreEqual(pageInfo.TotalPages, 2);
        }

        [TestMethod()]
        public void ListTest_CanFilterProducts()
        {
            Mock<IProductRepository> mock = new Mock<IProductRepository>();
            mock.Setup(m => m.Products).Returns(new Product[] { 
                new Product{ ProductID=1,Name="P1", Category="Cat1"},
                new Product{ ProductID=2,Name="P2", Category="Cat2"},
                new Product{ ProductID=3,Name="P3", Category="Cat1"},
                new Product{ ProductID=4,Name="P4", Category="Cat2"},
                new Product{ ProductID=5,Name="P5", Category="Cat3"}
            }.AsQueryable());
            var controller = new ProductController(mock.Object) { PageSize = 3 };
            Product[] result = ((ProductsListViewModel)controller.List("Cat2", 1).Model).Products.ToArray();

            Assert.AreEqual(result.Length, 2);
            Assert.IsTrue(result[0].Name == "P2" && result[0].Category == "Cat2");
            Assert.IsTrue(result[1].Name == "P4" && result[1].Category == "Cat2");
        }

        [TestMethod()]
        public void ListTest_GenerateCategorySpecificProductCount()
        {
            Mock<IProductRepository> mock = new Mock<IProductRepository>();
            mock.Setup(m => m.Products).Returns(new Product[] { 
                new Product{ ProductID=1,Name="P1", Category="Cat1"},
                new Product{ ProductID=2,Name="P2", Category="Cat2"},
                new Product{ ProductID=3,Name="P3", Category="Cat1"},
                new Product{ ProductID=4,Name="P4", Category="Cat2"},
                new Product{ ProductID=5,Name="P5", Category="Cat3"}
            }.AsQueryable());
            var target = new ProductController(mock.Object) { PageSize = 3 };

            int res1 = ((ProductsListViewModel)target.List("Cat1").Model).PagingInfo.TotalItems;
            int res2 = ((ProductsListViewModel)target.List("Cat2").Model).PagingInfo.TotalItems;
            int res3 = ((ProductsListViewModel)target.List("Cat3").Model).PagingInfo.TotalItems;
            int resAll = ((ProductsListViewModel)target.List(null).Model).PagingInfo.TotalItems;

            Assert.AreEqual(res1, 2);
            Assert.AreEqual(res2, 2);
            Assert.AreEqual(res3, 1);
            Assert.AreEqual(resAll, 5);
        }
    }
}
