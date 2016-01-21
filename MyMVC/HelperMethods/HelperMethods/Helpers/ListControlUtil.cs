using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using HelperMethods.Models;

namespace HelperMethods.Helpers
{
    public static class ListControlUtil
    {

        public static MvcHtmlString GenerateHtml(string name, IEnumerable<CodeDescription> codes, RepeatDirection repeatDirection, string type, object stateValue)
        {
            var table = new TagBuilder("table");
            var i = 0;
            var isCheckBox = type == "checkbox";
            if (repeatDirection == RepeatDirection.Horizontal)
            {
                var tr = new TagBuilder("tr");
                foreach (var code in codes)
                {
                    i++;
                    var id = string.Format("{0}_{1}", name, i);
                    var td = new TagBuilder("td");
                    var isChecked = false;
                    if (isCheckBox)
                    {
                        var currentValues = stateValue as IEnumerable<string>;
                        isChecked = (null != currentValues && currentValues.Contains(code.Code));
                    }
                    else
                    {
                        var currentValue = stateValue as string;
                        isChecked = (null != currentValue && code.Code == currentValue);
                    }
                    
                    td.InnerHtml = GenerateRadioHtml(name, id, code.Description, code.Code, isChecked, type);
                    tr.InnerHtml += td.ToString();
                }

                table.InnerHtml = tr.ToString();
            }
            else
            {
                foreach (var code in codes)
                {
                    var tr = new TagBuilder("tr");
                    i++;
                    var id = string.Format("{0}_{1}", name, i);
                    var td = new TagBuilder("td");
                    var isChecked = false;
                    if (isCheckBox)
                    {
                        var currentValues = stateValue as IEnumerable<string>;
                        isChecked = (null != currentValues && currentValues.Contains(code.Code));
                    }
                    else
                    {
                        var currentValue = stateValue as string;
                        isChecked = (null != currentValue && code.Code == currentValue);
                    }

                    td.InnerHtml = GenerateRadioHtml(name, id, code.Description, code.Code, isChecked, type);
                    tr.InnerHtml = td.ToString();
                    table.InnerHtml += tr.ToString();
                }
            }

            return new MvcHtmlString(table.ToString());
        }

        private static string GenerateRadioHtml(string name, string id, string labelText, string value, bool isChecked, string type)
        {
            var sb = new StringBuilder();
            var label = new TagBuilder("label");
            label.MergeAttribute("for", id);
            label.SetInnerText(labelText);
            var input = new TagBuilder("input");
            input.GenerateId(id);
            input.MergeAttribute("name", name);
            input.MergeAttribute("type", type);
            input.MergeAttribute("value", value);
            if (isChecked)
            {
                input.MergeAttribute("checked", "checked");
            }
            sb.AppendLine(input.ToString());
            sb.AppendLine(label.ToString());
            return sb.ToString();
        }
    }
}