import { Injectable, Inject } from '@angular/core';
import { MenuItem } from 'src/app/components/menu/shared/menu-item.model';
import { DOCUMENT } from '@angular/common';
import { AppService } from 'src/app/app.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

declare const APP_EVENT_BUS;

@Injectable()
export class LoadAppService {

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private appService: AppService,
        private httpClient: HttpClient) { }

    private configAppCurrent:any;
    /**
     * Inclui a nova app a ser rederizada na pagina.
     * 
     * @param itemMenu 
     */     
    public loadApp(itemMenu: MenuItem) {
        if(this.configAppCurrent){
            this.unloadApp();
        }
        if (itemMenu)
        {
            this.findConfigApp(itemMenu.pathApp)
                .subscribe(configApp => {
                    this.configAppCurrent = configApp;
                    /* this.loadTag(itemMenu.tag);
                    this.loadScriptsShared();
                    this.loadScripts(configApp.tagName, itemMenu.pathApp, configApp.scripts); */
                    this.loadTag(itemMenu.pathApp);
                })
        }
    }

     /**
      * Inclui a tag do custom element da funcionalidade dentro da div container da
      * página.
      * 
      * @param tag 
      */
     private loadTag(pathApp: string)
     {
        if(this.configAppCurrent.tag)
        {
            const idContainer = this.appService.idContainer;
            const container = this.document.getElementById(idContainer);
            //container.innerHTML = this.configAppCurrent.tag;
            var el = this.document.createElement(this.configAppCurrent.tagName);
            var shadowDOM = container.attachShadow({mode: 'open'});
            shadowDOM.appendChild(el);
            var elementScript = this.document.createElement("script");
            elementScript.src = "https://cdnjs.cloudflare.com/ajax/libs/zone.js/0.9.1/zone.min.js";
            shadowDOM.appendChild(elementScript);
            for (const script of this.configAppCurrent.scripts)
            {
                const elementScript = this.document.createElement("script");
                elementScript.src = pathApp + "/" + script;
                shadowDOM.appendChild(elementScript);
            }
        }
    }


    /**
     * Verifica se a tag que envolve os scripts já esta no DOM,
     * caso não esteja cria uma tag span e inclui as tags scripts
     * e adiciona ao header da pagina.
     * 
     * @param scripts 
     */
    private loadScripts(tagName: string, pathApp:string, scripts: Array<string>) 
    {
        
        if (scripts && scripts.length)
        {
            const idSpanContainerScript = "id" + tagName;

            const spanContainerLoaderd = this.document.getElementById(idSpanContainerScript);

            if (!spanContainerLoaderd)
            {
                const spanContainerScript = this.document.createElement("span");
                for (const script of scripts)
                {
                    spanContainerScript.id = "id" + tagName;

                    const elementScript = this.document.createElement("script");

                    elementScript.src = pathApp + "/" + script;
                    //elementScript.src =  script;
                    spanContainerScript.appendChild(elementScript);
                }

                /**
                 * TODO - INCLUIR NO HEAD NÃO É LEGAL, COLOCAR NO BODY
                 */
                const header = this.document.getElementsByTagName("head")[0];
                header.appendChild(spanContainerScript);
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


    private addlistener() 
    {
        const appSeguros = this.document.getElementsByTagName("app-seguros")[0];

        appSeguros.addEventListener('emitTypeSeguro', event => {
            console.log(event);
        })
    }


    public unloadApp()
    {
        const elementApp = this.document.getElementsByTagName(this.configAppCurrent.tagName);

        if(elementApp && elementApp.length)
        {
            elementApp[0].remove();
        }
       
    }
}