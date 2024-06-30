import * as HomeAssistant from "../Library/HomeAssistant";

export class Dimmer
{
    private dir = "up";
    private dim = false;
    private entityId = "";
    private delay = 800;

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
            const brightness = response?.attributes?.brightness;
            if ( brightness !== undefined )
            {
                if (brightness == 0)
                {
                    this.dir = "up";
                    this.dimmUp();
                }
                else if (brightness == 255)
                {
                    this.dir = "down"
                }
                else
                {
                    this.dir = this.dir === "up" ? "down" : "up";
                }
            }
            else
            {
                this.dim = false;
            }
        } );
    }

    private dimmUp()
    {
        HomeAssistant.call("light", "turn_on", this.entityId, { "brightness_step_pct": 10 }, result =>
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
                }, 800 );
            }
        });
    }

    public stop()
    {
        this.dim = false;
    }
}
