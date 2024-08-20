import * as HomeAssistant from "../Library/HomeAssistant";

export type SimpleDimmerState = "low" | "mid" | "high";

export class SimpleDimmer
{
    private state: SimpleDimmerState = "low";
    private brightness: { [key in SimpleDimmerState]: number } = { "low": 20, "mid": 120, "high": 255 };
    
    public constructor( private entityId: string, private rgbwMode = false )
    {}

    public press(callback: () => void)
    {
        this.getRgbColor( rgbColor =>
        {
            const parameters = {
                brightness: this.brightness[this.state],
                rgbw_color: rgbColor !== undefined ? [ ...rgbColor, this.brightness[this.state] ] : undefined
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
                callback();
            });
        } );
    }

    private getRgbColor( callback: (rgbColor?: [number, number, number]) => void)
    {
        if ( this.rgbwMode === true )
        {
            HomeAssistant.states(this.entityId, result =>
            {
                const rgb = result.attributes.rgb_color;
                callback(rgb)
            } );
        }
        else
        {
            callback();
        }
    }
}