/// <reference path="../../types/shelly.d.ts" />

import * as HomeAssistant from "../Library/HomeAssistant";
import { addEventHandlers } from "../Library/Shelly";

addEventHandlers("input:0", {
    single_push: () => Shelly.call("Switch.toggle", {'id': 0}),
    long_push: () => HomeAssistant.call("light", "toggle", "light.hintergrundlicht_wohnzimmer_ug"),
} );

addEventHandlers("input:1", {
    // single_push: () => Shelly.call("Switch.toggle", {'id': 0}),
    // double_push: () => HomeAssistant.call("light", "toggle", "light.hintergrundlicht_flur"),
    // long_push: () => HomeAssistant.call("light", "toggle", "light.hintergrundicht_kuche_ug"),
} );