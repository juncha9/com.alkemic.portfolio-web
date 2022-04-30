using System.ComponentModel.DataAnnotations.Schema;

namespace Alkemic.PortfolioWeb.Models;

[Table("project", Schema = "portfolio")]
public class ProjectEntity
{

    [Column("id")]
    public string ID { get; set; }

    [Column("name")]
    public string? Name { get; set; }

    [Column("name_full")]
    public string? FullName { get; set; }

    [Column("career_id")]
    public string? CareerID { get; set; }

    public CareerEntity Career { get; set; }

    [Column("start_date")]
    public DateTime? StartDate { get; set; }

    [Column("end_date")]
    public DateTime? EndDate { get; set; }

    [Column("video_url")]
    public string? VideoURL { get; set; }

    [Column("coop")]
    public string? Cooperation { get; set; }

    [Column("work")]
    public string? Work { get; set; }

    [Column("summary")]
    public string? Summary { get; set; }

    [Column("detail")]
    public string? Detail { get; set; }

    [Column("entry_seq")]
    public int? EntrySequence { get; set; }

    public ICollection<ProjectStackEntity> ProjectStacks { get; set; }

}


