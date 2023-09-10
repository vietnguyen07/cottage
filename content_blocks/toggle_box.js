import TitledBlock from "./block_with_header.js";

export default class ToggleBox extends TitledBlock
{
    constructor(p_name)
    {
        super(p_name);
        this._speed = 0;
        this.get_title_obj().getDOM().addEventListener("click", this._toggle.bind(this));
        this.get_spine_obj().getDOM().addEventListener("click", this._toggle.bind(this));
        $(this.get_text_obj().getDOM()).hide();
        this._process_spine_bg();
    }

    set_speed(spd)
    {
        this._speed = spd;
    }

    _toggle()
    {
        let hidden_space = this.get_text_obj().getDOM();
        $(hidden_space).toggle(this._speed);
        this._draw_folding();
        this._process_spine_bg();
    }

    _draw_folding()
    {
        let spine = this.get_spine_obj().getDOM();
    }
    
    _is_visible()
    {
        let hidden_space = this.get_text_obj().getDOM();
        return $(hidden_space).is(':visible');
    }

    _process_spine_bg()
    {
        let spine_bg = document.createElement('div');
        spine_bg.classList.add("spine_bg");
        let spine = this.get_spine_obj().getDOM();
        let existing_bg = spine.getElementsByClassName("spine_bg");
        for (let bg of existing_bg)
        {
            spine.removeChild(bg);
        }
        
        if (this._is_visible()){
            let spine_x = window.getComputedStyle(this.get_spine_obj().getDOM()).width;
            let spine_y = window.getComputedStyle(this.get_spine_obj().getDOM()).height;
            spine_bg.style.fontSize = parseInt(spine_x) + "px";
            spine_bg.style.marginTop = parseInt(spine_y)/2 - parseInt(spine_x)/2  + "px";
            spine_bg.style.marginTop = parseInt(spine_y)/2 - parseInt(spine_x)/2  + "px";
            spine_bg.innerHTML = "&minus;";
        }
        else{
            spine_bg.style.marginTop = "0px";
            spine_bg.innerHTML = "&#10010;";
        }

            
        spine.appendChild(spine_bg);
    }
}