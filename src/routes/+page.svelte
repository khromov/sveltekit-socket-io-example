<script lang="ts">
    import { enhance } from "$app/forms";
    import type { Socket } from "socket.io-client";
    import client from "socket.io-client";
    import { onMount } from "svelte";

    let messages: string[] = [];

    let c: Socket;

    onMount(() => {
        c = client();
        c.on("chat message", (msg) => {
            messages = [...messages, msg];
        });

        return () => {
            console.log('Unmounting');
            c?.disconnect();
        };
    });

    const fromClientMessage = () => {
        console.log("test");
        c.emit("chat message", Math.random());
    };
</script>

<svelte:head>
    <title>Socket.IO chat</title>
</svelte:head>

<!-- This won't work out of the box because we don't forward client messages in server.js
<input type="button" value="Back" on:click={fromClientMessage} />
-->

<div>
    <ul id="messages">
        {#each messages as message}
            <li>{message}</li>
        {/each}
    </ul>
    <form id="form" method="POST" use:enhance>
        <input
            name="text"
            id="input"
            autocomplete="off"
            autofocus
        /><button>Send</button>
    </form>
</div>

<style>
    div {
        margin: 0;
        padding-bottom: 3rem;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Helvetica, Arial, sans-serif;
    }

    #form {
        background: rgba(0, 0, 0, 0.15);
        padding: 0.25rem;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        height: 3rem;
        box-sizing: border-box;
        backdrop-filter: blur(10px);
    }
    #input {
        border: none;
        padding: 0 1rem;
        flex-grow: 1;
        border-radius: 2rem;
        margin: 0.25rem;
    }
    #input:focus {
        outline: none;
    }
    #form > button {
        background: #333;
        border: none;
        padding: 0 1rem;
        margin: 0.25rem;
        border-radius: 3px;
        outline: none;
        color: #fff;
    }

    #messages {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
    #messages > li {
        padding: 0.5rem 1rem;
    }
    #messages > li:nth-child(odd) {
        background: #efefef;
    }
</style>
