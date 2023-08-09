import OptionBase from "./optionbase.js";
import ActionBase from "../../actions/actionbase.js";
import MsgForm from "../../mailbox/MsgBox.js";

export default class OptionFunction extends OptionBase
{
    constructor(p_name)
    {
        super(p_name);
        this.actions = new ActionFunction(this);
    }
}

export class ActionFunction extends ActionBase
{
    constructor(p_owner)
    {
        super(p_owner);
        this.owner = p_owner;
    }

    on_click()
    {

        for(const describer of this._subscribers)
        {
            let msg = new MsgForm({});
            msg.from = this;
            msg.to = describer;
            msg.Msg = "message from " + this.name;
            describer.notify(msg);
        }
    }
}