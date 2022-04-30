using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alkemic.PortfolioWeb
{

    public static class ServerDefine
    {
        public static int COUNT_RESTRICT = 10;

        public static readonly TimeSpan DEFAULT_EXPIRE_TIME = TimeSpan.FromHours(1);
        public static readonly TimeSpan PENDING_EXPIRE_TIME = TimeSpan.FromMinutes(5);
        public static readonly TimeSpan RESTRICT_EXPIRE_TIME = TimeSpan.FromMinutes(10);
        public static readonly TimeSpan SUCCESS_EXPIRE_TIME = TimeSpan.FromMinutes(10);

        public const string KEY_UID = "uid";
        public const string KEY_PASSCODE = "passcode";

        public static string PATH_CONFIG = "./def/config.json";



    }
}
