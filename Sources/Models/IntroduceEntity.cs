using System.ComponentModel.DataAnnotations.Schema;

namespace Alkemic.PortfolioWeb.Models;

[Table("introduce", Schema = "portfolio")]
public class IntroduceEntity
{
    [Column("id")]
    public int ID { get; set; }

    [Column("desc")]
    public string? Description { get; set; }
}


