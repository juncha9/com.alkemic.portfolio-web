declare function createUnityInstance(el: Element, cfg: object, progress: (progress: number) => void): any

export default class DonutSpaceHandler {
    //const
    canvasID: string = "unity-canvas";
    config = {
        dataUrl: "donut-space/Build.data.gz",
        frameworkUrl: "donut-space/Build.framework.js.gz",
        codeUrl: "donut-space/Build.wasm.gz",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "AlkemicStudio",
        productName: "com.alkemic.portfolio-space",
        productVersion: "1.1.2",
        matchWebGLToCanvasSize: true, // Uncomment this to separately control WebGL canvas render size and DOM element size.
        // devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
    }

    isInited: boolean = false;
    dotnetBridge: any = null;
    unityStarted: boolean = false;
    unityLoaded: boolean = false;
    canvas: Element = null;
    instance: any = null;
    percent: number;
    
	constructor() {
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            // Mobile device style: fill the whole browser client area with the game canvas:
            var meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
            document.getElementsByTagName('head')[0].appendChild(meta);
        }
    }

    init(bridge: any) {
        if (this.isInited === true) {
            this.dispose();
        }
        this.dotnetBridge = bridge;
        this.canvas = document.getElementById(this.canvasID);
        createUnityInstance(this.canvas, this.config,
            (progress) => {
                this.noticeLoadPercentToServer(progress);
            })
            .then((unityInstance) =>
            {
                this.instance = unityInstance;
                this.unityStarted = true;
            });
        this.isInited = true;
        console.log(`[DonutSpaceHandler] Handler has been inited`);
    }

    async dispose() {
        this.isInited = false;
        this.canvas = null;
        this.unityLoaded = false;
        this.unityStarted = false;
        if (this.dotnetBridge) {
            this.dotnetBridge = null;
        }

        if (this.instance) {
            await this.instance.Quit().then(() => {
                this.instance = null;
                console.log(`[DonutSpaceHandler] Unity instance has been quited`);
            });
        }
        console.log(`[DonutSpaceHandler] Handler has been reset`);
    }

    isUnityLoaded(): boolean {
        return this.unityLoaded === true;
    }

    isUnityStarted() {
        return this.unityStarted === true;
    }

    async noticeUnityLoadedToServer() {
        if (this.dotnetBridge) {
            await this.dotnetBridge.invokeMethodAsync("OnUnityLoaded");
        }
    }

    async noticeLoadPercentToServer(value:number) {
        if (this.dotnetBridge) {
            await this.dotnetBridge .invokeMethodAsync("OnLoadPercentUpdate", value);
        }
    }

    //유니티에서 실행
    onUnityLoaded() {
        this.unityLoaded = true;
        this.noticeUnityLoadedToServer();
        console.log(`[DonutSpaceHandler] Unity instance has been loaded`);
    }

    //유니티로 전달
    onPageChanged() {
        if (!this.instance) return;
        this.instance.SendMessage("Bridge", "OnPageChanged");
        console.log(`[DonutSpaceHandler] Send PageChange message to Unity instance`);
    }


}
