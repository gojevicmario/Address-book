﻿// <auto-generated />
using AddressBook.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace AddressBook.Api.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20180904155448_ContactTagRelationChangedToManytoMany")]
    partial class ContactTagRelationChangedToManytoMany
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.2-rtm-30932")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("AddressBook.API.Models.Contact", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address");

                    b.Property<string>("City");

                    b.Property<string>("Country");

                    b.Property<string>("FirstName");

                    b.Property<bool>("IsBookmarked");

                    b.Property<string>("LastName");

                    b.HasKey("Id");

                    b.ToTable("Contacts");
                });

            modelBuilder.Entity("AddressBook.API.Models.ContactTag", b =>
                {
                    b.Property<int>("ContactId");

                    b.Property<int>("TagId");

                    b.HasKey("ContactId", "TagId");

                    b.HasIndex("TagId");

                    b.ToTable("ContactsTags");
                });

            modelBuilder.Entity("AddressBook.API.Models.Email", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ContactId");

                    b.Property<string>("EmailAddress");

                    b.HasKey("Id");

                    b.HasIndex("ContactId");

                    b.ToTable("Emails");
                });

            modelBuilder.Entity("AddressBook.API.Models.Number", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ContactId");

                    b.Property<string>("PhoneNumber");

                    b.HasKey("Id");

                    b.HasIndex("ContactId");

                    b.ToTable("Numbers");
                });

            modelBuilder.Entity("AddressBook.API.Models.Tag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("TagName");

                    b.HasKey("Id");

                    b.ToTable("Tags");
                });

            modelBuilder.Entity("AddressBook.API.Models.ContactTag", b =>
                {
                    b.HasOne("AddressBook.API.Models.Contact", "Contact")
                        .WithMany("ContactsTags")
                        .HasForeignKey("ContactId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AddressBook.API.Models.Tag", "Tag")
                        .WithMany("ContactsTags")
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AddressBook.API.Models.Email", b =>
                {
                    b.HasOne("AddressBook.API.Models.Contact", "Contact")
                        .WithMany("Emails")
                        .HasForeignKey("ContactId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AddressBook.API.Models.Number", b =>
                {
                    b.HasOne("AddressBook.API.Models.Contact", "Contact")
                        .WithMany("Numbers")
                        .HasForeignKey("ContactId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
