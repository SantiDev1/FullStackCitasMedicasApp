using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PacienteAPIS.Models;

namespace PacienteAPIS.Data
{
    //  el IdentityDbContext crea las tablas de auth automaticamente se haga la migracion con el tool
    public class AplicationDbContext : IdentityDbContext
    {
        public AplicationDbContext(DbContextOptions options) : base(options)
        {
        }
       
        public DbSet<CitasModel> Citas { get; set; }
    }
}
