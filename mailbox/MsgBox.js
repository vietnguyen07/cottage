import Msg_type from "./message_types.js"

export default class MsgForm
{
    constructor(in_obj)
    {
        this.from=null;
        this.to=null;
        this.Msg=null;
        Object.assign(this, in_obj);
    }

}

export class MsgBox
{
    constructor(p_home)
    {
        this.home = p_home;
        this.dest= null;
        this.inMsg = null;
        this.outMsg = null;
    }

    setDestination(p_dest)
    {
        if (!("receive" in p_dest))
        {
            console.log("destination do not have receive interface");
        }
        else
        {
            this.dest = p_dest;
        }
    }

    Transmit(p_Msg)
    {
        if(p_Msg instanceof MsgForm)
        {   
            this.outMsg = new MsgForm(p_Msg);
        }
        else
        {
            this.outMsg = new MsgForm({});
            this.outMsg.Msg = p_Msg;
        }

        this.outMsg.from = this.home;
        this.outMsg.to = this.dest;
        this.outMsg.to.receive(this.outMsg);
    }

    Receive(p_Msg)
    {
        if(p_Msg instanceof MsgForm)
        {
            this.inMsg = p_Msg;
        }
        else
        {
            throw new Error("Incoming message is not proper Msg form");
        }

        return this.inMsg;
    }
}