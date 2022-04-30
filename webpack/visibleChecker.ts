declare global {
    interface Window {
        KEY_HIDEEN: string; 
        KEY_VISIBLE_CHANGE_FUNC: string
        isVisibleHidden: boolean;
    }
    interface Document {
        msHidden: unknown;
        webkitHidden: unknown;
    }   
}

export default class VisibleChecker 
{
    
    constructor() {

        window.KEY_HIDEEN = "";
        window.KEY_VISIBLE_CHANGE_FUNC = "";
        if (typeof document.hidden !== "undefined") {
            // Opera 12.10 and Firefox 18 and later support
            window.KEY_HIDEEN = "hidden";
            window.KEY_VISIBLE_CHANGE_FUNC = "visibilitychange";
        } else if (typeof document.msHidden !== "undefined") {
            window.KEY_HIDEEN = "msHidden";
            window.KEY_VISIBLE_CHANGE_FUNC = "msvisibilitychange";
        } else if (typeof document.webkitHidden !== "undefined") {
            window.KEY_HIDEEN = "webkitHidden";
            window.KEY_VISIBLE_CHANGE_FUNC = "webkitvisibilitychange";
        }
        window.isVisibleHidden = false;
        document.addEventListener(window.KEY_VISIBLE_CHANGE_FUNC, this.onVisiblityChanged, false);
        console.log('[VisibleChecker] Event registered');
    }
    onVisiblityChanged() {
        if (window.KEY_HIDEEN && document[window.KEY_HIDEEN]) {
            window.isVisibleHidden = true;
            console.log(`[VisibleChecker] Browser has been hidden`);
        }
        else {
            window.isVisibleHidden = false;
            console.log(`[VisibleChecker] Browser has been shown`);
        }
    }

}

