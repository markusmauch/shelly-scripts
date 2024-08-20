declare const API_KEY: string;
declare const BASE_URL: string;

const baseUrl = BASE_URL;
const token = API_KEY;

export type Domain =  "alarm_control_panel" | "automation" | "binary_sensor" | "camera" | "climate" | "cover" | "device_tracker" | "fan" | "geo_location" | "group" | "humidifier" | "input_boolean" | "input_datetime" | "input_number" | "input_select" | "input_text" | "light" | "lock" | "media_player" | "notify" | "number" | "person" | "plant" | "proximity" | "remote" | "scene" | "script" | "select" | "sensor" | "siren" | "sun" | "switch" | "timer" | "update" | "vacuum" | "water_heater" | "weather" | "zone";

export interface State
{
    attributes: { [key: string]: any },
    entity_id: string;
    last_changed: string;
    last_updated: string;
    state: string;
}

export function call( domain: Domain, service: string, entityId: string, payload?: {[key:string]: any}, callback: (result: HttpRequestResult) => void = () => {} )
{
    const body = payload === undefined ? {} : payload;
    body.entity_id = entityId;
    Shelly.call(
        "HTTP.Request",
        {
            "method": "POST",
            "url": baseUrl + "/services/" + domain + "/" + service,
            "headers": {
                "Authorization": "Bearer " + token
            },
            "body": JSON.stringify(body)
        },
        result => callback(result)
    );
}

// export function callAsync( domain: Domain, service: string, entityId: string, payload?: {[key:string]: string|number} )
// {
//     return new Promise( ( resolve, reject ) =>
//     {
//         try
//         {
//             const body = payload === undefined ? {} : payload;
//             body.entity_id = entityId;
//             Shelly.call(
//                 "HTTP.Request",
//                 {
//                     "method": "POST",
//                     "url": baseUrl + "/services/" + domain + "/" + service,
//                     "headers": {
//                         "Authorization": "Bearer " + token
//                     },
//                     "body": JSON.stringify(body)
//                 },
//                 result => {
//                     if ( result.code == 200 )
//                     {
//                         resolve(result);
//                     }
//                     else
//                     {
//                         reject(result.message);
//                     }
//                 }
//             );
//         }
//         catch ( error )
//         {
//             reject(error)
//         }
//     } );
// }

export function states( entityId: string, callback: (result: State) => void = () => {} )
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
        result => callback(JSON.parse(result.body))
    );
}
