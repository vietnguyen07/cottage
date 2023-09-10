import ContainerBase from "../container/containerbase/ContainerBase.js";
import DomEle from "../dom_elements/domele.js";


export default class TitledBlock extends ContainerBase
{
    constructor(pname="untitled")
    {
        
        super(pname);
        this._titlebox = null;
        this._yearbox = null;
        this._textbox = null;
        this._spine = null;
        this._build_DOM();
        this._init_elements();
    }

    _init_elements()
    {
        this._titlebox = new DomEle(this.name + "_title");
        this._yearbox = new DomEle(this.name + "_year");
        this._textbox = new DomEle(this.name + "_text");
        this._spine = new DomEle(this.name + "_spine");
        this._titlebox._build_DOM();
        this._yearbox._build_DOM();
        this._textbox._build_DOM();
        this._spine._build_DOM();

        this.setGridTemplateColumns('auto auto auto');
        this.setGridTemplateRows('auto auto');
        this._titlebox.setStyle([["gridColumn", "2"], ["gridRow", "1"]]);
        this._yearbox.setStyle([["gridColumn", "3"], ["gridRow", "1"], ["textAlign", "end"]]);
        this._textbox.setStyle([["gridColumn", "2/ span 2"], ["gridRow", "2"], ["width", "100%"]]);
        this._spine.setStyle([["gridColumn", "1"], ["gridRow", "1 / span 2"]]);

        this.addChildren([this._titlebox, this._yearbox, this._textbox, this._spine]);
    }

    set_year(p_year)
    {
        this._yearbox.getDOM().innerHTML = p_year;
    }

    set_title(p_title)
    {
        this._titlebox.getDOM().innerHTML = p_title;
    }

    set_text(p_txt)
    {
        this._textbox.getDOM().innerHTML = p_txt;
    }

    set_spine(p_spine)
    {
        this._spine.getDOM().innerHTML = p_spine;
    }

    get_title_obj()
    {
        return this._titlebox;
    }

    get_year_obj()
    {
        return this._yearbox;
    }

    get_text_obj()
    {
        return this._textbox;
    }

    get_spine_obj()
    {
        return this._spine;
    }
}
