using Microsoft.EntityFrameworkCore;

namespace Backend.Models
{
    public class RecordContext: DbContext
    {
        public DbSet<Shop> Shops {get; set;}
        public DbSet<Genre> Genres {get; set;}
        public DbSet<Vinyl> Vinyls {get; set;}

        public RecordContext(DbContextOptions options):base(options)
        {}

    }
}