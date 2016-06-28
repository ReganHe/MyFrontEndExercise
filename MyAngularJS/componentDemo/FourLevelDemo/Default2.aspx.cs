using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using FourLevelDemo.Services;

public partial class Default2 : System.Web.UI.Page
{
    private string Type = "ADD";
    private List<Category> _data;
    private int cate1;
    private int cate2;
    private int cate3;
    private int cate4;
    protected void Page_Load(object sender, EventArgs e)
    {
        _data = CategoryService.GetCategoryList();
        var categories = _data.Select(r => new Category { CateId = r.CateId, CateName = r.CateName });
        BindDropDownList(categories, ddlTempCategory1);
        if (Type == "ADD")
        {
            ddlTempCategory2.Visible = false;
            ddlTempCategory3.Visible = false;
            ddlTempCategory4.Visible = false;
        }

    }

    private void BindDropDownList(IEnumerable<Category> categories, DropDownList ddl)
    {
        ddl.DataSource = categories;
        ddl.DataValueField = "ID";
        ddl.DataTextField = "Name";
        ddl.DataBind();
    }

    protected void ddlTempCategory1_SelectedIndexChanged(object sender, EventArgs e)
    {
        var ddl = sender as DropDownList;
        if (ddl != null)
        {
            ddlTempCategory2.Visible = true;
            cate1 = int.Parse(ddl.SelectedValue);
            var categories = _data.FirstOrDefault(r => r.CateId == cate1)
                .SubCategories
                .Select(r => new Category { CateId = r.CateId, CateName = r.CateName });
            BindDropDownList(categories, ddlTempCategory2);
        }

    }
    protected void ddlTempCategory2_SelectedIndexChanged(object sender, EventArgs e)
    {
        var ddl = sender as DropDownList;
        if (ddl != null)
        {
            ddlTempCategory3.Visible = true;
            cate2 = int.Parse(ddl.SelectedValue);
            var categories = _data.FirstOrDefault(r => r.CateId == cate1)
                .SubCategories.FirstOrDefault(r => r.CateId == cate2)
                .SubCategories
                .Select(r => new Category { CateId = r.CateId, CateName = r.CateName });
            BindDropDownList(categories, ddlTempCategory3);
        }
    }
    protected void ddlTempCategory3_SelectedIndexChanged(object sender, EventArgs e)
    {
        var ddl = sender as DropDownList;
        if (ddl != null)
        {
            ddlTempCategory3.Visible = true;
            cate3 = int.Parse(ddl.SelectedValue);
            var categories = _data.FirstOrDefault(r => r.CateId == cate1)
                .SubCategories.FirstOrDefault(r => r.CateId == cate2)
                .SubCategories.FirstOrDefault(r => r.CateId == cate3)
                .SubCategories
                .Select(r => new Category { CateId = r.CateId, CateName = r.CateName });
            BindDropDownList(categories, ddlTempCategory4);
        }
    }

}


