<script>
	import { Router, Route, Link } from "svelte-routing";
	import Home from "./Pages/Home.svelte";
	import Login from "./Pages/Login.svelte";
	import ManageBrandStories from "./Pages/ManageBrandStories.svelte";
	import ManageCommunityEvents from "./Pages/ManageCommunityEvents.svelte";
	import NotFound from "./Pages/NotFound.svelte";

	export let url = "";

</script>

<Router url="{url}">
	<Route path="manage/stories" component="{ManageBrandStories}" /> 
	<Route path="manage/events" component="{ManageCommunityEvents}" /> 
	<Route path="manage" component="{ManageBrandStories}" />
	<Route path="auth-login" component="{Login}" />
	<Route path="/"><Home /></Route>
	<Route path="*" component="{NotFound}" /> 
</Router>