<script>
	import Router from 'svelte-spa-router';
	import Home from "./Pages/Home.svelte";

	const routes = {
		'/': Home
	}
</script>

<Router {routes}/>
