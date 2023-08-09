import AjaxAdapter from "../comm/ajax_comm.js";

export default class _fetcher
{
    /** 
     * @param {Object} p_json_obj  
     * @param {Map} in_callback_map 
    */
    constructor(p_json_obj, in_callback_map){
        if("url" in p_json_obj)
        {
            this.url = p_json_obj["url"];
            this.method = p_json_obj["prot"];
            this.adapter = new AjaxAdapter("ajax_adapter", this.method, in_callback_map);
        }
    }

    get_content()
    {
        this.adapter.fetch_data(this.url);
    }

    close()
    {
        this.adapter.abort();
    }

}