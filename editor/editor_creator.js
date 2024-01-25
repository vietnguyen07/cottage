import {default as loader} from "../common/script_loader.js"

class EditorBase {
    constructor(p_name, p_target_element=undefined) {
        this._name = p_name;
        this._target = p_target_element;
        this._editor = undefined;
    }

    async create_editor(p_placeholder="input text here"){
        throw new Error("virtual method! need a concrete implementation");
    }

    get_data(){
        throw new Error("virtual method! need a concrete implementation");
    }

    set_data(){
        throw new Error("virtual method! need a concrete implementation");
    }

    get_editor(){
        return this._editor;
    }

}

export default class MyCKEditor extends EditorBase
{
    static script_arr = new Array();
    static script_path = "https://cdn.ckeditor.com/ckeditor5/41.0.0/inline/ckeditor.js";

    constructor(p_name, p_target_element=undefined){
        super(p_name, p_target_element);
    }

    async create_editor(p_placeholder = "input data here"){
        let actionLoader = new loader(this._target);

        // only load when ckeditor cdn is not included yet
        if(typeof CKEDITOR_VERSION == 'undefined' && !(MyCKEditor.script_arr.includes(MyCKEditor.script_path)))
        {
            MyCKEditor.script_arr.push(MyCKEditor.script_path);
            actionLoader.add_script(MyCKEditor.script_path);
            actionLoader.execute();
        }

        // wait for until script is loaded
        while(typeof CKEDITOR_VERSION == 'undefined' && MyCKEditor.script_arr.includes(MyCKEditor.script_path)) {
            await new Promise(r => setTimeout(r, 200));
        }      

        actionLoader
            .add_action(()=>{this._add_editor(p_placeholder);})
            .execute();

    }

    get_data(){
        return this._editor.getData();
    }

    set_data(p_data){
        this._editor.setData(String(p_data));
    }

    _add_editor(p_placeholder=""){
        InlineEditor
            .create(
                this._target,
                {placeholder: p_placeholder}
            )
            .then(editor => {this._editor = editor;})
            .catch( error => {console.error( error );});
    }

}