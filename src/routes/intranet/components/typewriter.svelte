<script lang="ts">
	import { onMount } from "svelte";
	import { language } from "../stores";
	import { fade } from "svelte/transition";
	import { sleep } from "../functions";

    export let style:string = "";
    export let basePhrase:string = "";
    export let phrase:string | string[];
    export let typingSpeed:number = 100;
    export let delay:number = 0;
    export let duration:number = 0;
    
    let typedChar: string = ""

    $: $language, typedChar = '';
    
    const typeChar = async () => {
        for (let i = 0; i < phrase.length; i++) {
            typedChar += phrase[i];
            await sleep(typingSpeed)
        }
    }

    const typePhrases = async () => {
        while (true) {
            for (let i = 0; i < phrase.length; i++) {
                const element = phrase[i];
                
                for (let e = 0; e < element.length; e++) {
                    if (e !== 0 && !typedChar) {
                        break;
                    }
                    typedChar += element[e];
                    await sleep (typingSpeed)
                }

                if (typedChar !== element) {
                    continue;
                }

                await sleep(3000)
                
                for (let e = 0; e < element.length; e++) {
                    typedChar = typedChar.slice(0, -1);
                    await sleep(20)
                }

                await sleep(1000)
            }
        }
    }

    async function type () { 
        await sleep(delay * 2)
        if (typeof phrase === 'string') {
            typeChar(); 
        } else if (typeof phrase === 'object') {
            typePhrases();
        }
    }

    onMount(() => {
        type()
    })
</script>

<p in:fade|global={{delay: delay, duration: duration}} style={style}>{basePhrase + typedChar}</p>