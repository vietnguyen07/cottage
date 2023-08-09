import MenuBase from "../menu_root/menubase.js"
import OptionBase from "../menu_option/optionbase.js";
import OptionLink from "../menu_option/optionlink.js";

export default class MenuExample extends MenuBase
{
    constructor(p_name, p_direction)
    {
        super(p_name, p_direction);
    }


    _init_children()
    {
        let option_1 = new OptionBase("option 1");
        let option_1_1 = new OptionBase("option 1");
        let option_2 = new OptionBase("option 2");
        let sub_1 = new MenuBase("sub 1", "side");
        let sub_2 = new MenuBase("sub 2", "side");
        let sub_2_2 = new MenuBase("sub 2_2", "side");

        sub_1.setParent(this);
        sub_2.setParent(this);
        sub_2_2.setParent(sub_2);
        sub_2.addChild(sub_2_2);

        /* create sub menu */
        sub_1.addChild(option_1_1);
        sub_1.reload_board_DOM();
        let link_1 = new OptionLink("link_1", "http://www.google.com");
        let link_2_1 = new OptionLink("link_1", "http://www.google.com");
        sub_2.addChild(link_2_1);
        sub_2.reload_board_DOM();
        this.addChild(sub_1);
        this.addChild(sub_2);
    }
}