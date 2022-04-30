namespace Alkemic.PortfolioWeb;

public enum MarkType
{
    None,
    Mark,
    Number,
}

public enum IndexPageState
{
    NotAllowed,
    Allowed
}

public enum Privilege : int
{
    None = 0,
    User = 1,
    Admin = 11
}

public enum AuthState
{
    None = 0,
    Allowed = 1,
    Restricted = 9,
}

public enum Theme
{
    Dark = 0,
    Light = 1,
}

public enum SessionState
{
    NotLoaded = 0,
    Loading = 1,
    Loaded = 2,
}


