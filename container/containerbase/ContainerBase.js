import DomEle from "../../dom_elements/domele.js"
import ActionBase from "../../actions/actionbase.js";
import MouseEvent from "../../general/mouse_events.js";
import {domMsg, Msg_type} from "../../mailbox/message_types.js"
import MsgForm from "../../mailbox/MsgBox.js";

export default class ContainerBase extends DomEle
{
    constructor(p_name, p_models = null)
    {
        super(p_name);
        this.axis = "row";
        if (p_models)
        {
            this.models = p_models;
        }
        else
        {
            this.models = new Map();
        }
        this.actions = new ActionContainer(this);
        this.DOM = null;
    }

    setGridTemplateArea(grid_template)
    {
        if (this.DOM != null)
        {
            this.DOM.style.display = "grid";
            this.DOM.style.gridTemplateAreas = grid_template;
        }
    }

    setGridTemplateColumns(grid_columns)
    {
        if (this.DOM != null)
        {
            this.DOM.style.display = "grid";
            this.DOM.style.gridTemplateColumns = grid_columns;
        }
    }

    setGridTemplateRows(grid_rows)
    {
        if (this.DOM != null)
        {
            this.DOM.style.display = "grid";
            this.DOM.style.gridTemplateRows = grid_rows;
        }
    }

    setGridColumn(column_id)
    {
        if(this.DOM)
        {
            this.DOM.gridColumn = column_id;
        }
    }

    setGridRow(row_id)
    {
        if(this.DOM)
        {
            this.DOM.style.gridRow = row_id;
        }
    }

    setGridArea(area_name)
    {
        this.DOM.style.gridArea = area_name;
    }

    getDOM()
    {
        return this.DOM;
    }


    handleEvent(event)
    {
        this.actions.trigger(event);   
    }

    receive_msg(arg_msg)
    {
        this._propagate_msg(arg_msg);
        if (this.parent && (this.parent != arg_msg.from))
        {
            arg_msg.to = this.parent;
            this.send_msg(arg_msg);
        }
    }

    _build_DOM()
    {
        super._build_DOM();

        for (const ev of MouseEvent.get_event_list())
        {
            this.DOM.addEventListener(ev, this);
        }

    }


    get_text()
    {
        return this.DOM.innerText;
    }

    set_vertical()
    {
        this.axis = "column";
        this.setStyle([["flex-direction", this.axis]]);
        this.updateDOM();
    }


}


export class ActionContainer extends ActionBase
{
    constructor(owner)
    {
        super(owner);
    }

    on_click(event)
    {
        let msg = new MsgForm(new Object());
        msg.from = this;
        msg.Msg = event;

        // send to parent
        msg.to = this.parent;
        this.send_msg(msg);
        
        // send to models that we subscribed to
        for (const model of this._subscribers)
        {
            msg.to = model;
            model.notify(msg);
        }
    }

}