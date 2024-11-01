<script>
    import {socket} from '$lib/webSocketConnection.js'
    import {onMount} from 'svelte'
    import { preventDefault } from 'svelte/legacy';
    let messageInput = ''
    let username = ''

    let messages = []

    onMount(()=>{
      socket.on('message',message=>{
        messages = [...messages,message]
        console.log(messages)
      })
      socket.on('name',name=>{
        username = name
      })
    })

    function sendMessage() {
        const message = messageInput.trim()
        if (!message) return
        messageInput = ''
        socket.emit('message',message)
    }
</script>

<ul>
    {#each messages as message}
        <li><strong>{message.from}:</strong> {message.message} <em>({message.time})</em></li>
        
    {/each}
</ul>
<form action="#" on:submit|preventDefault={sendMessage}>
    <input bind:value={messageInput} placeholder="Message...">
    <input type="submit">
</form>