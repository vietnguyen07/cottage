import ContainerBase, { ActionContainer } from "../containerbase/ContainerBase.js";
import MouseEvent from "../../general/mouse_events.js";

export default class ContainerImage extends ContainerBase
{
    constructor(p_name , p_image_link, p_height=null, p_width=null)
    {
        super(p_name);
        this.img_link = p_image_link;
        this._len = p_width;
        this._hei = p_height;
        this._build_DOM();
        this.actions =  new ActionImage(this);
    }

    setImage(p_image_link)
    {
        this.img_link = p_image_link;
        this._build_DOM();
    }

    _build_DOM()
    {
        var img_frame = document.createElement("div");
        img_frame.style.backgroundImage = `url('${this.img_link}')`;
        img_frame.style.backgroundSize = 'contain';
        img_frame.style.backgroundRepeat = 'no-repeat';
        
        if (!this._len || !this._hei)
        {
            img_frame.style.width = "100%";
            img_frame.style.height = "100%";       
        }
        else
        {
            img_frame.style.width = this._len;
            img_frame.style.height = this._hei;
        }

        this.DOM = img_frame;

        for (const ev of MouseEvent.get_event_list())
        {
            this.DOM.addEventListener(ev, this);
        }
    }

}


export class ActionImage extends ActionContainer
{
    constructor(p_owner)
    {
        super(p_owner);
    }

}