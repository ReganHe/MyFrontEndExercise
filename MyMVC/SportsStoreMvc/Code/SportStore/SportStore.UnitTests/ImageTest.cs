using System;
using System.Linq;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SportStore.Domain.Abstract;
using SportStore.Domain.Entities;
using SportStore.WebUI.Controllers;

namespace SportStore.UnitTests
{
    [TestClass]
    public class ImageTest
    {
        [TestMethod]
        public void Can_Retrieve_Image_Data()
        {
            var prod = new Product
            {
                ProductID = 2,
                Name = "Test",
                ImageData = new byte[] { },
                ImageMimeType = "image/png"
            };
            var mock = new Mock<IProductRepository>();
            mock.Setup(m => m.Products)
                .Returns(value: new Product[]
                {
                    new Product{ProductID = 1,Name = "P1"},
                    prod,
                    new Product(){ProductID = 3,Name = "P3"}, 
                }.AsQueryable());
            var target = new ProductController(mock.Object);
            ActionResult result = target.GetImage(2);
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(FileResult));
            Assert.AreEqual(prod.ImageMimeType, ((FileResult)result).ContentType);
        }

        [TestMethod]
        public void Cannot_Retrieve_Image_Data_For_Invalid_ID()
        {
            var mock = new Mock<IProductRepository>();
            mock.Setup(m => m.Products).Returns(new Product[]
            {
             new Product(){ProductID = 1,Name = "P1"}, 
             new Product(){ProductID = 2,Name="P2"}, 
            }.AsQueryable());
            var target = new ProductController(mock.Object);
            ActionResult result = target.GetImage(100);
            Assert.IsNull(result);
        }
    }
}
