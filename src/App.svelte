<script lang="ts">
	import { onMount } from 'svelte'
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	import type { ItemI } from './interfaces/Item'
	import AddItemForm from './components/AddItemForm.svelte'
	import Item from './components/Item.svelte'

	export let storageName

	const [send, receive] = crossfade({
		duration: d => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 400,
				easing: quintOut,
				css: t => `
					transform: translateY(${(t * 1) - 1}em);
					opacity: ${t}
				`
			};
		}
	});

	//Filled in with the onMount function
	let list: ItemI[] = []
	let newItem: string = ''
	let allAreChecked: boolean
	let isSortedByChecked: boolean = false

	$: allAreChecked = list.filter(item => !item.checked).length === 0

	//Adds a new item to the list
	const addItem = (): void => {
		if(!newItem) return
		let itemToAdd: ItemI = { title: newItem, id: Date.now(), checked: false }
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

	//Check all items
	const checkOrUncheckAll = (): void => {
		list = list.map(item => item = {...item, checked: !allAreChecked})
	}

	//Sort list by checked
	const sortByChecked = (): void => {
		isSortedByChecked = !isSortedByChecked
		list = list.sort((a, b) => (isSortedByChecked ? a.checked > b.checked : a.id < b.id))
	}

	//Retrieves items from localStorage
	onMount((): void => {
		const storedItems = JSON.parse(localStorage.getItem(storageName))
		list = storedItems || [{ title: "Demo", id: 1}]
	})
</script>

<main>
	<div class="container">

		<AddItemForm bind:newItem {addItem}/>

		<button on:click={checkOrUncheckAll}>
			{allAreChecked ? 'Uncheck' : 'Check'} all
		</button>

		<button on:click={sortByChecked}>
			{isSortedByChecked ? '✅' : '⬜'}Unchecked first
		</button>

		<ul>
			{#each list as listItem (listItem.id)}
				<li in:receive="{{key: listItem.id}}" out:send="{{key: listItem.id}}" animate:flip={{duration: 400}}>
					<Item bind:listItem {removeItem} {syncItems}/>
				</li>
			{/each}
		</ul>
	</div>
</main>

<style>
ul {
	list-style-type: none;
	padding-left: 0;
}

li {
	display: flex;
	align-items: center;
	padding: .25rem;
	display: flex;
	transition: transform .4s var(--transition);
}
</style>
