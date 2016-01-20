using System.Web.Mvc;
using HelperMethods.Models;

namespace HelperMethods.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View(new Person { Name = "Foo", Gender = 1, MaritalStatus = 1, Country = new[] { 1, 2 } });
        }

        [HttpPost]
        public ActionResult Index(Person person)
        {
            return View(person);
        }
    }
}