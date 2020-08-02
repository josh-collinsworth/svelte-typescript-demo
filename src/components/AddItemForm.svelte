<script lang="ts">
	export let newItem: string = ''
	export let addItem: () => void

	let newItemExists: boolean
	$: newItemExists = newItem.length > 0
</script>


<form on:submit|preventDefault={addItem} class="flex-container">
	<input type="text" bind:value={newItem}>
	<button type="submit" disabled={!newItemExists}>
		Add item
	</button>
</form>


<style>
form {
	margin-bottom: 1rem;
}

form input[type=text] {
	flex: 1 1 auto;
}

form button {
	margin-left: .5rem;
}
</style>
