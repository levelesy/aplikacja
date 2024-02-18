var zakupy = [];
var vat = 0.23; // Stawka VAT

function dodajProdukt(event) {
    event.preventDefault(); // Zapobiega domyślnemu działaniu przycisku Enter w formularzu

    var kodKreskowyInput = document.getElementsByName('kodKreskowy')[0];
    var kodKreskowy = kodKreskowyInput.value;

    // Sprawdź, czy kod P został naciśnięty (koniec skanowania produktów)
    if (kodKreskowy.toUpperCase() === 'P') {
        wyswietlParagon();
        return;
    }

    // Pobierz cenę netto z pliku lista.html (za pomocą AJAX, fetch itp.)
    // Tutaj przykładowy kod tylko w celach demonstracyjnych
    fetch('lista.html')
        .then(response => response.text())
        .then(data => {
            // Parsuj dane z pliku HTML (możesz użyć parsera HTML lub innerHTML)
            var parser = new DOMParser();
            var doc = parser.parseFromString(data, 'text/html');

            // Znajdź informacje o produkcie na podstawie kodu kreskowego
            var produkt = znajdzProdukt(doc, kodKreskowy);

            // Dodaj produkt do listy zakupów
            if (produkt) {
                zakupy.push(produkt);
                wyswietlAktualneZakupy();
            } else {
                console.log('Produkt o kodzie kreskowym ' + kodKreskowy + ' nie został znaleziony.');
            }

            // Wyczyść pole formularza
            kodKreskowyInput.value = '';
        })
        .catch(error => console.error('Błąd pobierania pliku lista.html:', error));
}

function znajdzProdukt(doc, kodKreskowy) {
    var produktElement = doc.querySelector('[data-kod="' + kodKreskowy + '"]');
    if (produktElement) {
        var nazwaProduktuElement = produktElement.querySelector('.nazwa-produktu');
        var cenaNettoElement = produktElement.querySelector('.cena-netto');

        var cenaNetto = parseFloat(cenaNettoElement.textContent);
        var nazwaProduktu = nazwaProduktuElement.textContent;

        return { kodKreskowy: kodKreskowy, nazwaProduktu: nazwaProduktu, cenaNetto: cenaNetto };
    }
    return null;
}

function wyswietlAktualneZakupy() {
    var zakupyDiv = document.getElementById('wynik');
    var sumaBrutto = obliczSumęBrutto();

    var zakupyHtml = '<h2>Aktualne zakupy:</h2>';

    zakupy.forEach(zakup => {
        zakupyHtml += '<p>' + zakup.nazwaProduktu + ' (Kod kreskowy: ' + zakup.kodKreskowy +
                      '), Cena jednostkowa brutto: ' + (zakup.cenaNetto * (1 + vat)).toFixed(2) + ' PLN</p>';
    });

    zakupyHtml += '<p>Łączna kwota do zapłaty (brutto): ' + sumaBrutto.toFixed(2) + ' PLN</p>';

    zakupyDiv.innerHTML = zakupyHtml;
}

function obliczSumęBrutto() {
    var sumaBrutto = 0;

    zakupy.forEach(zakup => {
        sumaBrutto += zakup.cenaNetto * (1 + vat);
    });

    return sumaBrutto;
}

function wyswietlParagon() {
    // Zapisz zakupy w local storage
    localStorage.setItem('zakupy', JSON.stringify(zakupy));

    // Przekieruj użytkownika do strony zakupy.html
    window.location.href = 'zakupy.html';
}

function obliczSumęNetto() {
    var sumaNetto = 0;

    zakupy.forEach(zakup => {
        sumaNetto += zakup.cenaNetto;
    });

    return sumaNetto;
}

function handleEnter(event) {
    if (event.key === "Enter") {
        dodajProdukt(event);
    }
}