export class MenuItem
{
    public cod:number;
    public name:string;
    public tag:string;
    public pathApp:string;
    public pathOption:string;
    public icon:string;
   

    constructor(cod:number, name:string, tag:string, pathApp:string, pathOption:string, icon:string)
    {
        this.cod = cod;
        this.name = name;
        this.tag = tag;
        this.pathApp = pathApp;
        this.pathOption = pathOption;
        this.icon = icon;
    }
}