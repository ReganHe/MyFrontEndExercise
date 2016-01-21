using System.ComponentModel.DataAnnotations;

namespace HelperMethods.Models
{
    public class Person
    {
        public string Name { get; set; }

        public string Gender { get; set; }

        [Display(Name = "Marital Status")]
        public string MaritalStatus { get; set; }

        public string[] Country { get; set; }

    }
}
