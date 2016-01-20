namespace HelperMethods.Models
{
    public class CodeDescription
    {
        public int Code { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public CodeDescription(int code, string description, string category)
        {
            this.Code = code;
            this.Description = description;
            this.Category = category;
        }
    }
}