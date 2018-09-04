using Microsoft.EntityFrameworkCore.Migrations;

namespace AddressBook.Api.Migrations
{
    public partial class ContactTagRelationChangedToManytoMany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tags_Contacts_ContactId",
                table: "Tags");

            migrationBuilder.DropIndex(
                name: "IX_Tags_ContactId",
                table: "Tags");

            migrationBuilder.DropColumn(
                name: "ContactId",
                table: "Tags");

            migrationBuilder.CreateTable(
                name: "ContactsTags",
                columns: table => new
                {
                    ContactId = table.Column<int>(nullable: false),
                    TagId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactsTags", x => new { x.ContactId, x.TagId });
                    table.ForeignKey(
                        name: "FK_ContactsTags_Contacts_ContactId",
                        column: x => x.ContactId,
                        principalTable: "Contacts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ContactsTags_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ContactsTags_TagId",
                table: "ContactsTags",
                column: "TagId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContactsTags");

            migrationBuilder.AddColumn<int>(
                name: "ContactId",
                table: "Tags",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Tags_ContactId",
                table: "Tags",
                column: "ContactId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tags_Contacts_ContactId",
                table: "Tags",
                column: "ContactId",
                principalTable: "Contacts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
