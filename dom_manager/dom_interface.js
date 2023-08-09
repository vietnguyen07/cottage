import {domMsg} from "../mailbox/message_types.js"

export class dom_interface
{
    constructor(p_obj_type, p_obj_name)
    {
        this.Msg = new domMsg();
    }

    send_single(p_target, p_message)
    {
        console.log("this is the default interface, need overwritten");
    }

    send_broadcast(p_message)
    {
        console.log("this is the default interface, need overwritten");
    }

    receive(p_message)
    {
        console.log("this is the default interface, need overwritten");
    }

    setMgr(p_Mgr)
    {
        console.log("this is the default interface, need overwritten");
    }
}

export {dom_interface as default};