
/**
 * text processor for content box
 */
export default class textProcessor
{   
    /**
     * @param {String} p_name 
     */
    constructor(p_name="None")
    {
        this.name = p_name;
        this.dict = new Map(default_text_proc);
    }

    /**
     * @param {String} p_key 
     * @param {String} p_value 
     */
    set_value(p_key, p_value)
    {
        this.dict.set(p_key, p_value)
    }

    /**
     * @param {String} p_key 
     * @returns {String}
     */
    get_value(p_key)
    {
        if (this.dict.has(p_key))
        {
            return this.dict.get(p_key);
        }
        else 
        {
            return null;
        }
    }

    /**
     * @param {Map} p_dict 
     */
    set_dict(p_dict)
    {
        this.dict = Map.create(p_dict);
    }

    /**
     * @returns {Map} 
     */
    get_dict()
    {
        return Map.create(this.dict);
    }

    /**
     * 
     * @param {String} p_in_data 
     */
    parse(p_in_data)
    {
        let in_data_str = String(p_in_data);
        // Replace wanted phrases
        for (let [key, value] of this.dict)
        {
            let searchString = "${" + key + "}";
            in_data_str = in_data_str.replaceAll(searchString, value);
        }
        return in_data_str;
    }
}


var default_text_proc = new Map([
    ["same_dir", "<<same_dir>>"],
    ["lib_path", "https://cdn.jsdelivr.net/gh/vietnguyen07/cottage@latest"],
])