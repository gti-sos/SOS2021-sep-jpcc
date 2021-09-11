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
            <NavLink href="/#/info">Info</NavLink>
        </NavItem>

        <NavItem>
            <NavLink href="/#/about">Vídeo</NavLink>
        </NavItem>
    </Nav>

    <h1>Integraciones</h1>

    <Container>
        <Col xs="auto">
            <Card class="mb-3">
                <CardHeader>
                    <CardTitle><h5>anxiety_stats</h5></CardTitle>
                </CardHeader>
                <CardBody>
                    <CardSubtitle />
                    <CardText
                        >Integraciones y Gráficos base de anxiety_stats</CardText
                    >
                    <a href="/#/integrations/anxiety_1">
                        <Button type="button" class="btn btn-info">Anxiety_1</Button></a
                    >
                    <a href="/#/integrations/anxiety_2">
                        <Button type="button" class="btn btn-info">Anxiety_2</Button></a
                    >
                    <a href="/#/integrations/Games">
                        <Button type="button" class="btn btn-warning">Games</Button></a
                    >
                    <a href="/#/integrations/NBA">
                        <Button type="button" class="btn btn-warning">NBA</Button></a
                    >
                    <a href="/#/integrations/India">
                        <Button type="button" class="btn btn-success">India</Button></a
                    >
                    <a href="/#/integrations/Sanity">
                        <Button type="button" class="btn btn-success">Sanity</Button></a
                    >
                    <a href="/#/integrations/illiteracy">
                        <Button type="button" class="btn btn-success">Illiteracy</Button></a
                    >
                    <a href="/#/integrations/Natality">
                        <Button type="button" class="btn btn-success">Natality</Button></a>
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
