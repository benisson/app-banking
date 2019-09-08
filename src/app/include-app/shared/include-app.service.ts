import { Injectable, Inject } from '@angular/core';
import { MenuItem } from 'src/app/components/menu/shared/menu-item.model';
import { DOCUMENT } from '@angular/common';
import { AppService } from 'src/app/app.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class IncludeAppService {

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private appService: AppService,
        private httpClient: HttpClient) { }

    /**
     * Inclui a nova app a ser rederizada na pagina.
     * 
     * @param itemMenu 
     */     
    public includeApp(itemMenu: MenuItem) {
        if (itemMenu)
        {
           
            this.findConfigApp(itemMenu.pathApp)
                .subscribe(configApp => {

                    this.includeTag(configApp.tag);
                    this.includeScriptsShared();
                    this.includeScripts(configApp.tagName, configApp.scripts);
                })

        }
    }

     /**
      * Inclui a tag do custom element da funcionalidade dentro da div container da
      * página.
      * 
      * @param tag 
      */
     private includeTag(tag:string)
     {
        if(tag)
        {
            const idContainer = this.appService.idContainer;
            const container = this.document.getElementById(idContainer);

            container.innerHTML = tag;
        }
     }


    /**
     * Verifica se a tag que envolve os scripts já esta no DOM,
     * caso não esteja cria uma tag span e inclui as tags scripts
     * e adiciona ao header da pagina.
     * 
     * @param scripts 
     */
    private includeScripts(tagName: string, scripts: Array<string>) 
    {
    
        if (scripts && scripts.length)
        {
            const idSpanContainerScript = "id" + tagName;

            const spanContainerIncluded = this.document.getElementById(idSpanContainerScript);

            if (!spanContainerIncluded)
            {
                const spanContainerScript = this.document.createElement("span");

                for (const script of scripts)
                {
                    spanContainerScript.id = "id" + tagName;

                    const elementScript = this.document.createElement("script");
                    elementScript.src = script;
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

    private includeScriptsShared() 
    {
    
        const idSpanSharedScript = "idSharedScript";
        const spanContainerIncluded = this.document.getElementById(idSpanSharedScript);

        if (!spanContainerIncluded)
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
    private findConfigApp(pathApp: string): Observable<any> {
        return this.httpClient.get("assets/config-app.json");
        //return this.httpClient.get(pathApp + "/configApp.json");
    }


    Addlistener() {
        const appSeguros = this.document.getElementsByTagName("app-seguros")[0];

        appSeguros.addEventListener('emitTypeSeguro', event => {
            console.log(event);
        })
    }

}