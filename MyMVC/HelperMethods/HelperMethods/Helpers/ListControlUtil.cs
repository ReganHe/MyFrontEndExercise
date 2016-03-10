using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using HelperMethods.Models;

namespace HelperMethods.Helpers
{
    public static class ListControlUtil
    {

        public static MvcHtmlString GenerateHtml(string name, Dictionary<int, string> dictionary, RepeatDirection repeatDirection, string type, object stateValue)
        {
            var table = new TagBuilder("table");
            var i = 0;
            var isCheckBox = type == "checkbox";
            if (repeatDirection == RepeatDirection.Horizontal)
            {
                var tr = new TagBuilder("tr");
                foreach (var key in dictionary.Keys)
                {
                    i++;
                    var id = string.Format("{0}_{1}", name, i);
                    var td = new TagBuilder("td");
                    var isChecked = false;
                    if (isCheckBox)
                    {
                        var currentValues = stateValue as IEnumerable<int>;
                        isChecked = (null != currentValues && currentValues.Contains(key));
                    }
                    else
                    {
                        var currentValue = (int)stateValue;
                        isChecked = (key == currentValue);
                    }

                    td.InnerHtml = GenerateRadioHtml(name, id, dictionary[key], key, isChecked, type);
                    tr.InnerHtml += td.ToString();
                }

                table.InnerHtml = tr.ToString();
            }
            else
            {
                foreach (var key in dictionary.Keys)
                {
                    var tr = new TagBuilder("tr");
                    i++;
                    var id = string.Format("{0}_{1}", name, i);
                    var td = new TagBuilder("td");
                    var isChecked = false;
                    if (isCheckBox)
                    {
                        var currentValues = stateValue as IEnumerable<int>;
                        isChecked = (null != currentValues && currentValues.Contains(key));
                    }
                    else
                    {
                        var currentValue = (int)stateValue;
                        isChecked = (key == currentValue);
                    }

                    td.InnerHtml = GenerateRadioHtml(name, id, dictionary[key], key, isChecked, type);
                    tr.InnerHtml = td.ToString();
                    table.InnerHtml += tr.ToString();
                }
            }

            return new MvcHtmlString(table.ToString());
        }

        private static string GenerateRadioHtml(string name, string id, string labelText, int value, bool isChecked, string type)
        {
            var sb = new StringBuilder();
            var label = new TagBuilder("label");
            label.MergeAttribute("for", id);
            label.SetInnerText(labelText);
            var input = new TagBuilder("input");
            input.GenerateId(id);
            input.MergeAttribute("name", name);
            input.MergeAttribute("type", type);
            input.MergeAttribute("value", value.ToString(CultureInfo.InvariantCulture));
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