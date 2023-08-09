import { Button } from "../button_root_class.js";

export class ButtonOption extends Button 
{
    constructor(p_name)
    {
        super(p_name);
    }

    onClick(event)
    {
        this.removeDomClass("released");
        this.addDomClass("pressed");
        
    }

    onRelease(event)
    {
        this.removeDomClass("pressed");
        this.addDomClass("released");
    }
}

export {ButtonOption as default};