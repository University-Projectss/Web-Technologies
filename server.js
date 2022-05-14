const express = require('express');
const { json } = require('express/lib/response');
const fs = require('fs');
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'));
app.use(express.static('views'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

//show cart
app.get('/chart', (req, res) => {
    fs.readFile('./tickets.json', 'utf8', (err, jsonString) => {
        if(err) { console.error(err); return; }

        let tiketsObject = JSON.parse(jsonString);
        // console.log(tiketsObject);
        
        res.render('./chart', {
            obj: tiketsObject.tikets
        });
    });
});

//add ticket
app.post('/chart', (req, res) => {
    // console.log(req.body);

    fs.readFile('./tickets.json', 'utf8', (err, jsonString) => {
        if(err) { console.error(err); return; }

        let tiketsObject = JSON.parse(jsonString);
    
        tiketsObject.tikets.push(req.body);

        let jsonUpdate = JSON.stringify(tiketsObject);
        fs.writeFile('./tickets.json', jsonUpdate, 'utf8', err => {
            if(err) { console.error(err); return; }

            console.log('Scris cu succes!');
        });
    });
});

//change ticket
app.put('/chart', (req, res) => {
    // console.log(req.body);

    fs.readFile('./tickets.json', 'utf8', (err, jsonString) => {
        if(err) { console.error(err); return; }

        let tiketsObject = JSON.parse(jsonString);

        for(let i = 0; i < tiketsObject.tikets.length; i++) {
            if( req.body.id ==  tiketsObject.tikets[i].id ) {
                tiketsObject.tikets[i].type = req.body.type;
                break;
            }
        }

        let jsonUpdate = JSON.stringify(tiketsObject);
        fs.writeFile('./tickets.json', jsonUpdate, 'utf8', err => {
            if(err) { console.error(err); return; }

            console.log('Scris cu succes!');
        });
    });
});

//delete ticket
app.delete('/chart', (req, res) => {
    // console.log(req.body);
    fs.readFile('./tickets.json', 'utf8', (err, jsonString) => {
        if(err) { console.error(err); return; }

        let tiketsObject = JSON.parse(jsonString);
    
        let newObj = {tikets: []};

        // tiketsObject.tikets.push(req.body);

        for(let i = 0; i < tiketsObject.tikets.length; i++) {
            if( req.body.id !=  tiketsObject.tikets[i].id ) {
                newObj.tikets.push(tiketsObject.tikets[i]);
            }
        }

        let jsonUpdate = JSON.stringify(newObj);
        fs.writeFile('./tickets.json', jsonUpdate, 'utf8', err => {
            if(err) { console.error(err); return; }

            console.log('Scris cu succes!');
        });
    });

});

app.listen(port, () => {
    console.log(`Server open on port: ${port}`);
});