/**
 * @type {String} 
 */
const _platform_formfac_trx_form = await fetch(window.location.origin + "/interfaces/content_trx.json").
    then(response => {
            if (response.ok){
                return response.text();
            };
            throw new Error(response.statusText);
    }).
    then(txt => {
            return txt;
    }).
    catch(err => {throw new Error(err)});

export default class FormFactory extends Object {
    constructor(prot = "GET", locality=true, url=null){
        super();
        this.prot = prot;
        this.locality = locality;
        this.url = url;
    }
    
    /** 
     * @param {Object} in_data - input data for fetching
     * @returns {Object} - Return JSON object*/
    get_tx_form(in_data){
        let ret_json = JSON.parse(_platform_formfac_trx_form);
        ret_json["prot"] = this.prot;
        ret_json["locality"] = this.locality;
        ret_json["content"] = in_data;
        ret_json["url"] = this.url;
        return ret_json;
    }
}