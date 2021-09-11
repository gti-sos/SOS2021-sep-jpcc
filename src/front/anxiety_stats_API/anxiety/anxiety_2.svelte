<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
    async function loadGraph() {
        const anxiety_stats_data = await fetch("/api/v2/anxiety_stats");

        let anxiety_data = await anxiety_stats_data.json();

        console.log("Base de datos de Ansiedad:" + anxiety_data);

        let anxietyData = anxiety_data.map((d) => {
            let res = {
                name: d.country,
                y: d.anxiety_population,
                z: d.year,
            };
            return res;
        });
        Highcharts.chart("container", {
            chart: {
                type: "pie",
                options3d: {
                    enabled: true,
                    alpha: 45,
                },
            },
            title: {
                text: "Ansiedad (Año 2017)",
            },
            subtitle: {
                text: "Ansiedad por población en las CC.AA de España",
            },
            plotOptions: {
                pie: {
                    innerSize: 100,
                    depth: 45,
                },
            },
            tooltip: {
                headerFormat: "",
                pointFormat:
                    '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
                    "Población Afectada: <b>{point.y}</b><br/>" +
                    "Año: <b>{point.z}</b><br/>",
            },
            series: [
                {
                    name: "Población Afectada",
                    data: anxietyData,
                },
            ],
        });
    }
    loadGraph();
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
    <div id="container" />
   
</main>
