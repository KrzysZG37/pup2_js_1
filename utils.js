var fs = require('fs-extra'); // zawiera bibliotekę fs-extra

function readDb(path) { //funkcja readDb z argumentem 'path'
    fs.ensureFileSync(path); //Jeśli plik, który ma zostać utworzony, znajduje się w katalogach, które nie istnieją, te katalogi są tworzone
    let table = fs.readJsonSync(path, { throws: false }); // table = odczyt z pliku json + podanie ścieżki 
    if (table === null) { // jeśli tablica jest pusta
        return []; // zwróć pustą tablicę
    }
    return table; // zwróć tablicę
}

function saveToDb(path, table) { // nowa funkcja mająca jako argument 'table'
    fs.writeJsonSync(path, table); // zapisuje do pliku json o podanej ścieżce 
}

module.exports = { readDb, saveToDb} // Pozwala używać tych metod w innych plikach