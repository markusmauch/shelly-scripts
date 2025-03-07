/// <reference path="../../types/shelly.d.ts" />

import * as HomeAssistant from "../Library/HomeAssistant";
import { addEventHandlers } from "../Library/Shelly";

addEventHandlers("input:0", {
    single_push: () => Shelly.call("Switch.toggle", {'id': 0}),
    double_push: () => HomeAssistant.call("switch", "toggle", "switch.hintergrundlicht_buro"),
    long_push: () => HomeAssistant.call("lock", "open", "lock.haustur" ),
});