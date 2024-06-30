import * as HomeAssistant from "../Library/HomeAssistant";
import {Dimmer} from "../Library/Dimmer";

const dimmer = new Dimmer("light.licht_wohnzimmer");

Shelly.addEventHandler(
    (event, userdata) => {
        if (event.component === "input:0") {
            if (event.info.event === "single_push")
            {
                HomeAssistant.call("light", "toggle", "light.licht_wohnzimmer");
            }
            else if (event.info.event === "long_push") {
                dimmer.start();
            }
            else if (event.info.event === "btn_down") {
                dimmer.stop();
            }
        }
        else {
            return true;
        }
    },
    null
);