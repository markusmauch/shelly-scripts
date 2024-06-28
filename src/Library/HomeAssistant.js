export function call( domain, service, entityId )
{
    const homeAssistantUrl = "http://192.168.0.4:8123/api/services";
    const token = API_KEY;
    const body = { "entity_id": entityId };
    Shelly.call(
        "HTTP.Request",
        {
            "method": "POST",
            "url": homeAssistantUrl + "/" + domain + "/" + service,
            "headers": {
                "Authorization": "Bearer " + token
            },
            "body": JSON.stringify(body)
        },
        function (result, err) {
        }
    );
}
