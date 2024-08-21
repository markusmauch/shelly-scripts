import * as HomeAssistant from "../Library/HomeAssistant";

export type SimpleDimmerState = "low" | "mid" | "high";

export class SimpleDimmer
{
    private state: SimpleDimmerState = "low";
    private brightness: { [key in SimpleDimmerState]: number } = { "low": 20, "mid": 120, "high": 255 };
    
    public constructor( private entityId: string, private rgbwMode = false )
    {}

    public press(callback: (parameters: any) => void)
    {
        this.getRgbwColor( rgbwColor => {
            
            if ( rgbwColor !== undefined )
            {
                rgbwColor[3] = this.brightness[this.state];
            }
            const parameters = {
                brightness: this.brightness[this.state],
                rgbw_color: rgbwColor
            };
            HomeAssistant.call("light", "turn_on", this.entityId, parameters, result =>
            {
                if (this.state === "low")
                {
                    this.state = "mid";
                }
                else if (this.state ===  "mid")
                {
                    this.state = "high";
                }
                else if (this.state === "high")
                {
                    this.state = "low";
                }
                callback(parameters);
            });
        } );
    }

    private getRgbwColor( callback: (rgbwColor?: [number, number, number, number]) => void)
    {
        if ( this.rgbwMode === true )
        {
            HomeAssistant.states(
                this.entityId,
                result =>
                {
                    const rgbw = result.attributes.rgbw_color;
                    if (rgbw !== null)
                    {
                        callback(rgbw);
                    }
                    else
                    {
                        callback()
                    }
                }
            );
        }
        else
        {
            callback();
        }
    }
}