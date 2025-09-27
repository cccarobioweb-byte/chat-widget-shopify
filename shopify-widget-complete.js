// Shopify Chat Widget - Versión Simple
// Abre el chat web en una nueva pestaña

(function() {
    'use strict';

    // CSS del widget
    const widgetCSS = `
        .chat-widget-simple {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .chat-toggle-simple {
            width: 60px;
            height: 60px;
            background: #007bff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
            transition: all 0.3s ease;
            color: white;
            border: none;
            outline: none;
        }

        .chat-toggle-simple:hover {
            background: #0056b3;
            transform: scale(1.05);
        }

        .chat-toggle-simple:active {
            transform: scale(0.95);
        }

        .chat-toggle-simple svg {
            width: 24px;
            height: 24px;
        }

        @media (max-width: 480px) {
            .chat-widget-simple {
                bottom: 15px;
                right: 15px;
            }
            
            .chat-toggle-simple {
                width: 50px;
                height: 50px;
            }
            
            .chat-toggle-simple svg {
                width: 20px;
                height: 20px;
            }
        }
    `;

    // Configuración del widget
    const CONFIG = {
        chatUrl: window.CHAT_WIDGET_CONFIG?.chatUrl || 'https://bot-bioweb.vercel.app/',
        position: 'bottom-right',
        showOnPages: ['all'],
        hideOnPages: [],
        delay: 3000,
        autoOpen: false
    };

    // Verificar si estamos en una página donde mostrar el widget
    function shouldShowWidget() {
        const currentPage = getCurrentPageType();
        
        if (CONFIG.hideOnPages.includes(currentPage)) {
            return false;
        }
        
        if (CONFIG.showOnPages.includes('all')) {
            return true;
        }
        
        return CONFIG.showOnPages.includes(currentPage);
    }

    // Obtener tipo de página actual
    function getCurrentPageType() {
        if (window.location.pathname === '/') return 'home';
        if (window.location.pathname.includes('/products/')) return 'product';
        if (window.location.pathname.includes('/collections/')) return 'collection';
        if (window.location.pathname === '/cart') return 'cart';
        if (window.location.pathname.includes('/checkout')) return 'checkout';
        return 'other';
    }

    // Crear HTML del widget
    function createWidgetHTML() {
        const position = CONFIG.position === 'bottom-left' ? 'left: 20px; right: auto;' : 'right: 20px; left: auto;';
        
        return `
            <div id="chat-widget-simple" class="chat-widget-simple" style="${position}">
                <button id="chat-toggle-simple" class="chat-toggle-simple" title="Abrir chat de soporte">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z" fill="currentColor"/>
                        <path d="M7 9H17V11H7V9ZM7 12H15V14H7V12Z" fill="currentColor"/>
                    </svg>
                </button>
            </div>
        `;
    }

    // Abrir chat en nueva pestaña
    function openChat() {
        const chatWindow = window.open(
            CONFIG.chatUrl,
            'chat-window',
            'width=800,height=600,scrollbars=yes,resizable=yes,menubar=no,toolbar=no,location=no,status=no'
        );
        
        // Enfocar la nueva ventana
        if (chatWindow) {
            chatWindow.focus();
        }
    }

    // Inicializar widget
    function initWidget() {
        if (!shouldShowWidget()) {
            return;
        }

        // Agregar CSS
        const style = document.createElement('style');
        style.textContent = widgetCSS;
        document.head.appendChild(style);

        // Agregar HTML del widget
        document.body.insertAdjacentHTML('beforeend', createWidgetHTML());
        
        // Configurar evento de clic
        const toggle = document.getElementById('chat-toggle-simple');
        toggle.addEventListener('click', openChat);
        
        // Auto-abrir si está configurado
        if (CONFIG.autoOpen) {
            setTimeout(() => {
                openChat();
            }, CONFIG.delay);
        }
    }

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }

    // Funciones globales para control externo
    window.openChatWidget = function() {
        openChat();
    };

    window.closeChatWidget = function() {
        // No hay nada que cerrar en esta versión simple
        console.log('Chat widget simple - no hay ventana que cerrar');
    };

})();
