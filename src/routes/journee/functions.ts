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

    const resize = () => {
        element.style.height = "auto";
        const newHeight = element.scrollHeight;
        element.style.height = Math.max(minHeight, newHeight) + "px";
    };

    // Event listeners for input, focus, and window resize
    element.addEventListener("input", resize);
    element.addEventListener("focus", resize);
    window.addEventListener("resize", resize);

    // Initial setup
    element.style.overflow = "hidden";
    element.style.boxSizing = "border-box";

    // Call resize initially and after the textarea is rendered
    setTimeout(resize, 0);
}

export function throttle(func: () => void, limit: number): () => void {
    let lastCallTime = 0;
    return function () {
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
        '/': '&#47;',
        '`': '&#x60;',
        '=': '&#x3D;',
        ":": '&#x3A;',
        '?': '&#x3F;',
        '#': '&#x23;',
    };

    return input.replace(/[&<>"'\/`=:?#]/g, (s) => entityMap[s]);
}

export function unescapeHTML(input: string): string {
    const entityMap: { [key: string]: string } = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'",
        '&#47;': '/',
        '&#x60;': '`',
        '&#x3D;': '=',
        '&#x3A;': ":",
        '&#x3F;': '?',
        '&#x23;': '#',
    };

    // Create a regular expression to find all the HTML entities in the input string.
    const entityRegex = /&amp;|&lt;|&gt;|&quot;|&#39;|&#47;|&#x60;|&#x3D|&#x3A;|&#x3F;|&#x23;/g;

    return input.replace(entityRegex, (s) => entityMap[s]);
}

// Linkify URLs
export function linkify(text: string): string {
    const protocolUrlPattern = /((?:https?&#x3A;&#47;&#47;|ftp&#x3A;&#47;&#47;|@)(?:www\.)?(?:(?:[^\u0000-\u007F]|[A-Z0-9.-]){2,})(?:\.[A-Z]{2,}|&#x3A;[0-9]{2,5}|\.[0-9]{1,3})(?:&#47;(?:[^\u0000-\u007F]|[A-Z0-9\.\-\;\,\$\+~_@%]|&amp;|&#47;|&#x3D|&#x3A;|&#x3F;|&#x23;)*)?)/ig;
    const noProtocolUrlPattern = /((?:https?&#x3A;&#47;&#47;|ftp&#x3A;&#47;&#47;|@)?(?:www\.)?(?:(?:[^\u0000-\u007F]|[A-Z0-9.-]){2,})(?:\.(?:com|org|net|edu|gov|mil|io|co|us|uk|ca|de|es|it|fr|ru|jp|me|store|biz|info|name|tv|app|ai|gg|xyz|site|ly))\b(?:&#47;(?:[^\u0000-\u007F]|[A-Z0-9\.\-\;\,\$\+~_@%]|&amp;|&#47;|&#x3D|&#x3A;|&#x3F;|&#x23;)*)?)/ig;
    const emailPattern = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;

    // Replace URLs that have protocol so extension can be flexible
    text = text.replace(protocolUrlPattern, (match) => {
        // Do not change email addresses
        if (match.includes("@")) return match;

        return `<a style="text-decoration: underline; color: var(--complementary); ${match.length > 40 ? "word-break: break-all;" : ""};" href="${match}" target="_blank">${match}</a>`;
    });

    // Replace URLs that do not have protocol so extension is strict
    text = text.replace(noProtocolUrlPattern, (match) => {
        // Do not change email addresses or URLs that contain "://" (protocols), because they've already been changed
        if (match.includes("@") || match.includes("&#x3A;&#47;&#47;")) return match;

        // Prepend match with "https://"
        const href = 'https://' + match;

        return `<a style="text-decoration: underline; color: var(--complementary); ${match.length > 40 ? "word-break: break-all;" : ""};" href="${href}" target="_blank">${match}</a>`;
    });

    // Replace email addresses
    text = text.replace(emailPattern, (match) => {
        return `<a style="text-decoration: underline; color: var(--complementary); ${match.length > 40 ? "word-break: break-all;" : ""};" href="mailto:${match}">${match}</a>`
    });

    return text;
}


// Markdown conversion
export function convertMarkdown(text: string): string {
    const boldPattern = /\*(.*?)\*/g; // *text*
    const italicPattern = /\_(.*?)\_/g; // _text_
    const crossedPattern = /\~(.*?)\~/g; // ~text~
    const monospacePattern = /&#x60;&#x60;&#x60;(?:<br>)?([\s\S]*?)&#x60;&#x60;&#x60;/g; // ```text```
    const unorderedListPattern = /(&nbsp;)*(?:-\s)(.*?)(?:<br>|$)/gm; // - text
    const orderedListPattern = /(&nbsp;)*(\d(?:\.|\))\s)(.*?)(?:<br>|$)/gm; // 1. text
    const subtitlePattern = /(^|<br>)(?:&#x23;\s)(.*?)(?:<br>|$)/gm; // # text

    // Placeholders for pre and a tags content
    const prePlaceholder = 'pasc00991j9a9d8cu8hlcaicbb';
    const aPlaceholder = 'ja7dc9120ksa0123oajx8123';
    let preContents: string[] = [];
    let aContents: string[] = [];

    text = text.replace(monospacePattern, '<pre>$1</pre>');

    // Replace content inside pre tags with placeholders
    text = text.replace(/<pre>([\s\S]*?)<\/pre><br>/g, (match, preContent) => {
        preContents.push(preContent);
        return match.replace(preContent, prePlaceholder).replace("<br>", "");
    });

    // Replace content inside a tags with placeholders
    text = text.replace(/<a [^>]*>(.*?)<\/a>/g, (match, linkContent) => {
        aContents.push(linkContent);
        return match.replace(linkContent, aPlaceholder);
    });

    // Perform markdown conversion
    text = text.replace(boldPattern, '<strong>$1</strong>')
        .replace(italicPattern, '<em>$1</em>')
        .replace(crossedPattern, '<s>$1</s>')
        .replace(unorderedListPattern, (match, nbspSequence, content) => {
            const nbspCount = ((match || "").match(/&nbsp;/g) || []).length;
            return `<ul><li style="margin-left: ${nbspCount}ch;">${content}</li></ul>`;
        })
        .replace(orderedListPattern, (match, nbspSequence, listNumber, content) => {
            const nbspCount = ((match || "").match(/&nbsp;/g) || []).length;
            return `<ol><li style="position: relative; margin-left: ${nbspCount}ch;"><span style="position: absolute; left: -2ch; top: 0;">${listNumber}</span>${content}</li></ol>`
        })
        .replace(subtitlePattern, '$1<h2>$2</h2>')

    // Merge consecutive <ul> or <ol> tags
    text = text.replace(/<\/ul>\s*<ul>/g, '').replace(/<\/ol>\s*<ol>/g, '');

    // Restore content inside pre tags
    text = text.replace(new RegExp(prePlaceholder, 'g'), () => preContents.shift() || '');

    // Restore content inside a tags
    text = text.replace(new RegExp(aPlaceholder, 'g'), () => aContents.shift() || '');

    return text;
}


// Convert newlines to <br>
export function convertNewlines(text: string): string {
    return text.replace(/\n/g, '<br>');
}

// Preserve spaces at the begging of lines
function preserveLeadingSpaces(text: string): string {
    return text.replace(/^[\s\t]+/gm, (match) => {
        return match.replace(/ /g, '&nbsp;').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
    });
}

export function escapeAndFormat(text: string): string {
    const escapedText = escapeHTML(text);
    const linkifiedText = linkify(escapedText);
    const spacedText = preserveLeadingSpaces(linkifiedText);
    const newLinesText = convertNewlines(spacedText);
    return convertMarkdown(newLinesText);
}

import toast from "svelte-french-toast";
import { dictionary } from "./stores"
import { get } from 'svelte/store';
let storedDictionary = get(dictionary);
export function anErrorOccurred(error: string = storedDictionary.errorOccurred) {
    toast.error(error, { position: 'bottom-center' });
}