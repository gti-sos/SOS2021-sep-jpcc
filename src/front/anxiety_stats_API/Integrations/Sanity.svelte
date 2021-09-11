<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
    import { onMount } from "svelte";
    async function loadGraph() {
        let sanityData = [];
        let anxietyData = [];

        await fetch(
            "https://sanity-integration.herokuapp.com/sanity-stats/loadInitialData"
        );

        await fetch("/api/v2/anxiety_stats/loadInitialData");

        const data = await fetch(
            "https://sanity-integration.herokuapp.com/sanity-stats"
        );

        const datos = await fetch("/api/v2/anxiety_stats");

        sanityData = await data.json();
        anxietyData = await datos.json();

        var healthExData = [];
        var DoctorPHb = [];

        var xyanxietAM = [];
        var xyanxietWM = [];

        sanityData.forEach((campo) => {
            DoctorPHb.push(campo.doctor_per_1000_habitant);
            healthExData.push(campo.health_expenditure_in_percentage);
        });

        anxietyData.forEach((campo) => {
            xyanxietAM.push(campo.anxiety_men);
            xyanxietWM.push(campo.anxiety_women);
        });

        let chartConfig = {
            type: "nestedpie",
            title: {
                text: "Datos de Sanidad integrados con Ansiedad",
            },
            legend: {
                borderColor: "gray",
                borderRadius: "5px",
                borderWidth: "1px",
                dragHandler: "icon",
                header: {
                    text: "Ages",
                    fontColor: "purple",
                    fontFamily: "Georgia",
                    fontSize: "12px",
                    fontWeight: "normal",
                },
                icon: {
                    lineColor: "orange",
                },
                item: {
                    fontColor: "black",
                    fontFamily: "Georgia",
                },
                lineStyle: "dashdot",
                marker: {
                    type: "circle",
                },
                minimize: true,
                toggleAction: "remove",
            },
            plot: {
                tooltip: {
                    text: "%data-year Ages %t: %v",
                    padding: "10%",
                    alpha: 0.7,
                    backgroundColor: "white",
                    borderColor: "gray",
                    borderRadius: "3px",
                    borderWidth: "1px",
                    fontColor: "black",
                    fontFamily: "Georgia",
                    fontSize: "12px",
                    lineStyle: "dashdot",
                    textAlpha: 1,
                },
                valueBox: {
                    text: "%data-year",
                    fontColor: "white",
                    fontFamily: "Georgia",
                    fontSize: "12px",
                    fontWeight: "normal",
                    rules: [
                        {
                            rule: "%p != 0",
                            visible: false,
                        },
                    ],
                },
                alpha: 0.8,
                animation: {
                    effect: "ANIMATION_EXPAND_LEFT",
                    onLegendToggle: false,
                    method: "ANIMATION_BACK_EASE_OUT",
                    sequence: "ANIMATION_BY_PLOT",
                    speed: 700,
                },
                borderColor: "white",
                borderWidth: "1px",
                dataYear: ["2017", "2028", "2019", "2020", "2021"],
                shadow: false,
                sliceStart: "30%",
            },
            series: [
                {
                    text: "Datos de salud(%)",
                    values: healthExData,
                    backgroundColor: "orange red",
                    tooltipText: "Ages %t: %v",
                },
                {
                    text: "Doctor por habitantes(%)",
                    values: DoctorPHb,
                    backgroundColor: "yellow orange",
                },
                {
                    text: "Ansiedad de Hombres (%)",
                    values: xyanxietAM,
                    backgroundColor: "green blue",
                },
                {
                    text: "Ansiedad de Mujeres (%)",
                    values: xyanxietWM,
                    backgroundColor: "purple red",
                },
            ],
        };

        zingchart.render({
            id: "myChart",
            data: chartConfig,
        });
    }
    onMount(loadGraph);
</script>

<svelte:head>
    <script
        src="https://cdn.zingchart.com/zingchart.min.js"
        on:load={loadGraph}></script>
</svelte:head>

<main>

    <Nav>
        <NavItem>
        <NavLink href="/">Página Principal</NavLink>
        </NavItem>
        <NavItem>
        <NavLink href="#/integrations">Integraciones</NavLink>
        </NavItem>
        </Nav> 
        
    <h1><div id="myChart">Integración SOS: Sanity Stats</div></h1>
</main>

<style>
    h1 {
        text-align: center;
    }
    div {
        color: rgb(15, 152, 8); 
        border: 2px dotted currentcolor;
    }
</style>
