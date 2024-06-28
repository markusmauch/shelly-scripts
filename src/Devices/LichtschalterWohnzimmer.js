import * as HomeAssistant from "../Library/HomeAssistant";

Shelly.addEventHandler(
    function (event, userdata) {
        if (event.component === "input:0") {
            if (event.info.event === "single_push")
            {
                HomeAssistant.call("light", "toggle", "light.licht_wohnzimmer");
            }
            else if (event.info.event === "double_push") {
                // HomeAssistant.call("light", "toggle", "light.hintergrundlicht_flur");
            }
            else if (event.info.event === "long_push") {
                // HomeAssistant.call("script", "turn_on", "script.lichter_erdgeschoss_ausschalten");
            }
        }
        else {
            return true;
        }
    },
    null
);