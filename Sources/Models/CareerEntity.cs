using System.ComponentModel.DataAnnotations.Schema;

namespace Alkemic.PortfolioWeb.Models;

[Table("career", Schema = "portfolio")]
public class CareerEntity
{
    [Column("id")]
    public string ID { get; set; }

    [Column("name")]
    public string? Name { get; set; }

    [Column("department")]
    public string? Department { get; set; }

    [Column("rank")]
    public string? Rank { get; set; } = null;

    [Column("start_date")]
    public DateTime? StartDate { get; set; }

    [Column("end_date")]
    public DateTime? EndDate { get; set; }

    public ICollection<ProjectEntity> Projects { get; set; }


}


