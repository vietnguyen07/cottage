import ActionBase from "./actionbase.js";

export default class ActionLink extends ActionBase
{
    constructor(p_owner)
    {
        super(p_owner);
        this.owner = p_owner;
    }

    on_click()
    {
        window.open(this._link);
    }
}