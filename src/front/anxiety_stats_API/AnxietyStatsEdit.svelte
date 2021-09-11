<script>

    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    import { Button, Table } from "sveltestrap";

    const API_ANXIETY_STATS = "/api/v2/anxiety_stats"; //tiene que llamar a la API para tratar los datos
    export let params = {};

    let anxietyStat = {};
    let updatedCountry = "";
    let updatedYear = 0;
    let updatedAnxietyMen = 0.0;
    let updatedAnxietyWomen = 0.0;
    let updatedAnxietyPopulation = 0.0;

    let errorMsg = "";
    let correctMsg = "";

    onMount(getanxietyStat);

    async function getanxietyStat() {
        console.log("Fetching data...");
        const res = await fetch(
            API_ANXIETY_STATS + "/" + params.country + "/" + params.year
        );
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            anxietyStat = json;
            updatedCountry = anxietyStat.country;
            updatedYear = anxietyStat.year;
            updatedAnxietyMen = anxietyStat["anxiety_men"];
            updatedAnxietyWomen = anxietyStat["anxiety_women"];
            updatedAnxietyPopulation = anxietyStat["anxiety_population"];
            console.log("Received data.");
        } else if (res.status == 404) {
            errorMsg = "No se encuentra el dato a editar.";
            console.log("ERROR. " + errorMsg);
        } else {
            //res.status ===500)
            errorMsg = "No se ha podido acceder a la base de datos";
            console.log("ERROR. " + errorMsg);
        }
    }
    async function updateanxietyStat() {
        console.log("Updating data..." + params.country + " " + params.year);
        const res = await fetch(
            API_ANXIETY_STATS + "/" + params.country + "/" + params.year,
            {
                method: "PUT",
                body: JSON.stringify({
                    country: params.country,
                    year: parseInt(params.year),
                    anxiety_men: updatedAnxietyMen,
                    anxiety_women: updatedAnxietyWomen,
                    anxiety_population: updatedAnxietyPopulation,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then(function (res) {
            if (res.ok) {
                console.log("Ok. ");
                errorMsg = "";
                correctMsg = `El dato con país: ${params.country} y año: ${params.year} ha sido actualizado correctamente.`;
                getanxietyStat();
            } else if (res.status == 404) {
                errorMsg = "El dato que intenta editar no existe.";
            } else if (res.status == 500) {
                errorMsg = "Error accediendo a la base de datos.";
            }
        });
    }
</script>

<main>
    <h2>Editar dato</h2>
    <div id="update">
        <Table bordered style="text-align: center;">
            <thead>
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Índice de ansiedad por hombre</th>
                    <th>Índice de ansiedad por mujer</th>
                    <th>Índice de ansiedad en población</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{updatedCountry}</td>
                    <td>{updatedYear}</td>
                    <td
                        ><input
                            type="number"
                            placeholder="0.00"
                            min="0"
                            bind:value={updatedAnxietyMen}
                        />
                    </td>
                    <td
                        ><input
                            type="number"
                            placeholder="0.00"
                            min="0"
                            bind:value={updatedAnxietyWomen}
                        /></td
                    >
                    <td
                        ><input
                            type="number"
                            placeholder="0.00"
                            min="0"
                            bind:value={updatedAnxietyPopulation}
                        />
                    </td>
                    <td>
                        <Button
                            color="primary"
                            on:click={() => updateanxietyStat()}
                        >
                            Actualizar
                        </Button></td
                    >
                </tr>
            </tbody>
        </Table>
        <Button style="background-color:darkgray" on:click={pop}>Volver</Button>
    </div>

    {#if errorMsg}
        <p style="color: red; text-align:center; font-size: 20px;">
            ERROR: {errorMsg}
        </p>
    {/if}

    {#if correctMsg}
        <p style="color: green; text-align:center; font-size: 20px;">
            {correctMsg}
        </p>
    {/if}
</main>

<style>
    h2 {
        text-align: center;
        margin-top: 2%;
    }
    div {
        margin-top: 5%;
        margin-left: 50px;
        margin-right: 50px;
    }
</style>
