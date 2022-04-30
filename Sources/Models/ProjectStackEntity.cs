using System.ComponentModel.DataAnnotations.Schema;

namespace Alkemic.PortfolioWeb.Models;

[Table("project_stack", Schema = "portfolio")]
public class ProjectStackEntity
{

    [Column("project_id")]
    public string ProjectID { get; set; }

    [Column("stack_id")]
    public string AbilityStackID { get; set; }

    public ProjectEntity Project { get; set; }

    public AbilityStackEntity AbilityStack { get; set; }

}


