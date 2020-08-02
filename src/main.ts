import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		storageName: 'svelteListV3'
	}
});

export default app;
