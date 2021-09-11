<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop, push } from "svelte-spa-router";
    import { Nav, NavItem, NavLink } from "sveltestrap";

    async function loadGraph() {
        let anxietyData = [];
        let gamesData = [];

        const resData = await fetch("/api/v2/anxiety_stats");

        const resData2 = await fetch(
            "https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc",
            {
                method: "GET",
                headers: {
                    "x-rapidapi-key":
                        "17d52555efmsha24cef2bbaeacb5p1e0494jsn1c7a72f702ca",
                    "x-rapidapi-host":
                        "free-to-play-games-database.p.rapidapi.com",
                },
            }
        );

        anxietyData = await resData.json();
        gamesData = await resData2.json();

        var datadata = [];

        gamesData.forEach((campo) => {
            datadata.push({ y: campo.id, label: campo.title });
        });

        console.log(datadata);

        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            theme: "light2", //"light1", "dark1", "dark2"
            title: {
                text: "Sales Analysis - June 2016",
            },
            data: [
                {
                    type: "funnel",
                    indexLabelPlacement: "inside",
                    indexLabelFontColor: "white",
                    toolTipContent:
                        "<b>{label}</b>: {y} <b>({percentage}%)</b>",
                    indexLabel: "{label} ({percentage}%)",
                    dataPoints:datadata,
                },
            ],
        });
        chart.render();
    }
</script>

<main>
    <Nav>
    <NavItem>
        <NavLink href="/">Página Principal</NavLink>
        </NavItem>
        <NavItem>
        <NavLink href="#/integrations">Integraciones</NavLink>
        </NavItem>
        </Nav> 

    <div id="chartContainer" style="height: 370px; width: 100%;" />
    <script
        type="text/javascript"
        src="https://canvasjs.com/assets/script/canvasjs.min.js"
        on:load={loadGraph}></script>
    <div
        style="margin-top:16px;color:dimgrey;font-size:9px;font-family: Verdana, Arial, Helvetica, sans-serif;text-decoration:none;"
    >
        Source:
        <a
            href="https://canvasjs.com/javascript-charts/multi-series-spline-area-chart/"
            target="_blank"
            title="JavaScript Multi Series Spline Area Charts "
            >https://canvasjs.com/javascript-charts/multi-series-spline-area-chart/</a
        >
    </div>
</main>
