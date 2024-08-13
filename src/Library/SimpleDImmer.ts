import * as HomeAssistant from "../Library/HomeAssistant";

export type SimpleDimmerState = "low" | "mid" | "high";

export class SimpleDimmer
{
    private state: SimpleDimmerState = "low";
    private brightness: { [key in SimpleDimmerState]: number } = { "low": 20, "mid": 120, "high": 255 };
    
    public constructor( private entityId: string )
    {}

    public press(callback: () => void)
    {
        HomeAssistant.call("light", "turn_on", this.entityId, { brightness: this.brightness[this.state] }, result =>
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
    }
}