/// <reference path="../../types/shelly.d.ts" />

import * as HomeAssistant from "../Library/HomeAssistant";
import {Dimmer} from "../Library/Dimmer";

const dimmerLicht = new Dimmer("light.licht");
const dimmerHintergrundlicht = new Dimmer("light.hintergrundlicht_schlafzimmer");

// Licht
Shelly.addEventHandler(
    (event, userdata) => {
        if (event.component === "input:0") {
            if (event.info.event === "single_push")
            {
                HomeAssistant.call("light", "toggle", "light.licht");
            }
            else if (event.info.event === "long_push") {
                dimmerLicht.start();
            }
            else if (event.info.event === "btn_up") {
                dimmerLicht.stop();
            }
        }
        else {
            return true;
        }
    },
    null
);

// Lintergrundlicht
Shelly.addEventHandler(
    (event, userdata) => {
        if (event.component === "input:1") {
            if (event.info.event === "single_push")
            {
                HomeAssistant.call("light", "toggle", "light.hintergrundlicht_schlafzimmer");
            }
            else if (event.info.event === "long_push") {
                dimmerHintergrundlicht.start();
            }
            else if (event.info.event === "btn_up") {
                dimmerHintergrundlicht.stop();
            }
        }
        else {
            return true;
        }
    },
    null
);