using Microsoft.AspNetCore.Mvc;

namespace DotriStack.AuthCenter.Presentation.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpPost("Info")]
        public async Task<IActionResult> Info()
        {
            await Task.Delay(1000);
            return NotFound("Feature not implemented");
        }

        [HttpPost("Session")]
        public async Task<IActionResult> Session()
        {
            await Task.Delay(1000);
            return NotFound("Feature not implemented");
        }

        [HttpPost("EndSession")]
        public async Task<IActionResult> EndSession()
        {
            await Task.Delay(1000);
            return NotFound("Feature not implemented");
        }
    }
}
