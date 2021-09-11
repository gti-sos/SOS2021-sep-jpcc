<script>
  import { Nav, NavItem, NavLink } from "sveltestrap";
  async function loadGraph() {
    const resData = await fetch("/api/v2/anxiety_stats");
    let dataAnxiety = await resData.json();
    const resDataApi = await fetch(
      "https://free-nba.p.rapidapi.com/games?per_page=25&page=0",
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "17d52555efmsha24cef2bbaeacb5p1e0494jsn1c7a72f702ca",
          "x-rapidapi-host": "free-nba.p.rapidapi.com",
        },
      }
    );
    let dataApi = await resDataApi.json();

    //===Tratando los datos===\\
    let allDataAnxiety = dataAnxiety.map((d) => {
      let res = {
        name: d.country,
        y: d.anxiety_men,
        z: d.anxiety_women,
      };
      return res;
    });
    //===cambiarDatos===\\
    let basketApi = dataApi.data;

    let allDataApi = basketApi.map((d) => {
      let res = {
        name: d.home_team.conference,
        y: d.home_team_score,
        z: d.visitor_team_score,
      };
      return res;
    });

    let allData = allDataAnxiety.concat(allDataApi);
    console.log(allData);
    //===Grafica===\\
    Highcharts.chart("container6", {
      chart: {
        type: "pie",
        options3d: {
          enabled: true,
          alpha: 45,
        },
      },
      title: {
        text: "NBA & Ansiedad",
      },
      subtitle: {
        text: "Grafica 3D Baloncesto integrada con anxiety_stats",
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
          "AnsiedadHombre: <b>{point.y}</b><br/>" +
          "AnsiedadMujer: <b>{point.z}</b><br/>",
      },
      series: [
        {
          name: "Puntos Totales",
          data: allData,
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
  <div id="container6" />
</main>

<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/highcharts-3d.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>
