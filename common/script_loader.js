export default class ScriptLoader {
    /***
     * @param {Element} target_element 
     */
    constructor(target_element) {
        this._action_arr = new Array();
        this._target = target_element;
    }

    add_action(p_func) {
        this._action_arr.push(p_func);
        return this;
    }

    add_script(p_path) {
        let load_func = (_success, _failed) => {
            let js_el = document.createElement("script");
            js_el.src = p_path;
            js_el.onload = _success;
            js_el.onabort = _failed;
            js_el.onerror = _failed;
            this._target.appendChild(js_el);
        };

        this._action_arr.push(load_func);
        return this;
    }

    async execute() {
        while (this._action_arr.length > 0) {
            let _action = this._action_arr.shift();
            let prom = new Promise(
                (resolve, failed) => {
                    _action(resolve, failed);
                }
            );
            await prom.catch(console.error("cannot complete action" + _action));
        }

        return true;
    }
}