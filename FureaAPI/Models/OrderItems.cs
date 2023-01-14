using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FureaAPI.Models
{
    [Table("order_items")]
    public partial class OrderItems
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("order_id")]
        public int OrderId { get; set; }
        [Column("product_id")]
        public int ProductId { get; set; }
        [Column("price")]
        public double Price { get; set; }
        [Column("no_pieces")]
        public int NoPieces { get; set; }
        [Column("total")]
        public double Total { get; set; }

        [ForeignKey(nameof(OrderId))]
        [InverseProperty(nameof(Orders.OrderItems))]
        public virtual Orders Order { get; set; }
        [ForeignKey(nameof(ProductId))]
        [InverseProperty(nameof(Products.OrderItems))]
        public virtual Products Product { get; set; }
    }
}
