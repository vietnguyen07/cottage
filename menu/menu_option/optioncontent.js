import OptionBase from "./optionbase.js";
import ActionBase from "../../actions/actionbase.js";
import MsgForm from "../../mailbox/MsgBox.js";

export default class OptionContent extends OptionBase
{
    /**
     * 
     * @param {String} p_name 
     * @param {String} content_ID 
     */
    constructor(p_name, url, locality=true, prot="GET")
    {
        super(p_name);
        this.actions = new ActionContent(this);
        this.url = url;
        this.locality = locality;
        this.prot = prot;
    }
}

export class ActionContent extends ActionBase
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
            msg.Msg = {url: this.url, prot: this.prot, locality: this.locality}
            describer.notify(msg);
        }
    }
}