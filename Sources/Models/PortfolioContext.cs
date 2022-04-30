using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Alkemic.PortfolioWeb.Models;
public class PortfolioContext : DbContext
{

    public DbSet<ProjectEntity> ProjectEntities { get; set; }
    public DbSet<CareerEntity> CareerEntities { get; set; }
    public DbSet<IntroduceEntity> IntroduceEntities { get; set; }
    public DbSet<ProjectStackEntity> ProjectStackEntites { get; set; }
    public DbSet<AbilityStackEntity> AbilityStackEntites { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<ProjectEntity>(
            entity => 
            { 
                entity.HasKey(project => project.ID);
                entity
                .HasOne(project => project.Career)
                .WithMany(career => career.Projects)
                .HasForeignKey(project => project.CareerID)
                .IsRequired();
            });
        modelBuilder.Entity<IntroduceEntity>(
            entity =>
            {
                entity.HasKey(introduce => introduce.ID);
            });
        modelBuilder.Entity<CareerEntity>(
            entity =>
            {
                entity.HasKey(career => career.ID);
                entity
                .HasMany(career => career.Projects)
                .WithOne(project => project.Career);
            });

        modelBuilder.Entity<ProjectStackEntity>(
            entity =>
            {
                entity.HasKey(projectStack => new { projectStack.AbilityStackID, projectStack.ProjectID });
                entity.HasOne(projectStack => projectStack.AbilityStack)
                      .WithMany(abilityStack => abilityStack.ProjectStacks)
                      .HasForeignKey(projectStack => projectStack.AbilityStackID)
                      .IsRequired();
                entity.HasOne(projectStack => projectStack.Project)
                      .WithMany(project => project.ProjectStacks)
                      .HasForeignKey(projectStack => projectStack.ProjectID)
                      .IsRequired();
            });
        modelBuilder.Entity<AbilityStackEntity>(
            entity =>
            {
                entity.HasKey(abilityStack => abilityStack.ID);
                entity.HasMany(abilityStack => abilityStack.ProjectStacks)
                      .WithOne(projectStack => projectStack.AbilityStack);
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
