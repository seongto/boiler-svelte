<script>
	import { Router, Route, Link } from "svelte-routing";
	import Home from "./Pages/Home.svelte";
	import NotFound from "./Pages/NotFound.svelte";

	export let url = "";

</script>

<Router url="{url}">
	<Route path="/" component="{Home}" /> 
	<Route path="*" component="{NotFound}" /> 
</Router>