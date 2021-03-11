using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    [Table("Vinyl")]
    public class Vinyl{
        [Key]
        [Column("ID")]
        public int ID {get; set;}

        [Column("Name")]
        [MaxLength(255)]
        public string Name { get; set; }

        [Column("Performer")]
        [MaxLength(255)]
        public string Performer { get; set; }

        [Column("Price")]
        public int Price { get; set; }

        [Column("Image")]
        public string Img { get; set; }

        [JsonIgnore]
        public Genre Genre {get; set;}
        

    }
}