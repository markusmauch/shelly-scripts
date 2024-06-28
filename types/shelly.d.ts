declare namespace Shelly {
    /**
     * Makes a call to a method in the Shelly library.
     * @param method - The name of the method to invoke.
     * @param params - Parameters for the method call (object or string).
     * @param callback - Optional. Function invoked when the call completes.
     * @param userdata - Optional. Data passed to the callback.
     */
    export function call(
        method: CallMethod,
        params: object | string,
        callback?: (result: { result?: object | null, error_code: number, error_message?: string }, userdata?: any) => void,
        userdata?: any
    ): void;

    export type CallMethod = "KVS.Set" | "KVS.Get" | "Script.Start" | "Script.Stop";

    /**
     * Adds an event handler to react to a specific event.
     * @param callback - Function invoked when the event occurs.
     * @param userdata - Optional. Data passed to the callback.
     * @returns A subscription handle to remove the listener.
     */
    export function addEventHandler(callback: (event_data: object, userdata?: any) => void, userdata?: any): number;

    /**
     * Adds a status handler to react to status events.
     * @param callback - Function invoked when a status event occurs.
     * @param userdata - Optional. Data passed to the callback.
     * @returns A subscription handle to remove the listener.
     */
    export function addStatusHandler(callback: (event_data: object, userdata?: any) => void, userdata?: any): number;

    /**
     * Removes an event handler using the subscription handle.
     * @param subscription_handle - The handle returned by addEventHandler.
     * @returns True if the handler was found and removed; false otherwise.
     */
    export function removeEventHandler(subscription_handle: number): boolean;

    /**
     * Removes a status handler using the subscription handle.
     * @param subscription_handle - The handle returned by addStatusHandler.
     * @returns True if the handler was found and removed; false otherwise.
     */
    export function removeStatusHandler(subscription_handle: number): boolean;


    export function emitEvent(name: string, data: any): void;
    export function getComponentConfig(type_or_key: string, id?: number): object | null;
    export function getComponentStatus(type_or_key: string, id?: number): object | null;
    export function getDeviceInfo(): object; // Assuming DeviceInfo is a predefined object type
    export function getCurrentScriptId(): number;
}

declare namespace Timer {
    export function set(period: number, repeat: boolean, callback: (userdata?: any) => void, userdata?: any): number;
    export function clear(timer_handle: number): boolean | undefined;
}

declare namespace MQTT {
    export function isConnected(): boolean;
    export function subscribe(topic: string, callback: (topic: string, message: string, userdata?: any) => void, userdata?: any): void;
    export function unsubscribe(topic: string): boolean;
    export function publish(topic: string, message: string, qos?: number, retain?: boolean): boolean;
    export function setConnectHandler(callback: (userdata?: any) => void, userdata?: any): void;
    export function setDisconnectHandler(callback: (userdata?: any) => void, userdata?: any): void;
}

declare namespace BLE {
    export namespace Scanner {
        export const SCAN_START: number;
        export const SCAN_STOP: number;
        export const SCAN_RESULT: number;
        export const INFINITE_SCAN: number;

        export function subscribe(callback: (event: number, result: object | null, userdata?: any) => void, userdata?: any): void;
        export function start(options: { duration_ms?: number, active?: boolean, interval_ms?: number, window_ms?: number }, callback: (event: number, result: object | null, userdata?: any) => void, userdata?: any): object | null;
        export function stop(): boolean;
        export function isRunning(): boolean;
        export function getScanOptions(): object | null;
    }

    export namespace GAP {
        export const ADDRESS_TYPE_PUBLIC: number;
        export const ADDRESS_TYPE_RANDOM_STATIC: number;
        export const ADDRESS_TYPE_RANDOM_NON_RESOLVABLE: number;
        export const ADDRESS_TYPE_RANDOM_RESOLVABLE: number;
        export const EIR_FLAGS: number;
        export const EIR_SERVICE_16_INCOMPLETE: number;
        export const EIR_SERVICE_16: number;
        export const EIR_SERVICE_32_INCOMPLETE: number;
        export const EIR_SERVICE_32: number;
        export const EIR_SERVICE_128_INCOMPLETE: number;
        export const EIR_SERVICE_128: number;
        export const EIR_SHORT_NAME: number;
        export const EIR_FULL_NAME: number;
        export const EIR_TX_POWER_LEVEL: number;
        export const EIR_DEVICE_ID: number;
        export const EIR_SERVICE_DATA_16: number;
        export const EIR_SERVICE_DATA_32: number;
        export const EIR_SERVICE_DATA_128: number;
        
        export function parseName(data: string): string;
        export function parseManufacturerData(data: string): string;
        export function parseDataByEIRType(data: string, type: number): string;
        export function hasService(data: string, uuid: string): boolean;
        export function parseServiceData(data: string, uuid: string): string;
    }
}

declare namespace HTTPServer {
    export function registerEndpoint(endpoint_name: string, callback: (request: { method: string, query: string, headers: [string, string][], body: string }, response: { code?: number, body?: string, headers?: [string, string][], send: (success: boolean) => void, userdata?: any }) => string, userdata?: any): string;
}

declare function btoh(data: string): string;
    