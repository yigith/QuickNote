using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickNote.Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<NoteBook> NoteBooks { get; set; }

        public DbSet<Note> Notes { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<NoteBook>().HasData(
                new NoteBook()
                {
                    Id = 1,
                    Name = "code"
                });

            modelBuilder.Entity<Note>().HasData(
                new Note()
                {
                    Id = 1,
                    Title = "C#",
                    Content = "Console.WriteLine(\"Hello World!\");",
                    NoteBookId = 1
                },
                new Note()
                {
                    Id = 2,
                    Title = "JavaScript",
                    Content = "console.log('Hello World!');",
                    NoteBookId = 1
                });
        }
    }
}
