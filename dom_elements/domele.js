import MsgForm from "../mailbox/MsgBox.js"

export default class DomEle
{
    constructor(p_name)
    {
        this.name = p_name;
        this.children = new Map();
        this.DOM = null;
        this.ShadowDOM = null;
        this.parent = null;
        this._subscribers = new Array();

    }

    /** 
     * @returns {HTMLDivElement}
     */
    getDOM()
    {
        return this.DOM;
    }

    callAction()
    {
        console.log("base, need to override");
    }

    addClass(p_class)
    {
        if (Array.isArray(p_class))
            for (const cls of p_class)
                this.DOM.classList.add(cls);
        else
            this.DOM.classList.add(p_class);
    }

    addSubscriber(p_element)
    {
        this._subscribers.push(p_element);
    }

    handleEvent(event)
    {
        console.log("base, need to override");
    }

    receive_msg(arg_msg)
    {
    }

    send_msg(arg_msg)
    {   
        var msg = new MsgForm(arg_msg);
        msg.from = this;
        var receiver = msg.to;

        // DEBUG console.log("sending message from " + String(msg.from.name) + " to " + String(msg.to.name) );
        if (receiver && (typeof receiver.receive_msg == "function")) 
        {
            receiver.receive_msg(msg);
        }
    }

    setParent(p_parent)
    {
        this.parent = p_parent;
    }

    addChildren(p_children)
    {
        if (Array.isArray(p_children))
        {
            for (const child of p_children)
            {
                if (typeof(child.setParent) == "function")
                {
                    child.setParent(this);
                }
                
                if (typeof(child.name) == "string")
                {
                    this.children.set(child.name, child);
                }
                else
                {
                    this.children.set(this.children.size, child);
                }
            }
            
        }
        else
        {
            if (typeof(p_children.setParent) == "function")
            {
                p_children.setParent(this);
            }
            
            if (typeof(p_children.name) == "string")
            {
                this.children.set(p_children.name, p_children);
            }
            else
            {
                console.log(typeof(this.children));
                this.children.set(this.children.size, p_children);
            }
        }

        this._build_DOM();
        this.updateDOM();
    }

    getChild(child_name)
    {
        if (this.children.has(child_name))
        {
            return this.children.get(child_name);
        }
        else
        {
            return null;
        }
    }

    rmChild(child_name)
    {
        if (this.children.has(child_name))
        {
            let child_obj = this.children.get(child_name);
            if (typeof(child_obj.getDOM) == "function")
            {
                this.DOM.removeChild(child_obj.getDOM());
            }
            else
            {
                this.DOM.removeChild(child_obj);
            }
        }
    }

    purgeChildren()
    {   
        if(this.getDOM() != null)
        {
            let child_nodes = Array.from(this.getDOM().childNodes);
            for (const child of child_nodes)
            {
                child.parentNode.removeChild(child);
            }
        }
        this.children.clear();
    }

    updateDOM()
    {
        if((this.DOM != null) && (document.body.contains(this.DOM)))
        {
            this.DOM.parentNode.replaceChild(this.ShadowDOM, this.DOM);
            this.DOM = this.ShadowDOM;
        }
    }

    setStyle(map_styles)
    {
        for (const [name, value] of map_styles)
        {
            if(this.DOM != null)
            {
                this.DOM.style[name]= value;
            }
        }
    }

    setLink(in_link)
    {
        if(this.DOM != null)
        {
            this.DOM.href = in_link;        
        }
    }

    setContent(content)
    {
        if(this.DOM != null)
        {
            this.DOM.innerHTML = content;       
        }
    }

    _build_DOM()
    {
        var overall_frame = document.createElement("div");
        overall_frame.classList.add(String(this.name)+"_wrapper")
        for (const [name, child] of this.children)
        {
            if (typeof(child.getDOM) == "function")
            {
                overall_frame.appendChild(child.getDOM());
            }
            else if (typeof(child.nodeType) == "number")
            {
                overall_frame.appendChild(child);
            }
        }

        // copy from current DOM if exist
        if (this.DOM != null)
        {
            overall_frame.style.cssText = this.DOM.style.cssText;
        } 

        // if DOM is null or not displaying
        if ((this.DOM == null) || (!document.body.contains(this.DOM)))
        {
            this.DOM = overall_frame;
        }
        else
        {
            // re-assign class list

            this.ShadowDOM = overall_frame;
            this.ShadowDOM.classList = this.DOM.classList;
        }
    }

    _propagate_msg(msg)
    {
        for (const [name, child] of this.children)
        {
            if (child && (child != msg.from) && (typeof child.receive_msg == "function"))
            {
                msg.to = child;
                this.send_msg(msg);
            }
        }
    }
    
}