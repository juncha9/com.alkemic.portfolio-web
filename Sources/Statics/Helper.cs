

using System.Diagnostics;

namespace Alkemic.PortfolioWeb
{
    public static class Helper
    {
        public static Stopwatch StartTimer()
        {
            var sw = new Stopwatch();
            sw.Reset();
            sw.Start();
            Console.WriteLine($"[Timer:{sw.GetHashCode()}] Started");
            return sw;
        }



    }
}
