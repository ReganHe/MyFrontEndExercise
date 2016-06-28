using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(FourLevelDemo.Startup))]
namespace FourLevelDemo
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
