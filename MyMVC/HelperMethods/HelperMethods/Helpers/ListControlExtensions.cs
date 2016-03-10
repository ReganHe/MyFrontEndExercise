using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using HelperMethods.Models;

namespace HelperMethods.Helpers
{
    public static class ListControlExtensions
    {
        public static MvcHtmlString RadioButtonList(this HtmlHelper htmlHelper, string name, Dictionary<int, string> codes, RepeatDirection repeatDirection = RepeatDirection.Horizontal)
        {
            return ListControlUtil.GenerateHtml(name, codes, repeatDirection, "radio", null);
        }

        public static MvcHtmlString RadioButtonListFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, Dictionary<int, string> codes, RepeatDirection repeatDirection = RepeatDirection.Horizontal)
        {
            var metadata = ModelMetadata.FromLambdaExpression(expression, htmlHelper.ViewData);
            var name = ExpressionHelper.GetExpressionText(expression);
            var fullHtmlFieldName = htmlHelper.ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(name);
            return ListControlUtil.GenerateHtml(fullHtmlFieldName, codes, repeatDirection, "radio", metadata.Model);
        }

        public static MvcHtmlString CheckBoxList(this HtmlHelper htmlHelper, string name, Dictionary<int, string> codes, RepeatDirection repeatDirection = RepeatDirection.Horizontal)
        {
            return ListControlUtil.GenerateHtml(name, codes, repeatDirection, "checkbox", null);
        }

        public static MvcHtmlString CheckBoxListFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, Dictionary<int, string> codes, RepeatDirection repeatDirection = RepeatDirection.Horizontal)
        {
            var metadata = ModelMetadata.FromLambdaExpression(expression, htmlHelper.ViewData);
            var name = ExpressionHelper.GetExpressionText(expression);
            var fullHtmlFieldName = htmlHelper.ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(name);
            return ListControlUtil.GenerateHtml(fullHtmlFieldName, codes, repeatDirection, "checkbox", metadata.Model);
        }
    }
}