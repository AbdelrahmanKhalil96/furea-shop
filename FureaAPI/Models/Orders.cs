using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FureaAPI.Models
{
    [Table("orders")]
    public partial class Orders
    {
        public Orders()
        {
            OrderItems = new HashSet<OrderItems>();
        }

        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("user_id")]
        public int UserId { get; set; }
        [Column("order_date", TypeName = "datetime")]
        public DateTime? OrderDate { get; set; }
        [Column("total_amount")]
        public double? TotalAmount { get; set; }
        [Column("order_status")]
        [StringLength(50)]
        public string OrderStatus { get; set; }

        [ForeignKey(nameof(UserId))]
        [InverseProperty(nameof(Users.Orders))]
        public virtual Users User { get; set; }
        [InverseProperty("Order")]
        public virtual ICollection<OrderItems> OrderItems { get; set; }
    }
}
