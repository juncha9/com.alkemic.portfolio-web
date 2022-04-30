
// Add services to the container.


// Configure the HTTP request pipeline.
using Microsoft.JSInterop;
namespace Alkemic.PortfolioWeb
{
    public static class Extension_IJSRuntime
    {
        public const int TIMEOUT = 2000;

        public static async Task TryInvokeAction(this IJSRuntime js, string identifier, params object?[]? args)
        {
            Task task = null;
            CancellationTokenSource taskTokenSource = new CancellationTokenSource();
            CancellationTokenSource timerTokenSource = new CancellationTokenSource();
            try
            { 
                task = js.InvokeVoidAsync(identifier, taskTokenSource.Token, args).AsTask();
                var completedTask = await Task.WhenAny(task, Task.Delay(TIMEOUT, timerTokenSource.Token));
                if (ReferenceEquals(completedTask, task))
                {
                    timerTokenSource.Cancel();
                    await task;
#if DEBUG
                    Console.WriteLine($"[js:{identifier}] Success to invoke script");
#endif
                }
                else
                {
                    throw new TimeoutException("Script has timed out.");
                }
            }
            catch (Exception ex)
            {
#if DEBUG
                Console.WriteLine($"[js:{identifier}] Failed to invoke script\nEx: {ex}");
#endif
            }
            finally
            {
                taskTokenSource.Cancel();
                taskTokenSource.Dispose();
                timerTokenSource.Dispose();
            }
        }

        public static async Task<TResult> TryInvokeFunc<TResult>(this IJSRuntime js, string identifier, params object?[]? args)
        {
            Task<TResult> task = null;
            CancellationTokenSource taskTokenSource = new CancellationTokenSource();
            CancellationTokenSource timerTokenSource = new CancellationTokenSource();
            try
            {
                task = js.InvokeAsync<TResult>(identifier, taskTokenSource.Token, args).AsTask();
                var completedTask = await Task.WhenAny(task, Task.Delay(TIMEOUT, timerTokenSource.Token));
                if (ReferenceEquals(completedTask, task))
                {
                    timerTokenSource.Cancel();
                    var result = await task;
#if DEBUG
                    Console.WriteLine($"[js:{identifier}] Success to invoke script");
#endif
                    return result;
                }
                else
                {
                    
                    throw new TimeoutException("Script has timed out.");
                }
            }
            catch (Exception ex)
            {
#if DEBUG
                Console.WriteLine($"[js:{identifier}] Failed to invoke script\nEx: {ex}");
#endif
                return default(TResult);
            }
            finally
            {
                taskTokenSource.Cancel();
                taskTokenSource.Dispose();
                timerTokenSource.Dispose();
            }
        }

        public static async Task<TResult> TryInvokeFuncWithDefualt<TResult>(this IJSRuntime js, string identifier, TResult defaultValue, params object?[]? args)
        {
            Task<TResult> task = null;
            CancellationTokenSource taskTokenSource = new CancellationTokenSource();
            CancellationTokenSource timerTokenSource = new CancellationTokenSource();
            try
            {
                task = js.InvokeAsync<TResult>(identifier, taskTokenSource.Token, args).AsTask();
                var completedTask = await Task.WhenAny(task, Task.Delay(TIMEOUT, timerTokenSource.Token));
                if (ReferenceEquals(completedTask, task))
                {
                    timerTokenSource.Cancel();
                    var result = await task;
#if DEBUG
                    Console.WriteLine($"[js:{identifier}] Success to invoke script");
#endif
                    return result;
                }
                else
                {

                    throw new TimeoutException("Script has timed out.");
                }
            }
            catch (Exception ex)
            {
#if DEBUG
                Console.WriteLine($"[js:{identifier}] Failed to invoke script\nEx: {ex}");
#endif
                return defaultValue;
            }
            finally
            {
                taskTokenSource.Cancel();
                taskTokenSource.Dispose();
                timerTokenSource.Dispose();
            }
        }

        public static void Log(this IJSRuntime js, string message)
        {
            js.TryInvokeAction("console.log", message);
        }

        public static void LogWarning(this IJSRuntime js, string message)
        {
            js.TryInvokeAction("console.warn", message);
        }

        public static void LogError(this IJSRuntime js, string message)
        {
            js.TryInvokeAction("console.error", message);
        }
    }
}
