import App from './App.svelte';
import { defaultExternals } from './stores';

const app = new App({
	target: document.body,
	props: { externals: defaultExternals },
});

export default app;
