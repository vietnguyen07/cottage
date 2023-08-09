export const Msg_type = Object.freeze(
    {
        single: Symbol("Single"),
        brocst: Symbol("broadcast") 
    }
);

export class domMsg
{
    constructor()
    {
        this.l_type = Msg_type.single;
        this.Msg = null;
    }

    setType(p_Type)
    {
        this.l_type = p_Type;
    }

    getType()
    {
        return this.l_type;
    }

    setMsg(p_Msg)
    {
        this.Msg = p_Msg;
    }

    getMsg()
    {
        return this.Msg;
    }
}

export {domMsg as default};