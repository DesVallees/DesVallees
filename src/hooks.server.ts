import type { Handle } from "@sveltejs/kit";

function mapLanguageToCode(language: string | undefined): string | undefined {
    if (!language) {
        return undefined
    }
    
    const languageMappings: Record<string, string> = {
      'français': 'fr',
      'español': 'es',
      'italiano': 'it',
      'english': 'en',
      'Русский': 'ru',
      'deutsch': 'de',
    };
  
    return languageMappings[language];
  }

export const handle = (async ({ event, resolve }) => {
    let lang = mapLanguageToCode(event.cookies.get('lang')) || 'en';

    return resolve(event, {
        transformPageChunk: ({ html }) => html.replace('%lang%', lang),
    });

}) satisfies Handle;