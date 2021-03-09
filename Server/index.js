//odpal za pomocą node .\index.js damian_galinski rosolowa 91-121 lodz polska 30 opis 1
var easyinvoice = require('easyinvoice');
const FileSaver = require('file-saver');
var fs = require('fs');

company = process.argv[2]
address = process.argv[3]
zip = process.argv[4]
city = process.argv[5]
country = process.argv[6]
quantity = process.argv[7]
description = process.argv[8]
price = process.argv[9]
invoiceNumber = process.argv[10]


function generateInvoice(company,address,zip,city,country,quantity,description,price,invoiceNumber){
    var data = {
        "documentTitle": "FAKTURA",
        "currency": "PLN",
        "taxNotation": "vat",
        "marginTop": 25,
        "marginRight": 25,
        "marginLeft": 25,
        "marginBottom": 25,
        "logo": "https://www.easyinvoice.cloud/img/logo.png",
        "sender": {
            "company": "ZZSP EVENTY",
            "address": "plac Kilińskiego 8",
            "zip": "95-100",
            "city": "Zgierz",
            "country": "Polska"
        },
        "client": {
            "company": company,
            "address": address,
            "zip": zip,
            "city": city,
            "country": country
        },
        "invoiceNumber": invoiceNumber,
        "invoiceDate": "02-03-2021",
        "products": [
            {
                "quantity": quantity,
                "description": description,
                "tax": 6,
                "price": price
            },
        ],
        "bottomNotice": "Kindly pay your invoice within 14 days."
};
    easyinvoice.createInvoice(data, async function (result) {
        //The response will contain a base64 encoded PDF file
        console.log(result.pdf);

        await fs.writeFileSync("invoice.pdf",result.pdf,'base64');

    });}
generateInvoice(company,address,zip,city,country,quantity,description,price,invoiceNumber)