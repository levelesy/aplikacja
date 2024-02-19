var listaProduktow = [
    { kodKreskowy: '001', nazwaProduktu: 'Masło extra', cenaNetto: 6.50 },
    { kodKreskowy: '002', nazwaProduktu: 'Chleb wiejski', cenaNetto: 4.50 },
    { kodKreskowy: '003', nazwaProduktu: 'Makaron Babuni', cenaNetto: 9.20 },
    { kodKreskowy: '004', nazwaProduktu: 'Dżem truskawkowy', cenaNetto: 8.10 },
    { kodKreskowy: '005', nazwaProduktu: 'Kiełbasa myśliwska', cenaNetto: 29.00 },
    { kodKreskowy: '006', nazwaProduktu: 'Szynka konserwowa', cenaNetto: 22.00 },
    { kodKreskowy: '007', nazwaProduktu: 'Chipsy paprykowe', cenaNetto: 6.00 },
    { kodKreskowy: '008', nazwaProduktu: 'Serek wiejski', cenaNetto: 3.50 },
    { kodKreskowy: '009', nazwaProduktu: 'Sól kuchenna', cenaNetto: 2.70 },
    { kodKreskowy: '010', nazwaProduktu: 'Cukier kryształ', cenaNetto: 3.20 }
];

var koszyk = [];

function dodajProdukt() {
    var kodKreskowyInput = document.querySelector('input[name="kodKreskowy"]');
    var kodKreskowy = kodKreskowyInput.value;
    var produkt = listaProduktow.find(function(element) {
        return element.kodKreskowy === kodKreskowy;
    });
    if (produkt) {
        koszyk.push(produkt);
        document.getElementById('wynik').innerText = 'Produkt dodany do koszyka: ' + produkt.nazwaProduktu;
        kodKreskowyInput.value = '';
    } else {
        document.getElementById('wynik').innerText = 'Nie znaleziono produktu o podanym kodzie kreskowym.';
    }
}

// Dodajemy nasłuchiwanie na wciśnięcie klawisza "P"
document.addEventListener('keydown', function(event) {
    if (event.key === 'p' || event.key === 'P') {
        wyswietlParagon();
    }
});

function wyswietlParagon() {
    var paragonDiv = document.getElementById('paragon');
    paragonDiv.innerHTML = '';
    var suma = 0;
    if (koszyk.length === 0) {
        var wynikDiv = document.getElementById('wynik');
        wynikDiv.innerHTML = '';
        var errorDiv = document.getElementById('error');
        errorDiv.innerHTML = '';
        paragonDiv.innerText = 'Koszyk jest pusty.';
        return;
    }
    koszyk.forEach(function(produkt) {
        suma += produkt.cenaNetto;
        var produktDiv = document.createElement('div');
        produktDiv.innerText = produkt.nazwaProduktu + ' - ' + produkt.cenaNetto.toFixed(2) + ' zł';
        paragonDiv.appendChild(produktDiv);
    });
    var sumaDiv = document.createElement('div');
    sumaDiv.innerText = 'Suma: ' + suma.toFixed(2) + ' zł';
    paragonDiv.appendChild(sumaDiv);
    var vat = 0;
    vat = suma * 0.23;
    var vatDiv = document.createElement('div');
    vatDiv.innerText = 'W tym VAT: ' + vat.toFixed(2) + ' zł';
    paragonDiv.appendChild(vatDiv);
}

function clean() {
    koszyk = [];
    var errorDiv = document.getElementById('error');
    errorDiv.innerHTML = '';
    errorDiv.innerText = 'Wyczyszczono koszyk';
    var paragonDiv = document.getElementById('paragon');
    paragonDiv.innerHTML = '';
    var wynikDiv = document.getElementById('wynik');
    wynikDiv.innerHTML = '';
}

// Funkcja do obsługi wciśnięcia klawisza Enter
function handleEnter(event) {
    if (event.keyCode === 13) {
        event.preventDefault(); // Zapobiegamy domyślnej akcji (np. wysłaniu formularza)
        dodajProdukt();
    }
}
