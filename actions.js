function construct_projection(customerProjection){
    var selectedRecords = {
        '_id':0
    };
    if(customerProjection.customerId == 1) selectedRecords['customer_id'] = 1 ;
    if(customerProjection.customerName == 1) selectedRecords['customer_name'] = 1 ;
    if(customerProjection.contactNumber == 1) selectedRecords['contact_number'] = 1 ;
    if(customerProjection.country == 1) selectedRecords['country'] = 1 ;
    return selectedRecords;
}

async function insert_into_csv(customerProjection){
    const Json2csvParser = require("json2csv").Parser;
    const fs = require("fs");
    
    var url = "mongodb://localhost:27017/";
    var MongoClient = require('mongodb').MongoClient;
    var fileName = '/Users/sarathsunny/Desktop/customer_data.csv';
    var selectedRecords = construct_projection(customerProjection);
    
    var retrivedData = {};
    
    var mongoClient = await MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("customers").find(retrivedData,{ projection : selectedRecords}).toArray(function(err, result) {
            if (err) throw err;
            const json2csvParser = new Json2csvParser({ header: true });
            const csvData = json2csvParser.parse(result);
            fs.writeFile(fileName, csvData, function(error) {
                if (error) throw error;
                console.log('IN')
            });
            db.close();
        });
    });

    await mongoClient.then(console.log('DONE'));
}

module.exports = { construct_projection, insert_into_csv }