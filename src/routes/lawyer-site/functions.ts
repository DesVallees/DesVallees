export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function camelCaseToSpaced(camel: string): string {
    return camel.replace(/([a-z])([A-Z])/g, '$1 $2')
                .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
                .replace(/^./, str => str.toUpperCase());
}

export function capitalizeWords(str: string) {
    return str.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

export function shortenString(text: string): string {
    // Remove HTML tags from the text
    const cleanedText = text.replace(/(<([^>]+)>)/gi, ' ');

    const words = cleanedText.split(' ');
    const shortenedWords = words.slice(0, 30);
    const shortenedText = shortenedWords.join(' ');

    if (words.length > shortenedWords.length) {
        return shortenedText + '...';
    }

    return shortenedText;
}

export function convertDataUrlToUrl(dataUrl: string): string {
    const byteString = window.atob(dataUrl.split(',')[1]);
    const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeString });

    return URL.createObjectURL(blob);
}

export function autoResizeTextarea(element: HTMLTextAreaElement): void {
    const minHeight = element.offsetHeight;

    const paddingTop = parseInt(window.getComputedStyle(element, null).getPropertyValue("padding-top"));
    const paddingRight = parseInt(window.getComputedStyle(element, null).getPropertyValue("padding-right"));
    const paddingBottom = parseInt(window.getComputedStyle(element, null).getPropertyValue("padding-bottom"));
    const paddingLeft = parseInt(window.getComputedStyle(element, null).getPropertyValue("padding-left"));
    const border = parseInt(window.getComputedStyle(element, null).getPropertyValue("border"));

    const resize = () => {
        const oldHeight = element.style.height;
        element.style.height = "auto";
        const newHeight = element.scrollHeight - border;
        element.style.height = Math.max(minHeight, newHeight) + "px";
        if (oldHeight !== element.style.height) {
            resize();
        }
    };

    element.addEventListener("input", resize);
    element.addEventListener("focus", resize);
    element.addEventListener("blur", resize);
    window.addEventListener("resize", resize);

    element.style.overflow = "hidden";
    element.style.boxSizing = "border-box";
    element.style.padding = `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`;

    resize();
}

export function throttle(func: () => void, limit: number): () => void {
    let lastCallTime = 0;
    return function() {
        const now = Date.now();
        if (now - lastCallTime >= limit) {
            func();
            lastCallTime = now;
        }
    }
}

export function letterToAvatarUrl(letter: string): string {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = 100;
    canvas.height = 100;

    if (!context) {
        return ''
    }

    context.fillStyle = '#D44508';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = 'bold 50px Outfit';
    context.fillStyle = '#F7F7FF';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(letter.toUpperCase(), canvas.width / 2, canvas.height / 2);

    const imageDataUrl = canvas.toDataURL();

    return imageDataUrl;

}

export function isGeneratedAvatarUrl(url: string): boolean {
    const prefix = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA';
    return url.startsWith(prefix);
}

export function isGeneratedBlobUrl(url: string): boolean {
    const prefix = 'blob:';
    return url.startsWith(prefix);
}

export function escapeHTML(input: string): string {
    const entityMap: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;'
    };
  
    return input.replace(/[&<>"'`=\/]/g, (s) => entityMap[s]);
}

import type { Action } from "svelte/action";

interface Attributes {
    "on:outside"? : (event: CustomEvent) => void
}

type ClickOutside = Action<HTMLElement, any, Attributes>

export const clickOutside: ClickOutside = (element) => {
    function handleClick(event: MouseEvent) {
        const targetElement = event.target as HTMLElement;

        if (element && !element.contains(targetElement)) {
            const clickOutsideEvent = new CustomEvent('outside');
            element.dispatchEvent(clickOutsideEvent);
        }
    }

    document.addEventListener("click", handleClick, true);

    return {
        destroy() {
            document.removeEventListener("click", handleClick, true);
        }
    }
}

export const clickOutsideOrChild: ClickOutside = (element) => {
    function handleClick(event: MouseEvent) {
        const targetElement = event.target as HTMLElement;

        if (element && element !== targetElement) {
            const clickOutsideEvent = new CustomEvent('outside');
            element.dispatchEvent(clickOutsideEvent);
        }
    }

    document.addEventListener("click", handleClick, true);

    return {
        destroy() {
            document.removeEventListener("click", handleClick, true);
        }
    }
}