<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;
using FourLevelDemo.Services;
using Newtonsoft.Json;

public class Handler : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        var data = CategoryService.GetCategoryList();
        var result = JsonConvert.SerializeObject(data, Formatting.Indented, new JsonSerializerSettings
        {
            ContractResolver = new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver()
        });

        context.Response.ContentType = "text/plain";
        context.Response.Write(result);

    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}