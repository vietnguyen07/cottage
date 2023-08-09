import menu_actions_root from "../menu_root/menu_actions.js";
import menu_root from "../menu_root/menu_root.js";

class navigate_action extends menu_actions_root
{
    constructor()
    {
        super();
        console.log("TEST TSET TSETSTSET");
    }

    func_delete = (...args) =>{
        alert("DELETE");
    }
}


export default class menu_navigate extends menu_root
{
    constructor(p_name, p_structure, p_direction="down", p_parent_menu=null)
    {
        super(p_name, p_structure, p_direction, p_parent_menu, navigate_action);
    }
}