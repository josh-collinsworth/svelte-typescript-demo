<script lang="ts">
	import { onMount } from 'svelte'
	import type { ItemI } from './interfaces/Item'
	import Item from './components/Item.svelte'

	export let storageName

	//Filled in with the onMount function
	let list: ItemI[] = []

	let newItem: string = ''
	let newItemExists: boolean
	$: newItemExists = newItem.length > 0

	//Adds a new item to the list
	const addItem = (): void => {
		if(!newItem) return
		let itemToAdd: ItemI = { title: newItem, id: Date.now() }
		list = [itemToAdd, ...list]
		newItem = ''
		syncItems()
	}

	//Delete an item
	const removeItem = (id: number): void => {
		list = list.filter(item => item.id != id)
		syncItems()
	}

	//Syncs with localStorage
	const syncItems = (): void => {
		localStorage.setItem(storageName, JSON.stringify(list))
	}

	//Retrieves items from localStorage
	onMount((): void => {
		const storedItems = JSON.parse(localStorage.getItem(storageName))
		list = storedItems || [{ title: "ok", id: 1}, { title: "Yeah", id: 2}, { title: "another", id: 3}]
	})

</script>

<main>
	<div class="container">
		<h1>Hello!</h1>

		<form on:submit|preventDefault={() => addItem()} class="flex-container">
			<input type="text" bind:value={newItem}>
			<button type="submit" disabled={!newItemExists}>
				Add item
			</button>
		</form>

		<ul>
			{#each list as listItem}
				<Item {listItem} {removeItem} {syncItems}/>
			{/each}
		</ul>
	</div>
</main>

<style>
ul {
	list-style-type: none;
	padding-left: 0;
}

form input[type=text] {
	flex: 1 1 auto;
}

form button {
	margin-left: .5rem;
}
</style>
