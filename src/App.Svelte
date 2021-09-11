<script>
	import Router from "svelte-spa-router";
	import NotFound from "./NotFound.svelte";

	import Home from "./Home.svelte";
	import Info from "./Info.svelte";
	import Integrations from "./Integrations.svelte";
	import About from "./About.svelte";

	import anxiety_stats from "./front/anxiety_stats_API/AnxietyStatsAPI.svelte";
	import edit_anxiety_stats from "./front/anxiety_stats_API/AnxietyStatsEdit.svelte";


	//INTEGRACIONES JOSE PABLO CARRASCO COBOS
	import India from "./front/anxiety_stats_API/Integrations/India.svelte";
	import Sanity from "./front/anxiety_stats_API/Integrations/Sanity.svelte";
	import illiteracy from "./front/anxiety_stats_API/Integrations/illiteracy.svelte";
	import Natality from "./front/anxiety_stats_API/Integrations/Natality.svelte";

	import NBA from "./front/anxiety_stats_API/Integrations/NBA.svelte";
	import Games from "./front/anxiety_stats_API/Integrations/Games.svelte"

	import anxiety_1 from "./front/anxiety_stats_API/anxiety/anxiety_1.svelte";
	import anxiety_2 from "./front/anxiety_stats_API/anxiety/anxiety_2.svelte";


	const routes = {
		"/": Home,
		"/info": Info,
		"/integrations": Integrations,
		"/about": About,

		"/anxiety_stats": anxiety_stats,
		"/anxiety_stats/:country/:year": edit_anxiety_stats,

		//INTEGRACIONES JOSE PABLO CARRASCO COBOS
		//APIs personales
		"/integrations/anxiety_1": anxiety_1,
		"/integrations/anxiety_2": anxiety_2,
		//Compañeros SOS
		"/integrations/India": India,
		"/integrations/Sanity": Sanity,
		"/integrations/illiteracy": illiteracy,
		"/integrations/Natality": Natality,
		//APIs Externas
		"/integrations/NBA": NBA,
		"/integrations/Games": Games,

		"*": NotFound,
	};
</script>

<main>
	<Router {routes} />
</main>
