<script lang="ts">
	import type { ItemI } from '../interfaces/Item'

	export let listItem: ItemI
	export let removeItem: (id: number) => void
	export let syncItems: () => void
</script>

<input type="checkbox" bind:checked={listItem.checked} on:change={syncItems} id={`item-${listItem.id}`}>
<label for={`item-${listItem.id}`}>{listItem.title}</label>
<button on:click={() => removeItem(listItem.id)}>&times;</button>

<style>


input[type=checkbox] {
	transform: scale(1.5);
	transform-origin: center;
	margin: 0 .5rem 0 0;
}

label {
	flex: 1 0 auto;
}

button {
	background: none;
	padding: .25rem .5rem;
	border: 0;
	transform: scale(1.5);
	margin-left: auto;
	color: var(--red);
	font-weight: bold;
	cursor: pointer;
}
</style>
