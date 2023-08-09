import DomEle from "../../dom_elements/domele.js"
import MouseEvent from "../../general/mouse_events.js";
import ActionBase from "../../actions/actionbase.js";

export default class OptionBase extends DomEle
{
    constructor(p_name)
    {
        super();
        this.name = p_name;
        this.DOM = null;
        this.actions = new ActionBase(this);
        this._buildDOM();
    }
    
    handleEvent(event)
    {
        this.actions.trigger(event);
    }

    getDOM()
    {
        return this.DOM;
    }

    _buildDOM()
    {
        var dom_elem = document.createElement("div");
        let text_elem = document.createTextNode(this.name);
        dom_elem.appendChild(text_elem);
        this.DOM = dom_elem;
        for (const mouse_event of MouseEvent.get_event_list())
        {
            this.DOM.addEventListener(mouse_event, this);
        }
    }

    
}