/**
 * @type {String} 
 */
/* An asynchronous HTTP request to fetch the content of a JSON file located at
`window.location.origin + "/interfaces/content_trx.json"`. */
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
    /**
     * The constructor function initializes the properties of an object with default values.
     * @param {String} [prot=GET] - The "prot" parameter is used to specify the HTTP request method. The default
     * value is "GET", but you can pass any valid HTTP method such as "POST", "PUT", "DELETE", etc.
     * @param {String} [locality=true] - The `locality` parameter is a boolean value that determines whether the
     * request should be made to a local resource or a remote resource. If `locality` is set to `true`,
     * the request will be made to a local resource.
     * @param {String} [url=null] - The `url` parameter is used to specify the URL of the resource that the
     * constructor is being called for. It is an optional parameter and can be set to `null` if no URL
     * is provided.
     */
    constructor(prot = "GET", locality=true, url=null){
        super();
        this.prot = prot;
        this.locality = locality;
        this.url = url;
    }
    
    /** 
     * @param {Object} in_data - input data for fetching
     * @returns {JSON} - Return JSON object*/
    get_tx_form(in_data){
        let ret_json = JSON.parse(_platform_formfac_trx_form);
        ret_json["prot"] = this.prot;
        ret_json["locality"] = this.locality;
        ret_json["content"] = in_data;
        ret_json["url"] = this.url;
        return ret_json;
    }
}