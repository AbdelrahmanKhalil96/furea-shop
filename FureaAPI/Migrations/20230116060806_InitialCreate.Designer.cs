﻿// <auto-generated />
using System;
using FureaAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace FureaAPI.Migrations
{
    [DbContext(typeof(CoreDbContext))]
    [Migration("20230116060806_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.20")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("FureaAPI.Models.Categories", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnName("name")
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("categories");
                });

            modelBuilder.Entity("FureaAPI.Models.OrderItems", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("NoPieces")
                        .HasColumnName("no_pieces")
                        .HasColumnType("int");

                    b.Property<int>("OrderId")
                        .HasColumnName("order_id")
                        .HasColumnType("int");

                    b.Property<double>("Price")
                        .HasColumnName("price")
                        .HasColumnType("float");

                    b.Property<int>("ProductId")
                        .HasColumnName("product_id")
                        .HasColumnType("int");

                    b.Property<double>("Total")
                        .HasColumnName("total")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("OrderId");

                    b.HasIndex("ProductId");

                    b.ToTable("order_items");
                });

            modelBuilder.Entity("FureaAPI.Models.Orders", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("OrderDate")
                        .HasColumnName("order_date")
                        .HasColumnType("datetime");

                    b.Property<string>("OrderStatus")
                        .HasColumnName("order_status")
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<double?>("TotalAmount")
                        .HasColumnName("total_amount")
                        .HasColumnType("float");

                    b.Property<int>("UserId")
                        .HasColumnName("user_id")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("orders");
                });

            modelBuilder.Entity("FureaAPI.Models.Products", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CategoryId")
                        .HasColumnName("category_id")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnName("description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Image")
                        .HasColumnName("image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Image2")
                        .HasColumnName("image2")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Image3")
                        .HasColumnName("image3")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Image4")
                        .HasColumnName("image4")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnName("name")
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<double?>("OldPrice")
                        .HasColumnName("old_price")
                        .HasColumnType("float");

                    b.Property<double>("Price")
                        .HasColumnName("price")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.ToTable("products");
                });

            modelBuilder.Entity("FureaAPI.Models.Users", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .HasColumnName("email")
                        .HasColumnType("nvarchar(10)")
                        .HasMaxLength(10);

                    b.Property<string>("Image")
                        .HasColumnName("image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnName("name")
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<string>("Password")
                        .HasColumnName("password")
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<string>("Title")
                        .HasColumnName("title")
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("users");
                });

            modelBuilder.Entity("FureaAPI.Models.OrderItems", b =>
                {
                    b.HasOne("FureaAPI.Models.Orders", "Order")
                        .WithMany("OrderItems")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FureaAPI.Models.Products", "Product")
                        .WithMany("OrderItems")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("FureaAPI.Models.Orders", b =>
                {
                    b.HasOne("FureaAPI.Models.Users", "User")
                        .WithMany("Orders")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
