import * as HomeAssistant from "../Library/HomeAssistant";
import { Component, addEventHandlers } from "./Shelly";

export class Dimmer
{
    private dir: "up" | "down" = "up";
    private dim = false;
    private entityId = "";
    private delay = 200;
    private step = 16;

    public constructor(entityId: string, component?: Component)
    {
        this.entityId = entityId;
        if ( component )
        {
            addEventHandlers( "input:0", {
                single_push: () => this.toggle(),
                long_push: () => this.start(),
                btn_up: () => this.stop(),
                double_push: () => this.turnOn(255),
            } );
        }
    }

    public turnOn( brightness = 127 )
    {
        HomeAssistant.call("light", "turn_on", this.entityId, { brightness: brightness });
        this.dim = false;
        this.dir = "down";
    }

    public turnOff()
    {
        HomeAssistant.call("light", "turn_off", this.entityId, { brightness: 127 });
        this.dim = false;
        this.dir = "down";
    }

    public toggle()
    {
        HomeAssistant.call("light", "toggle", this.entityId, { brightness: 127 });
        this.dim = false;
        this.dir = "up";
    }

    public start()
    {
        this.dim = true;
        HomeAssistant.states(this.entityId, result =>
        {
            var response = JSON.parse( result.body );
            const brightness = response?.attributes?.brightness ?? 0;
            if (brightness == 0)
            {
                this.dir = "up";
                this.dimmUp();
            }
            else if (brightness == 255)
            {
                this.dir = "down";
                this.dimmDown();
            }
            else
            {
                if ( this.dir === "up" )
                {
                    this.dir = "down";
                    this.dimmDown();
                }
                else
                {
                    this.dir = "up";
                    this.dimmUp();
                }

            }
        } );
    }

    private dimmUp()
    {
        HomeAssistant.call("light", "turn_on", this.entityId, { "brightness_step": this.step }, result =>
        {
            const response = JSON.parse( result.body );
            const brightness = response?.attributes?.brightness;
            if ( brightness >= 255 )
            {
                this.dim = false;
            }
            else
            {
                Timer.set(this.delay, false, () => {
                    if ( this.dim === true )
                    {
                        this.dimmUp();
                    }
                    else
                    {
                        this.dim = false;
                    }
                } );
            }
        });
    }

    private dimmDown()
    {
        HomeAssistant.call("light", "turn_on", this.entityId, { "brightness_step": -this.step }, result =>
        {
            const response = JSON.parse( result.body );
            const brightness = response?.attributes?.brightness;
            if ( brightness <= 0 )
            {
                this.dim = false;
            }
            else
            {
                Timer.set(this.delay, false, () => {
                    if ( this.dim === true )
                    {
                        this.dimmDown();
                    }
                    else
                    {
                        this.dim = false;
                    }
                } );
            }
        });
    }

    public stop()
    {
        this.dim = false;
    }
}
