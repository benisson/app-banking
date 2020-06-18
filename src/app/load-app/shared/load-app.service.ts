import { Injectable, Inject } from '@angular/core';
import { MenuItem } from 'src/app/components/menu/shared/menu-item.model';
import { DOCUMENT } from '@angular/common';
import { AppService } from 'src/app/app.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

//TO DO: Retirar caso não haja uso
declare const APP_EVENT_BUS;

@Injectable()
export class LoadAppService {

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private appService: AppService,
        private httpClient: HttpClient) { }

    private configAppCurrent:any;
    //Elemento usado para incluir outros componentes
    private elementContainer: any;
    //Elemento usado quando utilizar shadowDOM
    private shadowDOM:any;
    /**
     * Inclui a nova app a ser rederizada na pagina.
     * 
     * @param itemMenu 
     */     
    public loadApp(itemMenu: MenuItem) {
        if (itemMenu)
        {
            this.findConfigApp(itemMenu.pathApp)
                .subscribe(configApp => {
                    this.configAppCurrent = configApp;
                    /* this.loadTag(itemMenu.tag);
                    this.loadScriptsShared();
                    this.loadScripts(configApp.tagName, itemMenu.pathApp, configApp.scripts); */
                    this.loadScripts(itemMenu.pathApp)
                    this.loadTag();
                })
        }
    }

     /**
      * Inclui a tag do custom element da funcionalidade dentro da div container da
      * página.
      * 
      * @param tag 
      */
     private loadTag()
     {
        if(this.configAppCurrent.tag)
        {
            //Cria o custom element da app
            const elementApp = this.document.createElement(this.configAppCurrent.tagName); 
            this.configAppCurrent.shadowDOM ? this.shadowDOM.appendChild(elementApp) : this.elementContainer.appendChild(elementApp);
        }
    }
    /**
     * Verifica os scripts e estilos que o componente possui
     * e adiciona os elementos no nó de criação do mesmo
     * 
     * @param pathApp
     */
    private loadScripts(pathApp:string) 
    {
        //Seleciona o nó onde será inserido o elemento
        this.elementContainer = this.document.getElementById(this.appService.idContainer);
        //Verifica se o elemento deve ser criado dentro de um shadowDOM
        if(this.configAppCurrent.shadowDOM){
            this.shadowDOM = this.elementContainer.attachShadow({mode: this.configAppCurrent.shadowDOM});
        }
        for (const script of this.configAppCurrent.scripts)
        {
            if(script.includes('.css')){
                const styleEl = document.createElement('link');
                styleEl.rel = 'stylesheet';
                styleEl.href = pathApp + '/' + script;
                this.configAppCurrent.shadowDOM ? this.shadowDOM.appendChild( styleEl ): this.elementContainer.appendChild( styleEl );
              } else if (script.includes('.js')){
                const scriptEl = document.createElement('script');
                scriptEl.src =  pathApp + "/" + script
                this.configAppCurrent.shadowDOM ? this.shadowDOM.appendChild(scriptEl): this.elementContainer.appendChild( scriptEl );  
              }
        }
    }

    private loadScriptsShared() 
    {
    
        const idSpanSharedScript = "idSharedScript";
        const spanContainerLoaderd = this.document.getElementById(idSpanSharedScript);

        if (!spanContainerLoaderd)
        {
            const elementScript = this.document.createElement("script");
            elementScript.src = "https://cdnjs.cloudflare.com/ajax/libs/zone.js/0.9.1/zone.min.js";

            const spanSharedScript = this.document.createElement("span");
            spanSharedScript.id = idSpanSharedScript;
            spanSharedScript.appendChild(elementScript);

            const header = this.document.getElementsByTagName("head")[0];
            header.appendChild(spanSharedScript);
        }

    }

    /**
     * Busca as configurações da app a ser carregada.
     * 
     * 
     * @param pathApp 
     */
    private findConfigApp(pathApp: string): Observable<any> 
    {
        //return this.httpClient.get("/config-app.json");
        return this.httpClient.get(pathApp + "/config-app.json");
    }

    //TO DO: Necessário? 
   /*  private addlistener() 
    {
        const appSeguros = this.document.getElementsByTagName("app-seguros")[0];

        appSeguros.addEventListener('emitTypeSeguro', event => {
            console.log(event);
        })
    } */


    public unloadApp()
    {
        const elementApp = this.document.getElementsByTagName(this.configAppCurrent.tagName);
        if(elementApp && elementApp.length)
        {
            elementApp[0].remove();
        }
       
    }
}