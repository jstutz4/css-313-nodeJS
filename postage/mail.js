const express = require('express')
const params = require('url')
const path = require('path')
const math = require('math')
const PORT = process.env.PORT || 8080
const app = express();
var message = "You may send your parcel"

function getResults(res, req) {
    var weight = res.query.weight;
    var mailType = res.query.mail_type;
    var price = 0;
    console.log('type ' + mailType + weight);
    if (mailType == "L_S" && weight < 3.5) {
        if (weight < 1) {
            price = .55;
        }
        else if (weight < 2) {
            price = .70;
        }
        else if (weight < 3) {
            price = .85;
        }
        else if (weight < 3.5) {
            price = 1.0;
        }
        else {
            //this should not happen
            price = 1000;
        }
    }
    else if (mailType == "L_M" && weight < 3.5) {
        if (weight < 1) {
            price = .50;
        }
        else if (weight < 2) {
            price = .65;
        }
        else if (weight < 3) {
            price = .80;
        }
        else if (weight < 3.5) {
            price = .95;
        }
        else {
            //this should not happen
            price = 1000;
        }
    }
    else if (mailType == "L_E_F" && weight < 13) {
        if (math.trunc(weight) == weight) {
            price = 1.00 + (.15 * (math.trunc(weight) + 1))
        }
        else {
            price = 1.00 + (.15 * math.trunc(weight))
        }
        console.log('type1 ' + mailType + weight);
    }
    else if (mailType == "F_C_P" && weight < 13) {
        if (weight < 4) {
            price = 3.66;
        }
        else if (weight < 8) {
            price = 4.39;
        }
        else if (weight < 12) {
            price = 5.19;
        }
        else if (weight < 13) {
            price = 5.71;
        }
        console.log('type2 ' + mailType + weight);
    }
    else if ((mailType == "L_M" || mailType == "L_S") && weight < 13) {
        message = "You will need to upgrade to a Large Envelope parcel";
        if (math.trunc(weight) == weight) {
            price = 1.00 + (.15 * (math.trunc(weight) + 1))
        }
        else {
            price = 1.00 + (.15 * math.trunc(weight))
        }
        console.log(message + price + weight);
    }
    else {
        message = "We do not ship these kind of parcel that are "
    }
    req.render('pages/results', { 'price': price, 'message': message, 'weight':weight });
}

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/form'))
app.get('/results', getResults)
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
