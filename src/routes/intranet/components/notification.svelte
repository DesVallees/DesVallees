<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";
    import { dictionary, profile } from "../stores";
	import { slide } from "svelte/transition";
	import { notifications } from "../futureDB";

    const dispatch = createEventDispatcher();

    export let notificationID: string;

    let profileNotification = notifications.find((profileNotification) => profileNotification.id === notificationID)

    let seen: boolean = true
    async function seeNotification() {
        if (profileNotification && profileNotification.seen === false) {
            seen = false
            profileNotification.seen = true
        }
    }
    
    function dismiss() {
        if (profileNotification) {
            profileNotification.dismissed = true
            dispatch('dismissed')
        }
    }


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
            return `${$dictionary.hace} ${$dictionary.lessThatA} ${$dictionary.minute} ${$dictionary.ago}`;
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

    onMount(() => {
        seeNotification()
    })
</script>

{#if profileNotification}
    <div class="notification" out:slide>
        <header>
            <span>{getTimePassed(profileNotification.date)}</span>
            {#if !seen}
                <div class="unseen">{$dictionary.new}</div>
            {/if}
            <button aria-label={$dictionary.close} on:click={dismiss}><ion-icon name="close-outline"></ion-icon></button>
        </header>
        <p>{profileNotification.content}</p>
    </div>
{/if}

<style>
    .notification {
        position: relative;
        padding: 2em 1em 2.5em 0;
        border-bottom: var(--content) 1px solid;
    }

    header {
        display: flex;
        align-items: center;
        column-gap: 1em;
        margin-bottom: .5em;
    }

    .unseen {
        border-radius: 10px;
        background-color: var(--interative);
        padding: .1em .5em;
        font-size: .9rem;
    }

    button {
        border-radius: 50%;
        padding: .3em;
        margin-left: auto;
    }
    
    button:hover,
    button:focus-visible {
        background-color: #ffffff20;
    }
    
    button ion-icon {
        font-size: 1.4rem;
    }

    span {
        color: var(--contentDim);
        font-size: .95rem;
    }

    p {
        font-size: 1.1rem;
        line-height: normal;
    }
</style>