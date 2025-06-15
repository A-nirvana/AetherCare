"use client";

import { useEffect } from "react";

const BotpressChat = () => {
  useEffect(() => {
    const injectBotpress = async () => {
      // Inject inject.js
      const injectScript = document.createElement("script");
      injectScript.src = "https://cdn.botpress.cloud/webchat/v3.0/inject.js";
      injectScript.async = true;
      document.body.appendChild(injectScript);

      injectScript.onload = () => {
        // Inject config script
        const configScript = document.createElement("script");
        configScript.src = "https://files.bpcontent.cloud/2025/06/10/17/20250610174140-OS6LWDWK.js";
        configScript.async = true;
        document.body.appendChild(configScript);

        configScript.onload = () => {
          // Wait for launcher to appear
          const tryAttachTooltip = setInterval(() => {
            const launcher = document.querySelector('#bp-web-widget-launcher');
            if (launcher) {
              clearInterval(tryAttachTooltip);

              // Check if tooltip already exists
              if (document.querySelector('#bp-tooltip')) return;

              // Create tooltip div
              const tooltip = document.createElement('div');
              tooltip.id = 'bp-tooltip';
              tooltip.innerText = 'Click to clear your query type';
              tooltip.style.position = 'fixed';
              tooltip.style.bottom = '80px'; // Adjust to position above chat icon
              tooltip.style.right = '30px';
              tooltip.style.background = 'black';
              tooltip.style.color = 'white';
              tooltip.style.padding = '6px 12px';
              tooltip.style.borderRadius = '8px';
              tooltip.style.fontSize = '13px';
              tooltip.style.zIndex = '9999';
              tooltip.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
              tooltip.style.transition = 'opacity 0.3s ease';

              document.body.appendChild(tooltip);

              // Auto-remove after 5 seconds
              setTimeout(() => {
                tooltip.style.opacity = '0';
                setTimeout(() => tooltip.remove(), 300);
              }, 5000);
            }
          }, 500);
        };
      };
    };

    injectBotpress();

    return () => {
      document.querySelectorAll("script[src*='botpress']").forEach((s) => s.remove());
      const container = document.querySelector("#bp-web-widget-container");
      if (container) container.remove();
      const tooltip = document.querySelector("#bp-tooltip");
      if (tooltip) tooltip.remove();
    };
  }, []);

  return null;
};

export default BotpressChat;
