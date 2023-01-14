using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FureaAPI.Models
{
    [Table("users")]
    public partial class Users
    {
        public Users()
        {
            Orders = new HashSet<Orders>();
        }

        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Required]
        [Column("name")]
        [StringLength(50)]
        public string Name { get; set; }
        [Column("password")]
        [StringLength(50)]
        public string Password { get; set; }
        [Column("email")]
        [StringLength(10)]
        public string Email { get; set; }
        [Column("image")]
        public string Image { get; set; }
        [Column("title")]
        [StringLength(50)]
        public string Title { get; set; }

        [InverseProperty("User")]
        public virtual ICollection<Orders> Orders { get; set; }
    }
}
