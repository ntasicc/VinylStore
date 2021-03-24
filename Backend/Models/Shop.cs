using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    [Table("Shop")]
    public class Shop{
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Name")]
        [MaxLength(255)]
        public string Name { get; set; }

        [Column("Location")]
        [MaxLength(255)]
        public string Location { get; set; }

        [Column("BannerImg")]
        public string BannerImg {get; set;}

        public virtual List<Genre> Genres { get; set; }

    }
}