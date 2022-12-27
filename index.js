const   http = require('http'), //HTTP server
        path = require('path'),
        express = require('express'), //Handling HTTP requests & routing
        fs = require('fs'), //File system functionalities
        xmlParse = require('xslt-processor').xmlParse, //XML handling
        xsltProcess = require('xslt-processor').xsltProcess, //XSLT handling
        router = express(), //Init our router
        xml2js = require('xml2js'),
        validator = require('validator'), // validation module // Reference: https://www.geeksforgeeks.org/how-to-validate-data-using-validator-module-in-node-js/
        server = http.createServer(router); //Init our server
        

        router.use(express.static(path.resolve(__dirname,'views')));
        router.use(express.urlencoded({extended: true}));
        router.use(express.json());

function XMLtoJSON(filename, cb){
    let filepath = path.normalize(path.join(__dirname, filename));
    fs.readFile(filepath, 'utf8', function(err, xmlStr){
        if (err) throw (err);
        xml2js.parseString(xmlStr, {}, cb);
    });
};

function JSONtoXML(filename, obj, cb){
    let filepath = path.normalize(path.join(__dirname, filename));
    let builder = new xml2js.Builder();
    let xml = builder.buildObject(obj);
    fs.unlinkSync(filepath);
    fs.writeFile(filepath, xml, cb);
};

router.get('/get/html', function(req, res) {

    res.writeHead(200, {'Content-Type' : 'text/html'});

    let xml = fs.readFileSync('menu.xml', 'utf8'),
        xsl = fs.readFileSync('menu.xsl', 'utf8');

    xml = xmlParse(xml);
    xsl = xmlParse(xsl);

    let html = xsltProcess(xml, xsl);

    res.end(html.toString());
});

router.get('/get/features', function(req, res) {

    res.writeHead(200, {'Content-Type' : 'text/html'});

    let xml = fs.readFileSync('feature.xml', 'utf8'),
        xsl = fs.readFileSync('feature.xsl', 'utf8');

    xml = xmlParse(xml);
    xsl = xmlParse(xsl);

    let html = xsltProcess(xml, xsl);

    res.end(html.toString());
});


router.post('/post/json', function(req, res){
    function appendJSON(obj){
        // if data is not valid 
        if(!isDataValid(obj)){
            // throw error
            throw 'invalid data';
        }
        XMLtoJSON('menu.xml', function(err, result) {
            if (err) throw (err);
            if(result && result.menu && result.menu.genre[obj.sec_n]){
                let name = obj.name.toString();
                let platforms = obj.platforms.toString();
                let price = obj.price.toString();
                result.menu.genre[obj.sec_n].game.push({'name': name, 'platforms': platforms, 'price': price});
            }
            
            JSONtoXML('menu.xml', result, function(err){
                if (err) console.log(err);
            });
        });
    };

    appendJSON(req.body);

    res.redirect('back');
});

/**
 * Method to validate data using validator
 * Reference: https://www.geeksforgeeks.org/how-to-validate-data-using-validator-module-in-node-js/
 * @param {*} obj 
 * @returns 
 */
var isDataValid = function isDataValid(obj){
    if(!obj){
        return false;
    }
    // check if name is present
    if(validator.isEmpty(obj.name)){
        return false;
    }
    // check if name is present
    if(validator.isEmpty(obj.platforms)){
        return false;
    }
    // price need to be present and number
    if(validator.isEmpty(obj.price) && !isNaN(obj.price)){
        return false;
    }
    return true;
}

var isDeleteDataValid = function isDeleteDataValid(obj){
    if(!obj || !obj.data || obj.data.length === 0){
        return false;
    }
    for(i=0; i< obj.data.length; i++){
        let el = obj.data[i];
        // check if genre is present
        if(validator.isEmpty(el.genre)){
            return false;
        }
        // check if entree is present
        if(validator.isEmpty(el.entree)){
            return false;
        }
    }
    return true;
}

/**
 * Delete items from menu
 */
router.post('/post/delete', function (req,res) {
    function deleteJSON(obj) {
        if(!isDeleteDataValid(obj)){
            // throw error
            throw 'invalid data';
        }
        XMLtoJSON('menu.xml', function(err, result){
            if (err) throw (err);

            for(i=0; i < result.menu.genre.length; i++){
                for(j=0; j<obj.data.length; j++){
                    // if we find matching genre
                    if(result.menu.genre[i]['$'].name === obj.data[j].genre){
                        // remove item 
                        delete result.menu.genre[i].game[obj.data[j].entree]
                    }
                }
                
            }
           // delete result.menu.genre[obj.section].game[obj.entree];
            JSONtoXML('menu.xml', result, function(err){
                if (err) console.log(err);
            });
        });
    };

    deleteJSON(req.body);

    res.redirect('back');
})

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
    const addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port)
});


