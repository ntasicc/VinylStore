using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    [Table("Genre")]
    public class Genre{
         [Key]
        [Column("ID")]
        public int ID {get; set;}

        [Column("Name")]
        [MaxLength(255)]
        public string Name { get; set; }  
          
        public virtual List<Vinyl> Vinyls {get; set;}

        [JsonIgnore]
        public Shop Shop {get; set;}
    }
}