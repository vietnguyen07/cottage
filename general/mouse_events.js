export default class MouseEvent
{
    constructor()
    {
    }

    static get_event_list()
    {
        const event_list = new Array("click", "contextmenu", "dblclick", "mousedown", "mouseenter",
                                     "mouseleave", "mousemove", "mouseout", "mouseover", "mouseup");
        return event_list;
    }
}