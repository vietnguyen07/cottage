import {default as loader} from "../common/script_loader.js"

class EditorBase {
    constructor(p_name, p_target_element=undefined) {
        this._name = p_name;
        this._target = p_target_element;
        this._editor = undefined;
    }

    create_editor(){
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

    constructor(p_name, p_target_element=undefined){
        super(p_name, p_target_element);
    }

    async create_editor(){
        let actionLoader = new loader(this._target);

        // only load when ckeditor cdn is not included yet
        if(typeof CKEDITOR_VERSION == 'undefined')
        {
            actionLoader.add_script("https://cdn.ckeditor.com/ckeditor5/41.0.0/classic/ckeditor.js");
        }

        actionLoader
            .add_action(this._add_editor.bind(this))
            .execute();

    }

    _add_editor(){
        ClassicEditor
            .create(this._target)
            .then(editor => {this._editor = editor;})
            .catch( error => {console.error( error );});
    }

}