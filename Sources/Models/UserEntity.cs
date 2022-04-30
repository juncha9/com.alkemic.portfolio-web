using System.ComponentModel.DataAnnotations.Schema;

namespace Alkemic.PortfolioWeb.Models;

[Table("user", Schema = "portfolio")]
public class UserEntity
{
    [Column("id")]
    public string ID { get; set; }

    [Column("password")]
    public string Password { get; set; }

    [Column("privilege")]
    public Privilege Privilege { get; set; }

}


