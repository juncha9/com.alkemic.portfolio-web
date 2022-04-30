using Newtonsoft.Json;

namespace Alkemic.PortfolioWeb;

[Serializable]
public class AuthAttempt
{
    public string Address { get; set; } = "";

    public int Count { get; set; } = 0;

    public bool IsRestricted { get; set; } = false;

    public DateTime ExpireTime { get; set; } = DateTime.Now + ServerDefine.PENDING_EXPIRE_TIME;


    /// <summary>
    /// 
    /// </summary>
    /// <returns>접속이 제한되면 true를 반환</returns>
    public bool IncreaseCount()
    {
        if (IsRestricted == true) return false;
        Count = Count + 1;
        if (Count > ServerDefine.COUNT_RESTRICT)
        {
            this.IsRestricted = true;
            this.ExpireTime = DateTime.Now + ServerDefine.RESTRICT_EXPIRE_TIME;
            return true;
        }
        else
        {
            this.ExpireTime = DateTime.Now + ServerDefine.PENDING_EXPIRE_TIME;
            return false;
        }
    }

}