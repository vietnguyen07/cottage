import DomEle from "../dom_elements/domele.js";
import FormFactory from "./_form_factory.js";
import _fetcher from "./_fetcher.js";
import { is_json } from "../common/common.js";

export default class ContentDisplay extends DomEle
{
    /**
     * 
     * @param {string} p_name 
     */
    constructor(p_name)
    {
        super(p_name);
        this._form_factory = FormFactory;
        this._fetcher = _fetcher;
        this.current_fetcher = null;
        this.content_form = null;
        this._build_DOM();
    }

    /**
     * 
     * @param {Object} p_in_message 
     */
    notify(p_in_message, prot="GET", locality=true, url=null)
    {
        /* Get standardized format */
        let form_fact = new this._form_factory(prot, locality, url);
        let content_form = form_fact.get_tx_form(p_in_message);
        
        /* cancel any on-going transaction */
        if(this.current_fetcher != null)
        {
            this.current_fetcher.close();
        }
        
        // Only one fetcher can exist
        this.content_form = content_form;
        this._create_fetch_channel(this.content_form);

    }

    _create_fetch_channel(content_form)
    {
        /* Get content fetcher*/
        this.current_fetcher = new this._fetcher(content_form, new Map([
            ["onSuccess", this._callback_process_content.bind(this)],
            ["onTimeout", (e)=>{}],
            ["onFailure", this._callback_failed.bind(this)]
        ]));
        this.current_fetcher.get_content();
    }

    /** @param {String} in_data  */
    _callback_process_content(in_data)
    {
        if(is_json(in_data))
        {
            in_data = JSON.parse(in_data);
            if ("content" in in_data)
            {
                let content = in_data["content"];
                
                if ("scripts" in content)
                {
                    for (const js_script of content["scripts"])
                    {
                        let script = document.createElement('script');
                        script.src = js_script;
                        script.async = false;
                        document.body.append(script);
                    }
                }

                if("text" in content)
                {
                    let test_text = content["text"];
                    this.display_content(test_text);
                    console.log(test_text);
                }

                
            }
            else
            {
                console.log("cannot recognize data");
            }
        }
        else if(String(in_data).includes("// type:=js_module"))
        {
            //javascript module case
            let module_str = "data:text/javascript," + in_data;
            import(module_str).then(mod => {
                let obj = new mod.default();
                this.display_content(obj.getDOM());
            });   
        }
        else
        {
            this.display_content(in_data);
        }
    }

    /**
     * 
     * @param {Array<String>} script_list 
     */
    __loading_jscript(script_list)
    {
        for (const script of script_list)
        {
            let js_script_ele = new Element("script");
        }
    }

    _callback_failed(in_status)
    {
        this.display_content(in_status);
    }

    _clear_content()
    {
        let working_space = this.getDOM();

        /* Truncate all content */
        while(working_space.firstChild)
        {
            working_space.removeChild(working_space.firstChild);
        }
    }

    display_content(p_content)
    {
        this._clear_content();
        this.add_content(p_content);
    }

    add_content(p_content)
    {
        let working_space = this.getDOM();
        let wrapper = document.createElement("div");
        if (p_content instanceof Element)
        {
            wrapper.append(p_content);
        }
        else
        {
            wrapper.innerHTML = p_content;
        }
        
        working_space.appendChild(wrapper);
    }
}

