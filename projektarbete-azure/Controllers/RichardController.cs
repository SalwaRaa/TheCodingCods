using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using projektarbete_azure.Models;

namespace projektarbete_azure.Controllers
{
    public class RichardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
