export  default class ContentMsgForm
{
    constructor(in_obj)
    {
        this.from=null;
        this.to=null;
        this.Msg=null;
        Object.assign(this, in_obj);
    }

    _set_default_msg()
    {
        this.Msg = {
            method:"GET",
            scripts: new Array(),
            content: null
        }
    }
}

