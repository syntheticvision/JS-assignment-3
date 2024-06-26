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
* Published URL: https://vercel.com/babak-ghafourigivis-projects/assignment-3/BpxCrGEzrLEq4CCXH9mBejVriqfS
*
********************************************************************************/
const express = require('express');
const path = require('path');
const legoData = require('./modules/legoSets');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

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
            .then((sets) => res.json(sets))
            .catch((err) => res.status(404).send(err));
    } else {
        legoData.getAllSets()
            .then((sets) => res.json(sets))
            .catch((err) => res.status(404).send(err));
    }
});

app.get('/lego/sets/:setNum', (req, res) => {
    const setNum = req.params.setNum;
    legoData.getSetByNum(setNum)
        .then((set) => res.json(set))
        .catch((err) => res.status(404).send(err));
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

legoData.initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to initialize data:', err);
        process.exit(1);
    });