using Newtonsoft.Json;

namespace Alkemic.PortfolioWeb
{


    [Serializable]
    public class ConfigData
    {
        [JsonProperty("useAdminMode")]
        public bool UseAdminMode { get; set; } = false;

        [JsonProperty("saltKey")]
        public string SaltKey { get; set; } = "";

        [JsonProperty("fullpageKey")]
        public string FullpageKey { get; set; } = "";

        [JsonProperty("db_address")]
        public string DB_Address { get; set; } = "";

        [JsonProperty("db_port")]
        public int DB_Port { get; set; } = 0;

        [JsonProperty("db_name")]
        public string DB_Name { get; set; } = "";

        [JsonProperty("db_id")]
        public string DB_ID { get; set; } = "";

        [JsonProperty("db_passwd")]
        public string DB_Passwd { get; set; } = "";

        

        public string GetDBConnectOption()
        {
            string option = "";
            option += $"Host={DB_Address}; ";
            option += $"Port={DB_Port}; ";
            option += $"Database={DB_Name}; ";
            option += $"Username={DB_ID}; ";
            option += $"Password={DB_Passwd}; ";
            return option;
        }


    }
}
