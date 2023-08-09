import ModelBase from "./model_base.js";
import ContentDisplay from "../contentframe/contentframe.js";

export default class PageLoadModel extends ModelBase
{
    constructor(p_name, p_owner)
    {
        super(p_name, p_owner);
        this.targets = new Array();
    }

    add_target(p_target)
    {
        this.targets.push(p_target);
    }

    notify(p_message)
    {
        let url = null;
        let prot = "GET";
        let locality = true;
        let msg = {};
        let message = p_message.Msg;
        if ("url" in message)
        {
            url = message["url"];
        }
        else
        {
            url = "nofound.html";
        }

        if ("prot" in message)
        {
            prot = message["prot"];
        }

        if ("locality" in message)
        {
            locality = message["locality"];
        }

        if ("msg" in message)
        {
            msg = message["msg"];
        }

        if(locality == true)
        {
            url = "http://" + window.location.hostname + "/pages/" + url;
        }

        for (const target of this.targets) 
        {
            target.notify(msg, prot, locality, url);
        }
    }
}
