<script>
    import {
        Button,
        Card,
        CardBody,
        CardFooter,
        CardHeader,
        CardSubtitle,
        CardText,
        CardTitle,
        Col,
        Container,
        Nav,
        NavItem,
        NavLink,
        Row,
    } from "sveltestrap";
</script>

<main>
    <Nav>
        <NavItem>
            <NavLink href="/">Volver a la página principal</NavLink>
        </NavItem>

        <NavItem>
            <NavLink href="/#/integrations">Integraciones</NavLink>
        </NavItem>

        <NavItem>
            <NavLink href="/#/about">Vídeo</NavLink>
        </NavItem>
    </Nav>

    <h1>SOS2021-SEP-JPCC</h1>

    <h2>Miembro de SOS2O21-SEP-JPCC</h2>
    <Container>
        <Col>
            <a href="http://github.com/EsDeSepa">Jose Pablo Carrasco Cobos</a>
        </Col>
    </Container>
    <p />
    <h2>API</h2>
    <Container>
        <Col xs="auto">
            <Card class="mb-3">
                <CardHeader>
                    <CardTitle><h5>anxiety_stats</h5></CardTitle>
                </CardHeader>
                <CardBody>
                    <CardSubtitle />
                    <CardText
                        >Estadísticas acerca de los datos recogidos por ansiedad
                        en las comunidades autónomas de España.</CardText
                    >
                    <a
                        href="https://sos2021-sep-jpcc.herokuapp.com/api/v2/anxiety_stats"
                    >
                        <Button color="success">API (v2)</Button></a
                    >
                    <a href="/#/anxiety_stats">
                        <Button color="light">Interfaz de Ansiedad</Button>
                    </a>
                    <a
                        href="https://documenter.getpostman.com/view/14948159/U16kr5WQ"
                        ><Button color="success">Documentación v2</Button></a
                    >
                </CardBody>
                <CardFooter
                    >realizado por
                    <a href="https://github.com/EsDeSepa"
                        >Jose Pablo Carrasco Cobos</a
                    ></CardFooter
                >
            </Card>
        </Col>
    </Container>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }
    h1 {
        color: #04A438;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }
    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
