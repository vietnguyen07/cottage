import OptionBase from "./optionbase.js";
import ActionLink from "../../actions/actionLink.js";

export default class OptionLink extends OptionBase
{
    constructor(p_name, p_link)
    {
        super(p_name);
        this._link = p_link;
        this.actions = new ActionLink(this);
    }
}