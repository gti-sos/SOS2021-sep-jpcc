<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
    async function loadGraph() {
        let natalityData = [];
        let anxietyData = [];

        await fetch(
            "http://sos2021-natality-stats.herokuapp.com/api/v2/natality-stats/loadinitialdata"
        );

        await fetch("/api/v2/anxiety_stats/loadInitialData");

        const data = await fetch(
            "http://sos2021-natality-stats.herokuapp.com/api/v2/natality-stats"
        );

        const datos = await fetch("/api/v2/anxiety_stats");

        natalityData = await data.json();
        anxietyData = await datos.json();

        var womenBorn = [];

        var xyanxietWM = [];

        natalityData.forEach((campo) => {
            womenBorn.push(campo["women-born"]);
        });

        anxietyData.forEach((campo) => {
            xyanxietWM.push(campo["anxiety_women"]);
        });

        let natalityTotal = 0;
        womenBorn.forEach(function (a) {
            natalityTotal += a;
        });

        let anxietyTotal = 0;
        xyanxietWM.forEach(function (a) {
            anxietyTotal += a;
        });

        //console.log(anxietyData);
        //console.log(natalityData);

        var myConfig = {
            type: "funnel",
            globals: {
                fontFamily: "Georgia",
            },
            title: {
                text: "Funnel de Natality-stats con Anxiety-stats",
            },
            scaleY: {
                placement: "opposite",
                labels: [
                    "Mujeres nacidas",
                    "Ansiedad en Mujeres",
                ],
                item: {
                    fontColor: "#999999",
                },
            },
            plot: {
                valueBox: {
                    text: "%v people",
                    placement: "left-out",
                    fontColor: "light-purple",
                    fontSize: 12,
                    fontWeight: "normal",
                },
            },
            series: [

                {
                    values: [natalityTotal/10000],
                    text: "Mujeres Nacidas",
                    backgroundColor: "#ffab40",
                },
                {
                    values: [anxietyTotal],
                    text: "Ansiedad en Mujeres",
                    backgroundColor: "#b2ff59",
                },
            ],
        };

        zingchart.render({
            id: "myChart",
            data: myConfig,
            height: "100%",
            width: "100%",
        });
    }
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
    <div id="myChart">
        <a class="zc-ref" href="https://www.zingchart.com/"
            >Charts by ZingChart</a
        >
    </div>
</main>

<style>
    #myChart {
        width: 100%;
        height: 100%;
        min-height: 250px;
    }

    .zc-ref {
        display: none;
    }
</style>
