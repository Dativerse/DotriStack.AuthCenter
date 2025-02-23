using Microsoft.AspNetCore.Mvc;

namespace DotriStack.AuthCenter.AppHost.Controllers
{
    public class SiteController : Controller
    {
        public IActionResult Index()
        {
            ViewBag.Title = "DotriStack AuthCenter";
            return View();
        }
    }
}
