<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
    import { onMount } from "svelte";
    async function loadGraph() {
        let indiaData = [];
        let anxietyData = [];

        await fetch(
            "https://sos2021-08.herokuapp.com/api/v1/statewisetestingdetails/loadInitialData"
        );

        await fetch("/api/v2/anxiety_stats/loadInitialData");

        const data = await fetch(
            "https://sos2021-08.herokuapp.com/api/v1/statewisetestingdetails"
        );

        const datos = await fetch("/api/v2/anxiety_stats");

        indiaData = await data.json();
        anxietyData = await datos.json();

        var xyindiaP = [];
        var xyindiaN = [];

        var xyanxietAM = [];
        var xyanxietWM = [];

        indiaData.forEach((campo) => {
            xyindiaN.push(campo.negative);
            xyindiaP.push(campo.positive);
        });

        anxietyData.forEach((campo) => {
            xyanxietAM.push(campo.anxiety_men);
            xyanxietWM.push(campo.anxiety_women);
        });

        console.log(anxietyData);
        console.log(indiaData);

        var myConfig = {
            type: "bubble-pie",
            title: {
                text: "Datos de Covid en India",
            },
            legend: {
                align: "center",
                item: {
                    text: "%data-pie",
                },
                verticalAlign: "bottom",
            },
            plot: {
                values: [
                    [2017, 1500, 1500],
                    [2020, 4500, 4500],
                    [2021, 5500, 5500],
                ],
                tooltip: {
                    text: "%data-pv% %data-pie",
                },
                valueBox: {
                    text: "%node-size-value total responses",
                    fontColor: "black",
                    fontWeight: "normal",
                    placement: "bottom",
                },
                dataBubble: ["2017", "2018", "2019", "2020", "2021"],
            },
            scaleX: {
                values: "2017:2021",
            },
            series: [
                {
                    dataPie: "anxiety_men",
                    dataV: xyanxietWM,
                    marker: {
                        backgroundColor: "#D564323",
                    },
                },
                {
                    dataPie: "anxiety_women",
                    dataV: xyanxietWM,
                    marker: {
                        backgroundColor: "#D60404",
                    },
                },
                {
                    dataPie: "positive",
                    dataV: xyindiaP,
                    marker: {
                        backgroundColor: "#D60404",
                    },
                },
                {
                    dataPie: "negative",
                    dataV: xyindiaN,
                    marker: {
                        backgroundColor: "#04D607",
                    },
                },
            ],
        };
        zingchart.render({
            id: "myChart",
            data: myConfig,
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
    <div id="myChart">Integración SOS: Covid India</div>
</main>

<style>
    div {
        color: rgb(116, 121, 9);
        border: 10px dotted currentcolor;
    }
</style>
