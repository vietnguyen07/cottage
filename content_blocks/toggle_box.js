import TitledBlock from "./block_with_header.js";

export default class ToggleBox extends TitledBlock
{
    constructor(p_name)
    {
        super(p_name);
        this._speed = 0;
        this._close_style = [
            ["height", "2em"],
            ["overflow", "hidden"],
            ["textOverflow", "ellipsis"],
            ["whiteSpace", "nowrap"]
        ];
        this.get_title_obj().getDOM().addEventListener("click", this._toggle.bind(this));
        this.get_spine_obj().getDOM().addEventListener("click", this._toggle.bind(this));
        this.get_text_obj().setStyle(this._close_style);
        this._is_hide = true;
        this._process_spine_bg();
    }

    set_speed(spd)
    {
        this._speed = spd;
    }

    _toggle()
    {
        let hidden_space = this.get_text_obj().getDOM();
        if (!this._is_hide){
            $(hidden_space).animate({height: "1.2em"}, 200);
            hidden_space.style.whiteSpace = "nowrap";
        }
        else {
            $(hidden_space).animate({height: "100%"}, 200);
            hidden_space.style.whiteSpace = "normal";
        }
        this._draw_folding();
        this._is_hide = !this._is_hide;
        this._process_spine_bg();
        
    }

    _draw_folding()
    {
        let spine = this.get_spine_obj().getDOM();
    }
    
    _is_visible()
    {
        return this._is_hide;
    }

    _process_spine_bg()
    {
        let spine_bg = document.createElement('div');
        let spine = this.get_spine_obj().getDOM();
        let existing_bg = spine.getElementsByClassName("spine_bg");

        spine_bg.classList.add("spine_bg");
        spine_bg.style.display = "flex";
        spine_bg.style.width = "100%";
        spine_bg.style.height = "100%";

        for (let bg of existing_bg)
        {
            spine.removeChild(bg);
        }
        

        let mark = document.createElement("div");
        mark.style.margin = "auto";

        if (this._is_visible()){
            mark.innerHTML = "&#9660;";
        }
        else{
            mark.innerHTML = "&#8863;";
        }
        spine_bg.appendChild(mark);

            
        spine.appendChild(spine_bg);
    }
}