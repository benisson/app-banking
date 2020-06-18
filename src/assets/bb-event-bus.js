/**
 * Simples barramento de eventos baseado em publish/subscribe, utilizando
 * postMessage. 
 */

BBEventBus = {};

/**
 *  Publicar eventos
 */
BBEventBus.publish = function (event) {

    const SENT_FROM = "PUBLISH >>> Enviado de ";
    const SAME_ORIGIN = "/";

    if (event && event.eventName && event.eventData)
    {
        /**
         * Verifica se é a janela principal (app container)
         */
        BBEventBus.sendLog(SENT_FROM + window.document.URL);
        window.postMessage(event, SAME_ORIGIN);

        if (window.self !== window.parent)
        {
            BBEventBus.sendLog(SENT_FROM + window.parent.document.URL);
            window.parent.postMessage(event, SAME_ORIGIN);
        }

        if (window.parent !== window.top)
        {
            BBEventBus.sendLog(SENT_FROM + window.top.document.URL);
            window.top.postMessage(event, SAME_ORIGIN);
        }
    }
}



BBEventBus.sendLog = function (message, object) {

    const enableLog = _getEnableLog();

    function _getEnableLog() {
        try
        {
            const enableLog = sessionStorage.getItem("enable-log-eventbus");
            return enableLog;
        }
        catch (e)
        {
            return false;
        }
    }


    if (enableLog == true || enableLog == 'true' &&
        message)
    {
        if (object)
        {
            console.info("BBEventBus - " + message, object);
        }
        else
        {
            console.info("BBEventBus - " + message);
        }

    }
}

/**
 * Inscrição em um evento do barramento
 */
BBEventBus.subscribe = function (eventName, functionCallBack) {
    if (eventName)
    {
        window.addEventListener("message", receiveMessage, false);

        function receiveMessage(event) {
            if (event &&
                event.data.eventData &&
                event.data.eventName == eventName)
            {
                if (event.currentTarget && event.currentTarget.location
                    && event.currentTarget.location.href)
                {
                    BBEventBus.sendLog("SUBSCRIBE <<< Recebidos de  " + event.currentTarget.location.href, event.data.eventData);
                }
                functionCallBack(event.data.eventData);
            }
        }
    }
}