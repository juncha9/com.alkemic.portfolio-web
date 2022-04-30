using System.ComponentModel.DataAnnotations.Schema;

namespace Alkemic.PortfolioWeb.Models;

[Table("passcode", Schema = "portfolio")]
public class PasscodeEntity
{
    [Column("code")]
    public string Code { get; set; }
}


