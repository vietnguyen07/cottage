import ContainerBase from "../containerbase/ContainerBase.js";
import {ActionContainer} from "../containerbase/ContainerBase.js";

export default class ContainerTxt extends ContainerBase
{
    constructor(p_name)
    {
        super(p_name);
        this.actions = new ActionContainerTxt(this);
        this._txt = null;
        this._link = null;
    }

    set_txt(p_txt)
    {
        this._txt = p_txt;
        this.purgeChildren();
        let txt_wrapper = document.createElement('a');
        let txt_node = document.createTextNode(this._txt);
        txt_wrapper.appendChild(txt_node);
        this.addChildren(txt_wrapper);
        this.updateDOM();
    }

    add_line(p_txt)
    {   
        this._txt += "\n" + p_txt
        let txt_wrapper = document.createElement('div');
        let txt_node = document.createTextNode(p_txt);
        txt_wrapper.appendChild(txt_node);
        this.addChildren(txt_wrapper);
        this.updateDOM();
    }

    get_text()
    {
        return this._txt;
    }

    setLink(in_link)
    {
        this._link = in_link;
    }


}


export class ActionContainerTxt extends ActionContainer
{
    constructor(owner)
    {
        super(owner);
    }

    on_click(event)
    {
        super.on_click(event);

        if (this._link != null)
        {

            //only text will be affected
            if (event.target.tagName == "A")
            {
                window.location.href = this._link;
            }
        }
        
    }

}