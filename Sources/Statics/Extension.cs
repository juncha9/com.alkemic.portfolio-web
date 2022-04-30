
// Add services to the container.


// Configure the HTTP request pipeline.


using Newtonsoft.Json.Linq;
using System.Collections;
using System.Diagnostics;
using System.Net;

namespace Alkemic.PortfolioWeb
{


    public static class Extension
    {
        public static void Log(this Stopwatch sw)
        {
            if (sw == null) return;
            Console.WriteLine($"[Timer:{sw.GetHashCode()}] Time: {sw.ElapsedMilliseconds / 1000.0d}");
        }
        public static void StopAndLog(this Stopwatch sw)
        {
            if (sw == null) return;
            sw.Stop();
            Console.WriteLine($"[Timer:{sw.GetHashCode()}] Stoped, Time: {sw.ElapsedMilliseconds / 1000.0d}");
        }

        public static string ToText<T>(this IEnumerable<T> items, Func<T,string> selector) 
        {
            int count = items.Count();
            string text = "";
            if(count > 0)
            {
                int i = 0;
                foreach (T item in items)
                {
                    if(i < count - 1 )
                    {
                        text += $"{selector(item)}, ";
                    }
                    else
                    {
                        text += $"{selector(item)}";
                    }
                    i++;
                }
            }
            return text;
        }

        public static string ToTag(this string text)
        {
            return text.Replace("\n", "<br>");
        }

        public static T GetRandomOne<T>(this IList<T> list)
        {
            Random random = new Random();
            int index = random.Next(0, list.Count);
            return list[index];
        }



    }
}
