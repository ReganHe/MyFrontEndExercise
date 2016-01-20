using System.Web.Mvc;
using HelperMethods.Models;

namespace HelperMethods.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            BindCollection();
            return View(new Person { Name = "Foo", Gender = 1, MaritalStatus = 1, Country = new[] { 1, 2 } });
        }

        [HttpPost]
        public ActionResult Index(Person person)
        {
            BindCollection();
            return View(person);
        }

        private void BindCollection()
        {
            ViewData["GenderData"] = new[]
            {
                new CodeDescription(1, "Male", "Gender"),
                new CodeDescription(2, "Female", "Gender")
            };
            ViewData["MaritalStatusData"] = new[]
            {
                new CodeDescription(1, "Single", "MaritalStatus"),
                new CodeDescription(2, "Married", "MaritalStatus")
            };
            ViewData["CountryData"] = new[]
            {
                new CodeDescription(1, "China", "Country"),
                new CodeDescription(2, "Unite States", "Country"),
                new CodeDescription(3, "Britain", "Country"),
                new CodeDescription(4, "Singapore", "Country")
            };
        }
    }
}