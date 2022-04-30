using Newtonsoft.Json;

namespace Alkemic;

public class JsonHelper
{
    public static T LoadJson<T>(string path) where T : class
    {
        try
        {
            //string path = PATH_CONFIG;
            if (File.Exists(path) == false)
            {
                throw new Exception($"File is not exist, Path: {path}");
            }

            StreamReader reader = new StreamReader(path);
            JsonSerializer serializer = new JsonSerializer();
            var _newInstance = serializer.Deserialize(reader, typeof(T)) as T;
            if (_newInstance == null)
            {
                throw new Exception("Cannot deserialize");
            }
            Console.WriteLine($"Success to load json[{typeof(T).Name}], Path: {path}");
            return _newInstance;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Failed to load json[{typeof(T).Name}], Ex: {ex.ToString()}");
            return null;
        }
    }
}
