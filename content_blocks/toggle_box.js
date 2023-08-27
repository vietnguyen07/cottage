import TitledBlock from "./block_with_header.js";

export default class ToggleBox extends TitledBlock
{
    constructor(p_name)
    {
        super(p_name);
        this._speed = 0;
        this.get_title_obj().getDOM().addEventListener("click", this._toggle.bind(this));
    }

    set_speed(spd)
    {
        this._speed = spd;
    }

    _toggle()
    {
        let hidden_space = this.get_text_obj().getDOM();
        $(hidden_space).toggle(this._speed);
    }
}