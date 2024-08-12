/// <reference path="../../types/shelly.d.ts" />

HTTPServer.registerEndpoint("input0", ( request, response, arg ) => {
    Shelly.call("RGBW.toggle", {'id': 0});
}, null );