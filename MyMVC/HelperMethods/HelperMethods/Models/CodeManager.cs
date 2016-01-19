using System.Collections.ObjectModel;
using System.Linq;

namespace HelperMethods.Models
{
    public static class CodeManager
    {
        private static readonly CodeDescription[] Codes =
        {
            new CodeDescription("M","Male","Gender"),
            new CodeDescription("F","Female","Gender"),
            new CodeDescription("S","Single","MaritalStatus"),
            new CodeDescription("M","Married","MaritalStatus"),
            new CodeDescription("CN","China","Country"),
            new CodeDescription("US","Unite States","Country"),
            new CodeDescription("UK","Britain","Country"),
            new CodeDescription("SG","Singapore","Country")
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