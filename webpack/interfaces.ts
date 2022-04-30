export interface IDurationWaiter {
    isEnded: boolean;
    totalDuration: number;
}


export interface DotNet {
    invokeMethod: (assembly: string, method: string, ...args: Array<any>) => any,
    invokeMethodAsync: (assembly: string, method: string, ...args: Array<any>) => Promise<any>
}