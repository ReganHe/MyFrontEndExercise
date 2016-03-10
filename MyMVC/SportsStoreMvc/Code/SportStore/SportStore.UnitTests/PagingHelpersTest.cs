using SportStore.WebUI.HtmlHelpers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using Microsoft.VisualStudio.TestTools.UnitTesting.Web;
using System.Web.Mvc;
using SportStore.WebUI.Models;

namespace SportStore.UnitTests
{


    /// <summary>
    ///这是 PagingHelpersTest 的测试类，旨在
    ///包含所有 PagingHelpersTest 单元测试
    ///</summary>
    [TestClass()]
    public class PagingHelpersTest
    {
        [TestMethod()]
        public void PageLinksTest_CanGeneratePageLinks()
        {
            HtmlHelper htmlHelper = null;
            PagingInfo pagingInfo = new PagingInfo
            {
                CurrentPage = 2,
                TotalItems = 28,
                ItemsPerPage = 10
            };
            Func<int, string> pageUrlDelegate = i => "Page" + i;
            MvcHtmlString expected = MvcHtmlString.Create(@"<a href=""Page1"">1</a><a class=""selected"" href=""Page2"">2</a><a href=""Page3"">3</a>");
            MvcHtmlString actual = PagingHelpers.PageLinks(htmlHelper, pagingInfo, pageUrlDelegate);
            Assert.AreNotEqual(expected, actual);//two different objects
            Assert.AreEqual(expected.ToString(), actual.ToString());
        }
    }
}
