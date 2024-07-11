/// <reference path="../../types/shelly.d.ts" />

import * as HomeAssistant from "../Library/HomeAssistant";
import { addEventHandlers } from "../Library/Shelly";

addEventHandlers( "input:0", {
    single_push: () => Shelly.call("Switch.toggle", {'id': 0}),
    double_push: () => HomeAssistant.call("light", "toggle", "light.licht_flur"),
    long_push: () => HomeAssistant.call("script", "turn_on", "script.lichter_dachgeschoss_ausschalten"),
} );
