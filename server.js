/********************************************************************************
* WEB322 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: Babak Ghafourigivi Student ID: 165118233 Date: 25 June 2024
*
* Published URL: 
*
********************************************************************************/
const express = require('express');
const path = require('path');
const legoData = require('./modules/legoSets');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

legoData.initialize().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(error => {
    console.error('Failed to initialize Lego data:', error);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/lego/sets', (req, res) => {
    const theme = req.query.theme;
    if (theme) {
        legoData.getSetsByTheme(theme)
            .then(sets => res.json(sets))
            .catch(error => res.status(404).send(error));
    } else {
        legoData.getAllSets()
            .then(sets => res.json(sets))
            .catch(error => res.status(404).send(error));
    }
});

app.get('/lego/sets/:setNum', (req, res) => {
    const setNum = req.params.setNum;
    legoData.getSetByNum(setNum)
        .then(set => res.json(set))
        .catch(error => res.status(404).send(error));
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});
