<script lang="ts">
	import { fade, slide } from "svelte/transition";
    import { dictionary, language, sleep } from "../stores";
	import Avatar from "./avatar.svelte";
	import { profileDB } from "../futureDB";
	import type { Profile as ProfileType } from "../stores";


    type ShowMore = 'unnecessary' | 'needed' | 'used'

    export let id:number;
    export let userId:string;
    export let date:string;
    export let content:string;
    export let img:string = "";
    export let likes:number = 0;
    export let comments:number = 0;
    
    export let originalPost:boolean = false;
    

    const user = profileDB.find((user:ProfileType) => user.id === userId)
    
    let profilePicture:string | undefined = user?.profilePicture;
    let name:string = user?.fullName || $dictionary.unknown;

    let liked:boolean = false;
    let replying:boolean = false;
    let showMore:ShowMore = 'unnecessary';

    let shownContent:string = shortenString(content);

    let postDiv:HTMLDivElement;


    function getTimePassed(dateString: string) {
        const now = new Date();
        const date = new Date(dateString);
        const diff = now.getTime() - date.getTime();

        const minute = 60 * 1000;
        const hour = 60 * minute;
        const day = 24 * hour;
        const month = 30 * day;
        const year = 12 * month;

        if (diff < minute) {
            return $dictionary.justPublished;
        } else if (diff < hour) {
            const minutes = Math.floor(diff / minute);
            return `${$dictionary.hace} ${minutes} ${$dictionary.minute}${minutes > 1 ? "s" : ""} ${$dictionary.ago}`;
        } else if (diff < day) {
            const hours = Math.floor(diff / hour);
            const minutes = Math.floor((diff % hour) / minute);
            return `${$dictionary.hace} ${hours} ${$dictionary.hour}${hours > 1 ? "s" : ""} ${$dictionary.and} ${minutes} ${$dictionary.minute}${minutes > 1 ? "s" : ""} ${$dictionary.ago}`;
        } else if (diff < month) {
            const days = Math.floor(diff / day);
            return `${$dictionary.hace} ${days} ${$dictionary.day}${days > 1 ? "s" : ""} ${$dictionary.ago}`;
        } else if (diff < year) {
            const months = Math.floor(diff / month);
            return `${$dictionary.hace} ${months} ${months > 1 ? $dictionary.months : $dictionary.month} ${$dictionary.ago}`;
        } else {
            const years = Math.floor(diff / year);
            return `${$dictionary.hace} ${years} ${$dictionary.year}${years > 1 ? "s" : ""} ${$dictionary.ago}`;
        }
    }

    function shortenString(text: string): string {
        const words = text.split(' ');
        const shortenedWords = words.slice(0, 30);
        const shortenedText = shortenedWords.join(' ');
        if (words.length > shortenedWords.length) {
            showMore = 'needed'
            return shortenedText + '...';
        }
        return checkLinks(shortenedText);
    }


    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const wwwRegex = /(www\.[^\s]+)/g;
    function checkLinks(text: string): string {
        return text.replace(urlRegex, '<a style="text-decoration: underline; color: rgb(45, 86, 223);" href="$&" target="_blank">$&</a>').replace(wwwRegex, ' <a style="text-decoration: underline; color: rgb(45, 86, 223);" href="http://$&" target="_blank">$&</a>');
    }



</script>


<div class="post" bind:this={postDiv}>
    <div class="avatar">
        <Avatar href="/intranet/profile/{userId}" ariaLabel={$dictionary.seeProfile} image={profilePicture} width="70%" style="aspect-ratio: 1 / 1; height: fit-content;" />
    </div>
    <div class="content">
        <header>
            <h3>{name}</h3>
            {#key $language}
                <span>{getTimePassed(date)}</span>
            {/key}
        </header>

        <p>{@html shownContent}</p>

        {#if showMore === 'needed'}

            <button class="showContent link" in:fade on:click={() => {shownContent = checkLinks(content); showMore = 'used';}}>{$dictionary.showMore}</button>
            
            {:else if showMore === 'used'}
            
            <button class="showContent link" in:slide on:click={async() => {shownContent = shortenString(content); showMore = 'needed'; await sleep(100); postDiv.scrollIntoView({block: 'center', behavior:"smooth"})}}>{$dictionary.showLess}</button>

        {/if}

        {#if img}
            <a href={img} target="_blank">
                <img src="{img}" alt="{$dictionary.unableToLoad}">
            </a>
        {/if}

        <footer>
            <div class="leftButtons">
                <button class="link" on:click={() => replying = !replying}>
                    {$dictionary.reply}
                    {#key replying}
                        <ion-icon in:fade name="arrow-undo{replying ? "" : "-outline"}"></ion-icon>
                    {/key}
                </button>
                <button class="link" on:click={() => {liked = !liked; liked ? likes = likes + 1 : likes = likes - 1;}} aria-label={$dictionary.like}>
                    {#key liked}
                        <ion-icon in:fade name="heart{liked ? "" : "-outline"}"></ion-icon>
                    {/key}
                    {likes}
                </button>
                
                {#if !originalPost}
    
                    <a class="link" href="/intranet/replies/{id}" aria-label={$dictionary.comments}>
                        <ion-icon name="chatbubbles-outline"></ion-icon> {comments}
                    </a>
                    
                {/if}

            </div>
        </footer>

        {#if replying}
            <form transition:slide|local on:submit|preventDefault={() => {replying = false}}>
                <!-- svelte-ignore a11y-autofocus -->
                <textarea required rows="3" autofocus autocomplete="off" name="reply"></textarea>
                <div class="replyButtons">
                    <button type="button" class="link" on:click={() => replying = false}>{$dictionary.cancel}</button>
                    <button type="submit" class="link">{$dictionary.submit}</button>
                </div>
            </form>
        {/if}
    </div>
</div>


<style>
    .post {
        position: relative;
        display: grid;
        grid-template-columns: auto 1fr;
        
        width: 100%;
        max-width: 700px;
        height: fit-content;
        border-radius: 20px;
        padding: 0 1em;
        transition: all .3s;

        border: 1px solid var(--content);
        color: var(--content);
        box-shadow: 0 0 5px var(--contentDim);
        background-color: rgba(0, 0, 0, 0.15);
    }

    .avatar {
        padding: 1em 0;
        position: relative;
        width: 5.3em;
        display: flex;
        justify-content: center;
    }

    .content {
        width: 100%;
        padding: 1.5em 1em;
        display: flex;
        flex-direction: column;
    }

    header {
        display: flex;
        align-items: flex-end;
        gap: 1em;
        user-select: none;
    }

    header h3 {
        font-weight: bold;
        font-size: 1.17rem;
    }
    
    header span {
        font-size: .95rem;
        font-weight: normal;
        color: var(--contentDim);
    }
    
    p {
        font-size: 1.1rem;
        font-weight: normal;
        padding: .5em 0;
        color: var(--content);
    }

    img {
        width: 100%;
        border-radius: 20px;
        box-shadow: 0 0 2px var(--content);
        margin: .5em 0;
    }

    .showContent {
        margin: .3em 0;
        color: var(--contentDim);
    }

    .showContent:hover,
    .showContent:focus-visible {
        color: var(--content)
    }

    footer {
        display: flex;
        gap: 2em;
        margin-top: 1em;
        margin-right: 1em;
        align-items: center;
        justify-content: space-between;
    }

    .leftButtons {
        display: flex;
        gap: 2em;
        align-items: center;
    }

    a, button {
        gap: .5rem;
        font-weight: normal;
        transition: all .2s;
        border-radius: 25px;
        font-size: 1rem;
    }
    
    a ion-icon, button ion-icon {
        font-size: 1.25rem;
    }

    textarea {
        margin-top: .5em;
        border-bottom: 5px var(--interative) solid;
        padding: .5em;
        width: 100%;
        word-wrap: break-word;
        overflow-wrap: break-word;
        resize: vertical;
        line-height: 1.5rem;
        background-color: transparent;
        transition: all .2s;
        background-color: #00000011;
    }

    textarea:focus {
        outline: none;
        background-color: #00000033;
    }
    
    .replyButtons{
        display: flex;
        gap: 1.5em;
        justify-content: end;
        margin: .5em 0;
        margin-right: 1em;
    }


    @media screen and (max-width: 700px) {
        .post {
            padding: 0;
        }

        .avatar {
            width: 4.2em;
        }

        .content {
            padding: 1em 1em 1em 0;
        }

        header {
            flex-direction: column;
            gap: .2em;
            align-items: baseline;
            padding-left: .2em;
        }

        header h3 {
            font-size: 1.1rem;
        }
        
        header span {
            font-size: .9rem;
        }
        
        p {
            font-size: 1rem;
            line-height: 1.7rem;
            padding: .5em 0 0 0;
        }

        a, button {
            font-size: 1rem;
        }
        
        a ion-icon, button ion-icon {
            font-size: 1.1rem;
        }

        footer {
            gap: 2em;
            margin-top: 1em;
            margin-right: .5em;
        }
    }
</style>