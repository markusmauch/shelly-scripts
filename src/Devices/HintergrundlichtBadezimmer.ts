/// <reference path="../../types/shelly.d.ts" />

import { SimpleDimmer } from "../Library/SimpleDImmer";

const dimmerLicht = new SimpleDimmer("light.licht_badezimmer");
HTTPServer.registerEndpoint("lichtschalter-badezimmer/input/0/long-press", ( request, response, arg ) => {
    dimmerLicht.press(parameters => {
        response.code = 200;
        response.body = JSON.stringify(parameters);
        response.send();
    });
}, null );

const dimmerHintergrundLicht = new SimpleDimmer("light.hintergrundlicht_badezimmer", true);
HTTPServer.registerEndpoint("lichtschalter-badezimmer/input/1/long-press", ( request, response, arg ) => {
    dimmerHintergrundLicht.press(parameters => {
        response.code = 200;
        response.body = JSON.stringify(parameters);
        response.send();
    });
}, null );
