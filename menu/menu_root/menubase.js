import DomEle from "../../dom_elements/domele.js"
import MouseEvent from "../../general/mouse_events.js"
import ActionBase from "../../actions/actionbase.js"
import {domMsg} from "../../mailbox/message_types.js"

export default class MenuBase extends DomEle
{
    constructor(p_name, p_direction="Down")
    {
        super(p_name);
        this.direction = p_direction;
        this.children = new Map();
        this.board = null;
        this.parent = null;
        this._state = false;
        this.axis = null;
        this.actions = new MenuBaseAction(this);
        this._init_children();
        this._build_DOM();
        this._build_board();
    }

    addChild(p_child)
    {
        this.addChildren([p_child]);
    }

    addChildren(p_children)
    {
        super.addChildren(p_children);
        this._build_board();
    }

    _init_children()
    {

    }

    setParent(p_parent)
    {
        this.parent = p_parent;
    }

    getDOM()
    {
        return this.DOM;
    }

    handleEvent(event)
    {
        this.actions.trigger(event);   
    }
    
    reload_board_DOM()
    {
        this._build_board();
    }

    _build_DOM()
    {
        super._build_DOM();
        if (this.DOM)
        {   let text_wrapper = document.createElement("div");
            let dom_text = document.createTextNode(String(this.name));
            text_wrapper.appendChild(dom_text);
            this.DOM.appendChild(text_wrapper);
        }
        for (const mouse_event of MouseEvent.get_event_list())
        {
            this.DOM.addEventListener(mouse_event, this);
        }
    }

    _build_board()
    {
        var wrapper = document.createElement("div");
        this.board = wrapper;
        this.board.style.position = "absolute";
        this.board.style.backgroundColor = "white";
        
        for (const [name, child] of this.children)
        {
            this.board.appendChild(child.getDOM());
        }
    }


    receive_msg(arg_msg)
    {
        if (arg_msg.from == this.parent)
        {
            if (arg_msg.Msg == "click")
            {
                this.remove_board();
            }

        }

        this._propagate_msg(arg_msg);
    }

    display_board()
    {
        let rect = this.DOM.getBoundingClientRect();
        if(this.direction == "side")
        {
            this.board.style.top = rect.top + window.scrollX + "px"
            this.board.style.left = rect.left + window.scrollY + rect.width + "px";
        }
        else
        {
            this.board.style.top = rect.top + window.scrollX + rect.height + "px";
            this.board.style.left = rect.left + "px";
        }
        
        document.body.appendChild(this.board);
        this._state = true;
    }

    remove_board()
    {
        if(this.board.parentNode)
        {
            this.board.parentNode.removeChild(this.board);
            this._state = false;
        }

        for (const [name, child] of this.children)
        {
            if (typeof child.remove_board == "function")
            {
                child.remove_board();
            }

        }
    }

    set_board_style(map_styles)
    {
        for (const [name, value] of map_styles)
        {
            this.board.style[name]= value;
        }
    }

}


export class MenuBaseAction extends ActionBase
{
    constructor(owner)
    {
        super(owner);
    }

    on_click(event)
    {
        if (this._state)
        {
            this.remove_board();
        }
        else
        {
            this.display_board();
        }
        var click_msg = new domMsg(new Object());
        click_msg.to = this.parent;
        click_msg.from = this;
        click_msg.setMsg("click");
        this.send_msg(click_msg);
    }

    on_contextmenu(event)
    {
        this.remove_board();
    }

    on_mouseover(event)
    {
    }

}