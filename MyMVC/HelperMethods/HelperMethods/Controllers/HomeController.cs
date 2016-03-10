using System.Collections.Generic;
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
            ViewData["GenderData"] = new Dictionary<int, string>
            {
                {1, "Male"},
                {2, "Female"}
            };
            ViewData["MaritalStatusData"] = new Dictionary<int, string>
            {
                {1, "Single"},
                {2, "Married"}
            };
            ViewData["CountryData"] = new Dictionary<int, string>
            {
                {1, "China"},
                {2, "Unite States"},
                {3, "Britain"},
                {4, "Singapore"}
            };
        }
    }
}