using System;
using System.Collections.Generic;
using System.Web.Services;
using FourLevelDemo.Services;
using Newtonsoft.Json;

public partial class Default : System.Web.UI.Page
{
    public int LoadCategoryId { get; set; }

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            LoadCategoryId = 1010203;
        }
    }


    protected void Button1_Click(object sender, EventArgs e)
    {
        Button1.Text = hfCategory.Value;
    }
}