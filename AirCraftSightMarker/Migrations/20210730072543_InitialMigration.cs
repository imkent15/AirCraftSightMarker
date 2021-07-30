using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AirCraftSightMarker.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    SerialID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VisibleID = table.Column<Guid>(nullable: false),
                    ModifiedBy = table.Column<int>(nullable: true),
                    ModifiedDateTime = table.Column<DateTime>(nullable: false),
                    MarkedForDelete = table.Column<bool>(nullable: false),
                    Username = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.SerialID);
                    table.ForeignKey(
                        name: "FK_User_User_ModifiedBy",
                        column: x => x.ModifiedBy,
                        principalTable: "User",
                        principalColumn: "SerialID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AirCraftSights",
                columns: table => new
                {
                    SerialID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VisibleID = table.Column<Guid>(nullable: false),
                    ModifiedBy = table.Column<int>(nullable: true),
                    ModifiedDateTime = table.Column<DateTime>(nullable: false),
                    MarkedForDelete = table.Column<bool>(nullable: false),
                    Make = table.Column<string>(maxLength: 128, nullable: false),
                    Model = table.Column<string>(maxLength: 128, nullable: false),
                    Registration = table.Column<string>(nullable: false),
                    Location = table.Column<string>(maxLength: 255, nullable: false),
                    DateandTime = table.Column<DateTime>(nullable: false),
                    PhotoFileName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AirCraftSights", x => x.SerialID);
                    table.ForeignKey(
                        name: "FK_AirCraftSights_User_ModifiedBy",
                        column: x => x.ModifiedBy,
                        principalTable: "User",
                        principalColumn: "SerialID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AirCraftSights_ModifiedBy",
                table: "AirCraftSights",
                column: "ModifiedBy");

            migrationBuilder.CreateIndex(
                name: "IX_User_ModifiedBy",
                table: "User",
                column: "ModifiedBy");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AirCraftSights");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
