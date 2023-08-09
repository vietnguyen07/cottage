export default class menu_actions_root
{
    constructor(){}

    // Action functions
    call_action = (...args)=>{
        let op_code = args[0]["op"];
        let parameters = args[0]["inner"];
        let menu_value = args[1];
        let result = null;

        let action_name = String(op_code) + '_action';
        
        if (action_name in this)
        {
            this[action_name] = this[action_name].bind(this);
            result = this[action_name](parameters, menu_value);
        }
        else
        {
            console.error(`Cannot find needed action ${action_name}`);
        }
        return result;
    }

    func_action(...args){
        let command_parts = args[0].split(";");
        let function_name = command_parts[0];
        let function_args = command_parts.slice(1);
        alert("root actiion");

        return document.createElement("div");
    }

    link_action(...args){
        let command_parts = args[0].split(";");
        let link_name = command_parts[0];
        let link_address = args[1];
        let wrap = document.createElement("div");
        wrap.innerText = link_name;
        wrap.addEventListener("click", ()=>{
            Object.assign(document.createElement('a'), {
            target: '_blank',
            rel: 'noopener noreferrer',
            href: link_address,
          }).click();})
        console.log(wrap);
        let full_row = wrap;
        return full_row;
    }
}

