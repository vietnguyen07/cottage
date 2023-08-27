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
        this._build_DOM();
        this._init_elements();
    }

    _init_elements()
    {
        this._titlebox = new DomEle(this.name + "_title");
        this._yearbox = new DomEle(this.name + "_year");
        this._textbox = new DomEle(this.name + "text");
        this._titlebox._build_DOM();
        this._yearbox._build_DOM();
        this._textbox._build_DOM();

        this.setGridTemplateColumns('max-content auto');
        this.setGridTemplateRows('auto auto');
        this._titlebox.setStyle([["gridColumn", "1"], ["gridRow", "1"]]);
        this._yearbox.setStyle([["gridColumn", "2"], ["gridRow", "1"], ["textAlign", "end"]]);
        this._textbox.setStyle([["gridColumn", "1/ span 2"], ["gridRow", "2"], ["width", "100%"]]);

        this.addChildren([this._titlebox, this._yearbox, this._textbox]);
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
}
