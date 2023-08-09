

export default class AjaxAdapter
{   
    /**
     * @param {String} name  
     * @param {Map} callbacks
    */
    constructor(name, method="GET", callbacks= new Map())
    {
        this.callbacks_mapping = new Map([
            ["onSuccess", this._success_case],
            ["onTimeout", (e)=>{}],
            ["onFailure", (e)=>{}]
        ])
        this.xhr = new XMLHttpRequest();
        this.method = method;
        this.callbacks = callbacks;
        this._process_callbacks();
    }

    fetch_data(url, params=null)
    {
        this.xhr.open(this.method, url, true);
        this.xhr.send();
    }

    _process_callbacks()
    {
        for (const cb_key of this.callbacks.keys())
        {
            if (this.callbacks_mapping.has(cb_key))
            {
                this.callbacks_mapping.set(cb_key, this.callbacks.get(cb_key));
            }
        }

        this.xhr.onerror = this.callbacks_mapping.get("onFailure");
        this.xhr.ontimeout = this.callbacks_mapping.get("onTimeout");
        this.xhr.onreadystatechange = ()=>{
            if (this.xhr.readyState === XMLHttpRequest.DONE)
            {
                if (this.xhr.status === 200)
                {
                    this.callbacks_mapping.get("onSuccess")(this.xhr.response);
                }
                else
                {
                    this.callbacks_mapping.get("onFailure")(this.xhr.status);
                }
            }
        }
    }

    _success_case(in_reponse)
    {
        console.log(in_reponse);
    }

    abort()
    {
        this.xhr.abort();
    }
}
