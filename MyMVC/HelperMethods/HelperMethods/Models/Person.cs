using System.ComponentModel.DataAnnotations;

namespace HelperMethods.Models
{
    public class Person
    {
        public string Name { get; set; }

        public int Gender { get; set; }

        [Display(Name = "Marital Status")]
        public int MaritalStatus { get; set; }

        public int[] Country { get; set; }

    }
}
