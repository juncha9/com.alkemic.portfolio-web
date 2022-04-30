using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using Microsoft.AspNetCore.Components;
namespace Alkemic.PortfolioWeb;


public class Server
{
    public const string KEY_AUTH = "ALKEMICAUTH";
    private static ConfigData config = null;
    public static ConfigData Config
    {
        set => config = value;
        get => config;
    }

    public static bool LoadConfig()
    {
        var _config = JsonHelper.LoadJson<ConfigData>(ServerDefine.PATH_CONFIG);
        if(_config != null)
        {
            Config = _config;
            Console.WriteLine($"[{nameof(Server)}] Success to load config");
#if DEBUG
            Console.WriteLine("Config Data:");
            Console.WriteLine($"Address: {Config.DB_Address}");
            Console.WriteLine($"Port: {Config.DB_Port}");
            Console.WriteLine($"DB: {Config.DB_Name}");
            Console.WriteLine($"ID: {Config.DB_ID}");
#endif
            return true;
        }
        else
        {
            Console.WriteLine($"[{nameof(Server)}] Failed to load config");
            return false;
        }
    }




}
