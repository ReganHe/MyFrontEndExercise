using SportStore.WebUI.Controllers;
using SportStore.Domain.Abstract;
using SportStore.Domain.Entities;
using System.Web.Mvc;
using Moq;
using System.Linq;
using SportStore.WebUI.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace SportStore.UnitTests
{
    [TestClass]
    public class CartControllerTest
    {
        [TestMethod]
        public void AddToCartTest_CanAddToCart()
        {
            var mock = new Mock<IProductRepository>();
            mock.Setup(m => m.Products).Returns(new Product[] {
                new Product{ ProductID=1,Name="P1", Category="Apples"}
            }.AsQueryable());

            var cart = new Cart();
            var target = new CartController(mock.Object, null);
            target.AddToCart(cart, 1, null);

            Assert.AreEqual(cart.Lines.Count(), 1);
            Assert.AreEqual(cart.Lines.ToArray()[0].Product.ProductID, 1);
        }

        [TestMethod]
        public void AddToCartTest_AddingProductToCartGoesToCartScreen()
        {
            var mock = new Mock<IProductRepository>();
            mock.Setup(m => m.Products).Returns(new Product[] {
                new Product{ ProductID=1,Name="P1", Category="Apples"}
            }.AsQueryable());

            var cart = new Cart();
            var target = new CartController(mock.Object, null);

            RedirectToRouteResult result = target.AddToCart(cart, 2, "myUrl");

            Assert.AreEqual(result.RouteValues["action"], "Index");
            Assert.AreEqual(result.RouteValues["returnUrl"], "myUrl");
        }

        [TestMethod]
        public void IndexTest_CanViewCartContents()
        {
            var cart = new Cart();
            var target = new CartController(null, null);

            var result = (CartIndexViewModel)target.Index(cart, "myUrl").Model;
            Assert.AreSame(result.Cart, cart);
            Assert.AreEqual(result.ReturnUrl, "myUrl");
        }

        [TestMethod]
        public void CheckoutTest_CannotCheckoutEmptyCart()
        {
            var mock = new Mock<IOrderProcessor>();
            var cart = new Cart();
            var target = new CartController(null, mock.Object);
            //动作
            ViewResult result = target.Checkout(cart, new ShippingDetails());
            //断言--检查，订单尚未传递给处理器
            mock.Verify(m => m.ProcessOrder(It.IsAny<Cart>(), It.IsAny<ShippingDetails>()), Times.Never);
            //断言--检查，该方法返回的默认视图
            Assert.AreEqual("", result.ViewName);
            //断言--检查，对视图传递一个非法模型
            Assert.AreEqual(false, result.ViewData.ModelState.IsValid);
        }

        [TestMethod]
        public void CheckoutTest_CannotCheckoutInvalidShippingDetails()
        {
            var mock = new Mock<IOrderProcessor>();
            var cart = new Cart();
            cart.AddItem(new Product(), 1);

            var target = new CartController(null, mock.Object);
            //准备--把一个错误添加到模型
            target.ModelState.AddModelError("error", "error");
            //动作--试图结算
            ViewResult result = target.Checkout(cart, new ShippingDetails());

            //断言--检查，订单尚未传递给处理器
            mock.Verify(m => m.ProcessOrder(It.IsAny<Cart>(), It.IsAny<ShippingDetails>()), Times.Never);
            //断言--检查，该方法返回的默认视图
            Assert.AreEqual("", result.ViewName);
            //断言--检查，对视图传递一个非法模型
            Assert.AreEqual(false, result.ViewData.ModelState.IsValid);
        }

        [TestMethod]
        public void CheckoutTest_CannotCheckoutAndSubmitOrder()
        {
            var mock = new Mock<IOrderProcessor>();
            var cart = new Cart();
            cart.AddItem(new Product(), 1);

            var target = new CartController(null, mock.Object);
            //动作--试图结算
            var result = target.Checkout(cart, new ShippingDetails());

            //断言--检查，订单已经传递给处理器
            mock.Verify(m => m.ProcessOrder(It.IsAny<Cart>(), It.IsAny<ShippingDetails>()), Times.Once);
            //断言--检查，该方法返回Completed视图
            Assert.AreEqual("Completed", result.ViewName);
            //断言--检查，对视图传递一个有效的模型
            Assert.AreEqual(true, result.ViewData.ModelState.IsValid);
        }
    }
}
