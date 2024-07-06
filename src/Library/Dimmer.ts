import * as HomeAssistant from "../Library/HomeAssistant";

export class Dimmer
{
    private dir: "up" | "down" = "up";
    private dim = false;
    private entityId = "";
    private delay = 200;
    private step = 10;

    public constructor(entityId: string)
    {
        this.entityId = entityId;
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
        HomeAssistant.call("light", "turn_on", this.entityId, { "brightness_step_pct": this.step }, result =>
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
        HomeAssistant.call("light", "turn_on", this.entityId, { "brightness_step_pct": -this.step }, result =>
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
