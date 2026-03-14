const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/webhook', (req, res) => {
    const mensajeCliente = req.body.Body ? req.body.Body.trim() : "";
    const numeroCliente = req.body.From; // Identifica el número de WhatsApp del cliente

    console.log(`[CLIENTE: ${numeroCliente}] eligió la opción: ${mensajeCliente}`);

    // Lógica del menú de opciones
    switch (mensajeCliente) {
        case '1':
            respuestaTexto = "Has seleccionado Área Comercial. Un asesor se comunicará contigo en breve.";
            break;
        case '2':
            respuestaTexto = "Has seleccionado Área de Calidad. Tu solicitud ha sido registrada.";
            break;
        case '3':
            respuestaTexto = "Has seleccionado Área de Logística. Estamos procesando tu pedido.";
            break;
        case '4':
            respuestaTexto = "Has seleccionado Área de Mercadeo. Gracias por contactarnos.";
            break;
        case '5':
            respuestaTexto = "Has seleccionado Área de Ventas. ¿En qué podemos ayudarte hoy?";
            break;
        default:
            // Saludo de bienvenida si no eligió una opción válida
            respuestaTexto = "Bienvenido a Nuttre y CO, es un gusto atenderte, para una mejor atención, por favor elige el área con la que deseas comunicarte:\n\n1. Comercial\n2. Calidad\n3. Logística\n4. Mercadeo\n5. Ventas";
            break;
    }

    const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${respuestaTexto}</Message></Response>`;
    
    res.set('Content-Type', 'text/xml');
    res.send(twiml);
});

app.listen(3000, () => console.log('Servidor escuchando en el puerto 3000'));