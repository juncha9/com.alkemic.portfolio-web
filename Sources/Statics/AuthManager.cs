namespace Alkemic.PortfolioWeb;

public class AuthManager: IDisposable
{
    private ILogger<AuthManager> logger { get; set; }

    private List<AuthAttempt> AuthAttempts { get; } = new List<AuthAttempt>();

    private event Action<List<AuthAttempt>> onExpiredAttemptsRemoved = null;

    private Thread scheduleThread = null;

    public AuthManager(ILogger<AuthManager> logger)
    {
        this.logger = logger;

        scheduleThread = new Thread(Schedule);
        scheduleThread.Start();
        logger.LogInformation($"[{nameof(AuthManager)}] Schedule has been started");
    }

    public void Dispose()
    {
        if (scheduleThread != null)
        {
            scheduleThread.Join();
            logger.LogInformation($"[{nameof(AuthManager)}] Schedule will be join");
        }
    }

    public void Schedule()
    {
        while (true)
        {
            CleanExpired();
            Thread.Sleep(TimeSpan.FromSeconds(5));
        }
    }

    public void CleanExpired()
    {
        var removes = AuthAttempts.Where(x =>DateTime.Compare(DateTime.Now, x.ExpireTime) > 0).ToList();
        if(removes.Count > 0)
        {
            List<AuthAttempt> _attempts = new List<AuthAttempt>();
            _attempts.AddRange(removes);
            foreach(var att in removes)
            {
                AuthAttempts.Remove(att);
#if DEBUG
                logger.LogInformation($"[{nameof(AuthManager)}] Expired {nameof(AuthAttempt)} removed, Address: {att.Address}");
#endif
            }
            onExpiredAttemptsRemoved?.Invoke(_attempts);
        }
    }

    public AuthAttempt FindAttempt(string address, bool useCreate = false)
    {
        if (string.IsNullOrWhiteSpace(address) == true) return null;
        AuthAttempt? _inst = null;

        _inst = AuthAttempts.Find(x => x.Address == address) ?? null;
        if (useCreate == true && _inst == null)
        {
            _inst = new AuthAttempt
            {
                Address = address,
                IsRestricted = false,
                ExpireTime = DateTime.Now + ServerDefine.PENDING_EXPIRE_TIME
            };
            AuthAttempts.Add(_inst);
#if DEBUG
            logger.LogInformation($"[{nameof(AuthManager)}] {nameof(AuthAttempt)} has been created, Address: {_inst.Address}, ExpiredAt: {_inst.ExpireTime.ToString("F")}");
#endif
        }
        return _inst;
    }

    public bool RemoveAttempt(AuthAttempt attempt)
    {
        if (attempt == null) return false;
        var count = this.AuthAttempts.RemoveAll(x => Equals(x.Address, attempt.Address) == true);
        if (count > 0) return true;
        else return false;
    }

}
