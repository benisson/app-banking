export class MenuItem
{
    public cod:number;
    public name:string;
    public tagName:string
    public pathApp:string;
    public pathOption:string;
   

    constructor(cod:number, name:string, tagName:string, pathApp:string, pathOption:string)
    {
        this.cod = cod;
        this.name = name;
        this.tagName = tagName;
        this.pathApp = pathApp;
        this.pathOption = pathOption;
    }
}