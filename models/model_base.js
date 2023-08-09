export default class ModelBase
{
    constructor(p_name, p_owner)
    {
        this.name = p_name;
        this.owner = p_owner;
        this.registrees = new Map();
    }

    register(subscriber)
    {
        this.registrees.set(subscriber.name, subscriber);
        if("addSubscriber" in subscriber)
        {
            subscriber.addSubscriber(this);
        }
    }

    notify(p_Msg)
    {
        console.log(this.name + " got notification from " + p_Msg.from.name);
        console.log(p_Msg.Msg.constructor.name);
    }
}