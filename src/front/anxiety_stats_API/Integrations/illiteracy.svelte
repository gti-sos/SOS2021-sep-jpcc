<script>
import { Nav, NavItem, NavLink } from "sveltestrap";
    async function graphINT() {
        let illiteracyData = [];
        let anxietyData = [];

        await fetch("/api/v1/illiteracy/loadInitialData");
        const data = await fetch("/api/v1/illiteracy");
        await fetch("/api/v2/anxiety_stats/loadInitialData");
        const datos = await fetch("/api/v2/anxiety_stats");

        illiteracyData = await data.json();
        anxietyData = await datos.json();

        var illiteracyMA = [];
        var xyanxietAM = [];

        illiteracyData.forEach((campo) => {
            illiteracyMA.push(campo.male_illiteracy_rate);
        });

        //Suma de Array Illiteracy
        let illiteracyTotal = 0;
        illiteracyMA.forEach(function (a) {
            illiteracyTotal += a;
        });

        anxietyData.forEach((campo) => {
            xyanxietAM.push(campo.anxiety_men);
        });

        //Suma de Array Anxiety
        let anxietyTotal = 0;
        xyanxietAM.forEach(function (a) {
            anxietyTotal += a;
        });

        var myConfig = {
            type: "pie",
            plot: {
                borderColor: "#2B313B",
                borderWidth: 5,
                // slice: 90,
                valueBox: {
                    placement: "out",
                    text: "%t\n%npv%",
                    fontFamily: "Open Sans",
                },
                tooltip: {
                    fontSize: "18",
                    fontFamily: "Open Sans",
                    padding: "5 10",
                    text: "%npv%",
                },
                animation: {
                    effect: 2,
                    method: 5,
                    speed: 900,
                    sequence: 1,
                    delay: 3000,
                },
            },
            source: {
                text: "gs.statcounter.com",
                fontColor: "#8e99a9",
                fontFamily: "Open Sans",
            },
            title: {
                fontColor: "#8e99a9",
                text: "Integración Illiteracy - Anxiety_stats",
                align: "left",
                offsetX: 10,
                fontFamily: "Open Sans",
                fontSize: 25,
            },
            subtitle: {
                offsetX: 10,
                offsetY: 10,
                fontColor: "#8e99a9",
                fontFamily: "Open Sans",
                fontSize: "16",
                text: "June 2021",
                align: "left",
            },
            plotarea: {
                margin: "20 0 0 0",
            },
            series: [
                {
                    values: [illiteracyTotal],
                    text: "Analfabetismo en hombres",
                    backgroundColor: "#50ADF5",
                },
                {
                    values: [anxietyTotal],
                    text: "Ansiedad en hombres",
                    backgroundColor: "#FF7965",
                    detached: true,
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
        on:load={graphINT}></script>
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
            >Integracion Grupo 04</a
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
