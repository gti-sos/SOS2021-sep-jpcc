const puppeteer = require('puppeteer');
const screenshotPath = './tests/e2e_screenshoots/';
var counter=0;
(async () => {
  const browser = await puppeteer.launch({
    headless: true, 
    slowMo: 1000, // delay de 1 segundo.
  });
  const context = await browser.createIncognitoBrowserContext();
  const page = await browser.newPage();
  await page.setViewport({ width: 3688, height: 1768 });

  //llamada a la pagina principal
  console.log("Principal");
  await page.goto('http://sos2021-sep-jpcc.herokuapp.com/');
  
  await page.screenshot({ path: 'capturas/Principal.png' });

  
  //pagina informacion
  console.log("Info");
  await page.click("#informacion > div > div > div.d-grid.gap-2.d-md-flex.justify-content-md-center > a:nth-child(1)" );
   
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'capturas/Info.png' });
 
 

  //tabla
  await page.click("body > main > main > div:nth-child(7) > div > div > div.card-body > a:nth-child(4)" );

  await page.waitForTimeout(1000);
  
  await page.screenshot({ path: 'capturas/TablaAnxiety.png' });

 //Añadir todos los datos
 console.log("Datos Base");
 await page.focus('body > main > main > button.btn.btn-outline-primary');
 await page.click("body > main > main > button.btn.btn-outline-primary");

 await page.screenshot({ path: 'capturas/DatosBase.png' });


 //Añadir datos
  console.log("Ansiedad En España");
  await page.focus('body > main > main > table > tbody > tr:nth-child(1) > td:nth-child(1) > input');
  await page.keyboard.type("Spain_Melilla");

  await page.focus('body > main > main > table > tbody > tr:nth-child(1) > td:nth-child(2) > input');
  await page.keyboard.type("2012");

  await page.focus('body > main > main > table > tbody > tr:nth-child(1) > td:nth-child(3) > input');
  await page.keyboard.type("1.1");

  await page.focus('body > main > main > table > tbody > tr:nth-child(1) > td:nth-child(4) > input');
  await page.keyboard.type("7.3");

  await page.focus('body > main > main > table > tbody > tr:nth-child(1) > td:nth-child(5) > input');
  await page.keyboard.type("2.1");

  console.log("DatosYaEscritos");

  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'capturas/DatoEscrito.png' });

  console.log("DatosYaInsertados");
  
  await page.focus('body > main > main > table > tbody > tr:nth-child(1) > td:nth-child(6) > button');
  await page.click("body > main > main > table > tbody > tr:nth-child(1) > td:nth-child(6) > button");
  
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'capturas/DatoCreado.png' });

  //Eliminar Datos

  console.log("Eliminar Datos");

  await page.click("body > main > main > table > tbody > tr:nth-child(2) > td:nth-child(6) > button"),
  await page.waitForTimeout(1000);

  await page.screenshot({ path: 'capturas/EliminoDato.png' });

  //Eliminamos todos los datos

  console.log("Eliminar Todos Los Datos");
  await page.waitForTimeout(1000);
  await page.click("body > main > main > button.btn.btn-outline-danger"),
  await page.waitForTimeout(1000);

  await page.screenshot({ path: 'capturas/EliminoTodosLosDatos.png' });

  //Cargamos los datos de nuevo
  await page.focus('body > main > main > button.btn.btn-outline-primary');
  await page.click("body > main > main > button.btn.btn-outline-primary");


  //vuelta a la pagina principal
  console.log("VueltaPáginaPrincipal");
  await page.click("body > main > main > button:nth-child(9)" );



  //pagina integraciones
  console.log("Integraciones");
  await page.click("body > main > main > ul > li:nth-child(2) > a");
  await page.screenshot({ path: 'capturas/Integraciones.png' });
  
  //1º Gráfica
  console.log(" 1ºGráfica");
  await page.click("body > main > main > div > div > div > div.card-body > a:nth-child(3) > button" );
   
  await page.waitForTimeout(1000);
 
  await page.screenshot({ path: 'capturas/Ansiedad1.png' });

  await page.waitForTimeout(1000);

  console.log("PáAtras");

  await page.click("body > main > main > ul > li:nth-child(2) > a" );



   //1º Integración
   console.log("2ºGráfica");
   await page.click("body > main > main > div > div > div > div.card-body > a:nth-child(5) > button" );
    
   await page.waitForTimeout(1000);
  
   await page.screenshot({ path: 'capturas/Games.png' });
 
   await page.waitForTimeout(1000);

   console.log("PáAtras");

   await page.click("body > main > main > ul > li:nth-child(2) > a" );



   //2º Integración
   console.log(" 3ºGráfica");
   await page.click("body > main > main > div > div > div > div.card-body > a:nth-child(5)" );
    
   await page.waitForTimeout(1000);
  
   await page.screenshot({ path: 'capturas/NBA.png' });
 
   await page.waitForTimeout(1000);

   console.log("PáAtras");

   await page.click("body > main > main > ul > li:nth-child(2) > a" );


   //4º Integración
   console.log(" 4ºGráfica");
   await page.click("body > main > main > div > div > div > div.card-body > a:nth-child(7) > button" );
    
   await page.waitForTimeout(1000);
  
   await page.screenshot({ path: 'capturas/India.png' });
 
   await page.waitForTimeout(1000);

   console.log("PáAtras");

   await page.click("body > main > main > ul > li:nth-child(2) > a" );


   console.log("5ºGráfica");
   await page.click("body > main > main > div > div > div > div.card-body > a:nth-child(8) > button" );
    
   await page.waitForTimeout(1000);
  
   await page.screenshot({ path: 'capturas/Sanity.png' });
 
   await page.waitForTimeout(1000);

   console.log("PáAtras");

   await page.click("body > main > main > ul > li:nth-child(2) > a" );


   console.log("6ºGráfica");
   await page.click("body > main > main > div > div > div > div.card-body > a:nth-child(9) > button" );
    
   await page.waitForTimeout(1000);
  
   await page.screenshot({ path: 'capturas/Illiteracy.png' });
 
   await page.waitForTimeout(1000);

   console.log("PáAtras");

   await page.click("body > main > main > ul > li:nth-child(2) > a" );

   console.log("7ºGráfica");
   await page.click("body > main > main > div > div > div > div.card-body > a:nth-child(10) > button" );
    
   await page.waitForTimeout(1000);
  
   await page.screenshot({ path: 'capturas/Natality.png' });
 
   await page.waitForTimeout(1000);

   console.log("PáAtras");

   await page.click("body > main > main > ul > li:nth-child(2) > a" );


  //Video
  console.log("Video Explicativo");
  await page.click("body > main > main > div > div > div > div.card-body > a > button")

  await page.screenshot({ path: 'capturas/Video.png' });

  await page.close();
  await browser.close();
})();
