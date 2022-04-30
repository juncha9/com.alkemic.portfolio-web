using System.ComponentModel.DataAnnotations.Schema;

namespace Alkemic.PortfolioWeb.Models;

[Table("ability_stack", Schema = "portfolio")]
public class AbilityStackEntity
{
    [Column("seq")]
    public int? Sequence { get; set; }

    [Column("id")]
    public string ID { get; set; }

    [Column("name")]
    public string? Name { get; set; }

    [Column("desc")]
    public string? Description { get; set; }

    [Column("favorite_flag")]
    public bool? IsFavorite { get; set; }

    public ICollection<ProjectStackEntity> ProjectStacks { get; set; }

}


