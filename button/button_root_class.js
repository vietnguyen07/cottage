import dom_mgr_interface from "../dom_manager/dom_interface.js";
import dom_mgr from "../dom_manager/dom_mgr.js";
import msgTypes from "../mailbox/message_types.js";
import {default as domEnum} from "../general/global_enum.js";
import {domMsg} from "../mailbox/message_types.js";

export const ButtonState = Object.freeze(
    {
        Pressed: Symbol("Pressed"),
        Released: Symbol("Released")
    }
);


export class Button extends dom_mgr_interface
{
    constructor(p_name)
    {
        super(domEnum.button, p_name);
        this.Name = p_name;
        this.DOM_obj = this.create_DOM();
        this.State = ButtonState.Released;
        this.EvLr = new Map([
            ["mousedown", this.onClick],
            ["mouseup", this.onRelease]
          ]);
        this.init_EventListener();
    }

    release()
    {
        alert("button released");
    }

    setMgr(p_Mgr)
    {
        this.Mgr = p_Mgr;
    }

    create_DOM()
    {
        var init_div = document.createElement("div");
        var div_txt = document.createTextNode(this.Name);
        init_div.appendChild(div_txt);
        return init_div;
    }

    addDomClass(p_class)
    {
        this.DOM_obj.classList.add(p_class);
    }

    removeDomClass(p_class)
    {
        this.DOM_obj.classList.remove(p_class);
    }

    get_DOM()
    {
        return this.DOM_obj;
    }

    handleEvent(event)
    {
        let ev_arr = Array.from(this.EvLr.keys());
        if(ev_arr.includes(event.type))
        {
            let evt = this.EvLr.get(event.type);
            evt = evt.bind(this);
            evt(event);
        }
    }

    send_single(p_target, p_message)
    {
        let msg = new domMsg();
        msg.setType(msgTypes.single);
        msg.setMsg("test sending msg");
    }

    init_EventListener()
    {
        for(let i=0; i < Array.from(this.EvLr.keys()).length; i++)
        {
            this.get_DOM().addEventListener(Array.from(this.EvLr.keys())[i], this);
        }
    }

    onClick(event)
    {
        this.State = ButtonState.Pressed;
    }

    onRelease(event)
    {
        this.State = ButtonState.Released;
    }
    
    modEvtLstnr(p_event, p_handler)
    {
        this.EvLr.set(p_event, p_handler);
        this.get_DOM().addEventListener(p_event, this);
    }
}

export {Button as default};
