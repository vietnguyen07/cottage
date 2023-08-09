export function is_json(p_in_str)
{
    try {
        JSON.parse(p_in_str);
        return true;
    }
    catch(err)
    {
        return false;
    }

}