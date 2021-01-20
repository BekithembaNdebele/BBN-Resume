const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();
// Read static files
const images = path.join(__dirname, '../static/images');
const json = path.join(__dirname,'../static/json');

let raweducation = fs.readFileSync(path.join(json,'/education.json'));
let education = JSON.parse(raweducation);
console.log(education);
router.get('/', (req, res) => {
	res.render('form', {title: 'B B N', education:{'exam':'test'}});
});

module.exports = router;
/*
fs.readdir(directoryPath, function (err, files) {
	//handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file); 
    });
});
*/
