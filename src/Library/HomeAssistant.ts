declare const API_KEY: string;
declare const BASE_URL: string;

const baseUrl = BASE_URL;
const token = API_KEY;

export type Domain =  "alarm_control_panel" | "automation" | "binary_sensor" | "camera" | "climate" | "cover" | "device_tracker" | "fan" | "geo_location" | "group" | "humidifier" | "input_boolean" | "input_datetime" | "input_number" | "input_select" | "input_text" | "light" | "lock" | "media_player" | "notify" | "number" | "person" | "plant" | "proximity" | "remote" | "scene" | "script" | "select" | "sensor" | "siren" | "sun" | "switch" | "timer" | "update" | "vacuum" | "water_heater" | "weather" | "zone";

export function call( domain: Domain, service: string, entityId: string, payload?: {[key:string]: string|number}, callback: (result: HttpRequestResult) => void = () => {} )
{
    const body = payload === undefined ? {} : payload;
    body.entity_id = entityId;
    Shelly.call(
        "HTTP.Request",
        {
            "method": "POST",
            // "url": `${baseUrl}/services/${domain}/${service}`,
            "url": baseUrl + "/services/" + domain + "/" + service,
            "headers": {
                "Authorization": "Bearer " + token
            },
            "body": JSON.stringify(body)
        },
        result => callback(result)
    );
}

export function states( entityId: string, callback: (result: HttpRequestResult) => void = () => {} )
{
    Shelly.call(
        "HTTP.Request",
        {
            "method": "GET",
            // "url": `${baseUrl}/states/${entityId}`,
            "url": baseUrl + "/states/" + entityId,
            "headers": {
                "Authorization": "Bearer " + token
            }
        },
        result => callback(result)
    );
}
