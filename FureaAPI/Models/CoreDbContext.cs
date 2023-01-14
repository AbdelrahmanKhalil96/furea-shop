using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace FureaAPI.Models
{
  public partial class CoreDbContext : DbContext
  {
    public CoreDbContext()
    {
    }
    public class ProdData
    {
      public int id { get; set; }
      public string name { get; set; }

      public string categoryName { get; set; }
      public string description { get; set; }
      public double price { get; set; }
      public double oldPrice { get; set; }
      public string image { get; set; }

    }
    public CoreDbContext(DbContextOptions<CoreDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Categories> Categories { get; set; }
    public virtual DbSet<OrderItems> OrderItems { get; set; }
    public virtual DbSet<Orders> Orders { get; set; }
    public virtual DbSet<Products> Products { get; set; }
    public virtual DbSet<Users> Users { get; set; }



  }
}
