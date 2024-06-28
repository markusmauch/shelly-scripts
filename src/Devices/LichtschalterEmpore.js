import * as HomeAssistant from "../Library/HomeAssistant";

Shelly.addEventHandler(
    (event, userdata) => {
        if (event.component === "input:0") {
            if (event.info.event === "single_push")
            {
                Shelly.call("Switch.toggle", {'id': 0});
            }
            else if (event.info.event === "double_push") {
                HomeAssistant.call("light", "toggle", "light.licht_flur");
            }
            else if (event.info.event === "long_push") {
                HomeAssistant.call("script", "turn_on", "script.lichter_dachgeschoss_ausschalten");
            }
        }
        else {
            return true;
        }
    },
    null
);