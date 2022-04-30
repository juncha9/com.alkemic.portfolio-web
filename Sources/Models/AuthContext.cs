using Microsoft.EntityFrameworkCore;

namespace Alkemic.PortfolioWeb.Models;
public class AuthContext : DbContext
{
    public DbSet<UserEntity> Users { get; set; }

    public DbSet<PasscodeEntity> Passcodes { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<UserEntity>(entity =>
        {
            entity.HasKey(e => e.ID);
        });

        modelBuilder.Entity<PasscodeEntity>(entity =>
        {
            entity.HasKey(e => e.Code);
        });
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
        try
        {
            if (Server.Config == null) throw new Exception("Config has been not loaded");
            string optionText = Server.Config.GetDBConnectOption();
            optionsBuilder.UseNpgsql(optionText);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Failed to connect DB\nEx: {ex}");
        }
    }
}
