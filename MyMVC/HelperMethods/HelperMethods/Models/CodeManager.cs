using System.Collections.ObjectModel;
using System.Linq;

namespace HelperMethods.Models
{
    public static class CodeManager
    {
        private static readonly CodeDescription[] Codes =
        {
            new CodeDescription(1,"Male","Gender"),
            new CodeDescription(2,"Female","Gender"),
            new CodeDescription(1,"Single","MaritalStatus"),
            new CodeDescription(2,"Married","MaritalStatus"),
            new CodeDescription(1,"China","Country"),
            new CodeDescription(2,"Unite States","Country"),
            new CodeDescription(3,"Britain","Country"),
            new CodeDescription(4,"Singapore","Country")
        };

        public static Collection<CodeDescription> GetCodes(string category)
        {
            var codeCollection = new Collection<CodeDescription>();
            foreach (var code in Codes.Where(code => code.Category == category))
            {
                codeCollection.Add(code);
            }

            return codeCollection;
        }
    }
}