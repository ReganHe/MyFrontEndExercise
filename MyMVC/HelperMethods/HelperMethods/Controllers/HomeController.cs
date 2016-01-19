using System.Web.Mvc;
using HelperMethods.Models;

namespace HelperMethods.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View(new Person { Name = "Foo", Gender = "M", MaritalStatus = "S", Country = new[] { "CN", "US" } });
        }

        [HttpPost]
        public ActionResult Index(Person person)
        {
            return View(person);
        }
    }
}