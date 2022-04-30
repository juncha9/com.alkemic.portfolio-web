using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BCrypt.Net;
using System.Net;
using Microsoft.Extensions.Primitives;
using Microsoft.AspNetCore.Components;
using Alkemic.PortfolioWeb.Models;

namespace Alkemic.PortfolioWeb;

public class AuthHandler
{
    private const string KEY_REMOTE_IP = "remote_ip";
    
    public string RemoteIP { get; set; } = "";

    private IDbContextFactory<AuthContext> authContextFactory { get; set; }

    private ILogger<AuthHandler> logger { get; set; }

    private ProtectedSessionStorage sessionStorage { get; set; }

    protected AuthManager authManager { get; private set; }

    public AuthAttempt AuthAttempt
    {
        get
        {
            if (authManager == null) return null;
            if (string.IsNullOrWhiteSpace(RemoteIP) == true) return null;
            return authManager.FindAttempt(RemoteIP);
        }
    }

    public AuthState AuthState
    {
        get
        {
            if (AuthInfo != null) return AuthState.Allowed;
            else if (AuthAttempt != null && AuthAttempt.IsRestricted == true) return AuthState.Restricted;
            else return AuthState.None;
        }
    }

    private SessionState sessionState = SessionState.NotLoaded;
    public SessionState SessionState
    {
        set
        {
            this.sessionState = value;
            if(value == SessionState.Loaded)
            {
#if DEBUG
                logger.LogInformation($"[{nameof(AuthHandler)}:{RemoteIP}] On Session loaded");
#endif
                onSessionLoaded?.Invoke();
            }
        }
        get => sessionState;
    }

    private AuthInfo authInfo = null;
    public AuthInfo AuthInfo
    {
        set
        {
            authInfo = value;
            if (authInfo != null)
            {
#if DEBUG
                logger.LogInformation($"[{nameof(AuthHandler)}:{RemoteIP}] On Login");
#endif
                onLogin?.Invoke();
            }
            else
            {
#if DEBUG
                logger.LogInformation($"[{nameof(AuthHandler)}:{RemoteIP}] On Logout");
#endif
                onLogout?.Invoke();
            }
        }
        get => authInfo;
    }

    public event Action onSessionLoaded = null;
    public event Action onLogin = null;
    public event Action onLogout = null;
    public event Action onRestricted = null;
    public event Action onFailed = null;

    public AuthHandler(ILogger<AuthHandler> logger,
        ProtectedSessionStorage sessionStorage,
        AuthManager authManager,
        IDbContextFactory<AuthContext> authContextFactory)
    {
        this.logger = logger;
        this.sessionStorage = sessionStorage;
        this.authManager = authManager;
        this.authContextFactory = authContextFactory;
    }

    public async Task LoadSessionData()
    {
        SessionState = SessionState.Loading;
        try
        {
            if (Server.Config.UseAdminMode == true && AuthInfo == null)
            {
                this.AuthInfo = new AuthInfo(RemoteIP, Privilege.Admin, "Admin");
                SessionState = SessionState.Loaded;
                logger.LogInformation($"[{nameof(AuthHandler)}:{RemoteIP}] Auto login, Because it is admin mode, Address: {AuthInfo.Address}\nUid: {AuthInfo.Uid}");
                return;
            }

            var sessionResult = await sessionStorage.GetAsync<AuthInfo>(Server.KEY_AUTH);
            if (sessionResult.Success == true)
            {
                var _info = sessionResult.Value;
                if (_info == null) throw new Exception("Session's AuthInfo is not valid");
                this.AuthInfo = _info;
#if DEBUG
                logger.LogDebug($"[{nameof(AuthHandler)}:{RemoteIP}] AuthInfo loaded, UID: {_info.Uid}");
#endif 
            }
            else
            {
#if DEBUG
                logger.LogDebug($"[{nameof(AuthHandler)}:{RemoteIP}] AuthInfo is not exist");
#endif
            }
#if DEBUG
            logger.LogDebug($"[{nameof(AuthHandler)}:{RemoteIP}] Session has been loaded");
#endif
            SessionState = SessionState.Loaded;
        }
        catch (Exception ex)
        {
            logger.LogError($"[{nameof(AuthHandler)}:{RemoteIP}] Failed to load session, Ex: {ex}");
            SessionState = SessionState.NotLoaded;
        } 
    }

    public async Task Logout()
    {
        this.AuthInfo = null;
        await sessionStorage.DeleteAsync(Server.KEY_AUTH);
#if DEBUG
        logger.LogInformation($"[{nameof(AuthHandler)}:{RemoteIP}] Session has been deleted");
#endif
    }

    public async Task Login(string id, string passwd)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(RemoteIP) == true) throw new Exception("RemoteIP is empty");

            var _context = await this.authContextFactory.CreateDbContextAsync();
            if (_context == null) throw new Exception($"Cannot create DB {nameof(AuthContext)}");

            var _attempt = authManager.FindAttempt(RemoteIP, useCreate: true);
            if (_attempt == null) throw new Exception($"Cannot get {nameof(PortfolioWeb.AuthAttempt)}");

            var hashValue =  BCrypt.Net.BCrypt.HashPassword(passwd, "salt");
            //PasswordHasher hasher = new PasswordHasher();

            string salt = Server.Config.SaltKey;
            if (string.IsNullOrWhiteSpace(salt) == true) throw new Exception("Salt is not set");

            var query = _context.Users.Where( 
                x => Equals(x.ID, id) &&
                Equals(BCrypt.Net.BCrypt.HashPassword(x.Password), BCrypt.Net.BCrypt.HashPassword(passwd))
                );
#if DEBUG
            logger.LogDebug($"[{nameof(AuthHandler)}] *** SQL ***\n{query.ToQueryString()}\n");
#endif
            var user = await query.FirstOrDefaultAsync();

            if(user != null)
            {
                //성공
                var _info = new AuthInfo(RemoteIP, user.Privilege, user.ID);
                if (string.IsNullOrWhiteSpace(Server.KEY_AUTH) == true) throw new Exception("Session key is empty");
                await sessionStorage.SetAsync(Server.KEY_AUTH, _info);
#if DEBUG
                logger.LogDebug($"[{nameof(AuthHandler)}:{RemoteIP}] Auth session set, UID: {_info.Uid}");
#endif
                this.AuthInfo = _info;
                authManager.RemoveAttempt(_attempt);
                logger.LogInformation($"[{nameof(AuthHandler)}:{RemoteIP}] Success to login as [{_info.Privilege.ToString()}]\nAddress: {_info.Address}\nUid: {_info.Uid}");
            }
            else
            {
                var result = _attempt.IncreaseCount();
                if (result == true)
                {
                    onRestricted?.Invoke();
                    logger.LogInformation($"[{nameof(AuthHandler)}:{RemoteIP}] Connection[{_attempt.Address}] has been restricted, ExpireAt: {_attempt.ExpireTime.ToString("F")}");
                }
                else
                {
                    onFailed?.Invoke();
                    logger.LogInformation($"[{nameof(AuthHandler)}:{RemoteIP}] Connection[{_attempt.Address}] failed to authorize, Count: {_attempt.Count}, ExpireAt: {_attempt.ExpireTime.ToString("F")}");
                }
            }
        }
        catch(Exception ex)
        {
            logger.LogError($"[{nameof(AuthHandler)}:{RemoteIP}] Exception occured on {nameof(Login)}\nEx:{ex}");
        }

    }

    public async Task Login(string value)
    {
        try
        {
            string ipAddress = RemoteIP;
            if(string.IsNullOrWhiteSpace(ipAddress) == true)
            {
                logger.LogError($"[{nameof(AuthHandler)}:{RemoteIP}] Connection[{ipAddress}] has not valid RemoteIP, Change to 255.255.255.255");
                ipAddress = "255.255.255.255";
            }

            AuthAttempt _attempt = authManager.FindAttempt(ipAddress, useCreate: true);

            var _context = await this.authContextFactory.CreateDbContextAsync();
            if (_context == null) throw new Exception($"Cannot create DB {nameof(AuthContext)}");

            var passcodes = await _context.Passcodes.ToListAsync();
            if (passcodes == null) throw new Exception("Failed to select Passcodes on DB");

            if (passcodes.Any(x => x.Code == value) == true)
            {
                var _info = new AuthInfo(ipAddress, Privilege.User);
                if (string.IsNullOrWhiteSpace(Server.KEY_AUTH) == true) throw new Exception("Session key is empty");
                await sessionStorage.SetAsync(Server.KEY_AUTH, _info);
#if DEBUG
                logger.LogDebug($"[{nameof(AuthHandler)}:{RemoteIP}] Auth session set, UID: {_info.Uid}");
#endif
                this.AuthInfo = _info;
                if(_attempt != null)
                {
                    authManager.RemoveAttempt(_attempt);
                }
                logger.LogInformation($"[{nameof(AuthHandler)}:{RemoteIP}] Success to login as [{_info.Privilege.ToString()}]\nAddress: {_info.Address}\nUid: {_info.Uid}");
            }
            else
            {
                if(_attempt != null)
                {
                    var result = _attempt.IncreaseCount();
                    if (result == true)
                    {
                        onRestricted?.Invoke();
                        logger.LogInformation($"[{nameof(AuthHandler)}:{RemoteIP}] Connection[{_attempt.Address}] has been restricted, ExpireAt: {_attempt.ExpireTime.ToString("F")}");
                    }
                    else
                    {
                        onFailed?.Invoke();
                        logger.LogInformation($"[{nameof(AuthHandler)}:{RemoteIP}] Connection[{_attempt.Address}] failed to authorize, Count: {_attempt.Count}, ExpireAt: {_attempt.ExpireTime.ToString("F")}");
                    }
                }
            }
        }
        catch (Exception ex)
        {
            logger.LogError($"[{nameof(AuthHandler)}:{RemoteIP}] Exception occured on {nameof(Login)}\nEx:{ex}");
        }
    }



}
