using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FureaAPI.Models
{
    [Table("products")]
    public partial class Products
    {
        public Products()
        {
            OrderItems = new HashSet<OrderItems>();
        }

        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("category_id")]
        public int CategoryId { get; set; }
        [Required]
        [Column("name")]
        [StringLength(50)]
        public string Name { get; set; }
        [Column("description")]
        public string Description { get; set; }
        [Column("price")]
        public double Price { get; set; }
        [Column("old_price")]
        public double? OldPrice { get; set; }
        [Column("image")]
        public string Image { get; set; }
        [Column("image2")]
        public string Image2 { get; set; }
        [Column("image3")]
        public string Image3 { get; set; }
        [Column("image4")]
        public string Image4 { get; set; }

        [InverseProperty("Product")]
        public virtual ICollection<OrderItems> OrderItems { get; set; }
    }
}
