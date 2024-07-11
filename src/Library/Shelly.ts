interface Eventhandlers
{
    single_push?: () => void;
    long_push?: () => void;
    double_push?: () => void;
    btn_up?: () => void;
}

export type Component = "input:0" | "input:1";

export function addEventHandlers( component: Component, eventhandlers: Eventhandlers )
{
    Shelly.addEventHandler(
        (event, userdata) => {
            if (event.component === component) {
                for ( let eventName in eventhandlers )
                {
                    if (event.info.event === eventName && eventhandlers[eventName] !== undefined)
                    {
                        eventhandlers[eventName]();
                    }
                }
            }
            else {
                return true;
            }
        },
        null
    );
}
