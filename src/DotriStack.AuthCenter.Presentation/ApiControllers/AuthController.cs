﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace DotriStack.AuthCenter.Presentation.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost("Authorize")]
        public async Task<IActionResult> Authorize() { 
            await Task.Delay(1000);
            return NotFound("Feature not implemented");
        }

        [HttpPost("Token")]
        public async Task<IActionResult> Token()
        {
            await Task.Delay(1000);
            return NotFound("Feature not implemented");
        }

        [HttpPost("Revocation")]
        public async Task<IActionResult> Revocation()
        {
            await Task.Delay(1000);
            return NotFound("Feature not implemented");
        }
    }
}
