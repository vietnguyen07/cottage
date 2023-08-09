import {default as dom_interface} from "./dom_interface.js";

export class dom_mgr extends dom_interface
{
    constructor()
    {
        super();
        dom_mgr.instance = this;
        this.dom_map = new Map();
    }

    register(p_dom, p_object)
    {
        this.dom_map.set(p_dom, p_object);
        p_object.setMgr(this);
    }

    unregister(p_key)
    {
        this.dom_map.delete(p_key);
    }
    
    getObject(p_key)
    {
        if(this.dom_map.has(p_key))
        {
            return this.dom_map.get(p_key);
        }
        else {return null};
    }

    getKeylist()
    {
        return Array.from(this.dom_map.keys());
    }
}

export {dom_mgr as default};