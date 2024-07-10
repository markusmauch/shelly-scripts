/// <reference path="../../types/shelly.d.ts" />

import * as HomeAssistant from "../Library/HomeAssistant";

Shelly.addEventHandler(
    (event, userdata) => {
        if (event.component === "input:0") {
            if (event.info.event === "single_push")
            {
                Shelly.call("Switch.toggle", {'id': 0});
            }
            else if (event.info.event === "double_push") {
                HomeAssistant.call("light", "toggle", "light.hintergrundlicht_buro");
            }
            else if (event.info.event === "long_push") {
                HomeAssistant.call("lock", "open", "lock.haustur" );
            }
        }
        else {
            return true;
        }
    },
    null
);