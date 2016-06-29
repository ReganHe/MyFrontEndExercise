using System;
using System.Collections.Generic;
using System.Web.Services;
using FourLevelDemo.Services;
using Newtonsoft.Json;

public partial class EditProduct : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            CategoryId = 1010203;    
        }
        
    }

    public int CategoryId { get; set; }
    protected void Button1_Click(object sender, EventArgs e)
    {
        var category1 = Request.Form["category1"];
        Button1.Text = category1;
    }
}