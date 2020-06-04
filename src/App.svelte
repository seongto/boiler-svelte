<script>
	import { Router, Route, Link } from "svelte-routing";
	import Home from "./Pages/Home.svelte";
	import TermsPage from "./Pages/TermsPage.svelte";
	import NotFound from "./Pages/NotFound.svelte";

	export let url = "";

</script>

<Router url="{url}">
	<Route path="terms" component="{TermsPage}" /> 
	<Route path="/"><Home /></Route>
	<Route path="*" component="{NotFound}" /> 
</Router>