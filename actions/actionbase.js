export default class ActionBase
{
    constructor(owner)
    {
        this.owner = owner;
    }

    on_click(event)
    {
    }

    on_contextmenu(event)
    {
    }

    on_mouseenter(event)
    {
    }

    on_mouseout(event)
    {
    }

    on_mouseover(event)
    {
    }

    trigger(event)
    {
        let action_name = "on_" + String(event.type);
        //event.preventDefault();
        event.stopPropagation();
        if(typeof(this[action_name]) == "function")
        {
            let desired_action = this[action_name].bind(this.owner);
            desired_action(event);
        }
    }
}