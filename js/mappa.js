var mapArray;

readFromFile();

var mymap = L.map('Map').setView([44.285268464566485, 11.882925129689992], 13);

if(!navigator.geolocation){
    console.log('Il browser non supporta la geolocalizzazione.')
} else {
    setInterval(() => {
        navigator.geolocation.getCurrentPosition(getPosition)
    }, 1000);
}

var marker,circle; 

function getPosition(position){
    // console.log(position)
    var lat = position.coords.latitude
    var long = position.coords.longitude
    var accuracy = position.coords.accuracy

    if(mymap.hasLayer(marker)) {
        mymap.removeLayer(marker)
    }

    if(mymap.hasLayer(circle)) {
        mymap.removeLayer(circle)
    }

    marker = L.marker([lat,long])
    circle = L.circle([lat,long],{radius: 15})

    var featureGroup = L.featureGroup([marker,circle]).addTo(mymap)

    //mymap.fitBounds(featureGroup.getBounds())

    console.log(lat+'|'+long+'|'+accuracy)

}

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors,' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

function readFromFile() {
    d3.tsv("https://www.informagiovanifaenza.it/applichiamoci_map_points/mappa.tsv", function(d) {
        mapArray = d;
    });
}

function mostraTipologia(tipologia) {
    // gestire la geolocalizzazione
	mymap.remove();
    mymap = null;
    mymap = L.map('Map').setView([44.285268464566485, 11.882925129689992], 13);
	
    var cluster = L.markerClusterGroup();
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors,' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(mymap);
    var toAddToList = [];
    i = 0;
    j = 0; // conta il numero di elementi della tipologia. Inizialmente è a 0.
    while (i < mapArray.length) {
        if (mapArray[i].CODICE.includes(tipologia)) {
            var lat = mapArray[i].LATITUDINE;
            var lon = mapArray[i].LONGITUDINE;
            var luogo = mapArray[i].LUOGO;
            if (tipologia === '') {
                var codice = mapArray[i].CODICE;
            } else {
                var codice = tipologia;
            }
            try {
                j++;
                var marker = createMarker(mapArray[i],lat, lon, luogo, j, codice);
                cluster.addLayer(marker);
            } catch (e) {
                console.error(e.message);
            }
            toAddToList.push(mapArray[i]);
        }
        i++;
    }
    mymap.addLayer(cluster);
    
	// non creare più la lista da mostrare
	//makeUL(toAddToList, tipologia);
}

function createMarker(info, lat, lon, luogo, numero, tipologia) {
    tipologia = tipologia.charAt(0);
    switch (tipologia) {
        case 'B':
            var ColorIcon = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/informagiovanifaenza/mappaemotiva/main/img/mappa_immagini/IconaFarBaracca.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [27, 38],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
            break;
        case 'C':
            var ColorIcon = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/informagiovanifaenza/mappaemotiva/main/img/mappa_immagini/IconaStoricoCulturale.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [27, 38],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
            break;
        case 'S':
            var ColorIcon = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/informagiovanifaenza/mappaemotiva/main/img/mappa_immagini/IconaSport.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [27, 38],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
            break;
        case 'G':
            var ColorIcon = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/informagiovanifaenza/mappaemotiva/main/img/mappa_immagini/IconaGreen.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [27, 38],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
            break;
        case 'U':
            var ColorIcon = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/informagiovanifaenza/mappaemotiva/main/img/mappa_immagini/IconaUtilità.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [27, 38],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
            break;


        default:
            var ColorIcon = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/informagiovanifaenza/mappaemotiva/main/img/mappa_immagini/IconaFarBaracca.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [27, 38],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
    }
	
	//elaborare il marcatore affinché sia cliccabile
    var link = document.createElement('b');
    link.setAttribute("onclick", 'dettagli_marker("' + info.LUOGO + '", "' + info.TIPOLOGIA + '", "' + info.EMOZIONI + '", "' + info.INDIRIZZO + '", "' + info.LATITUDINE + '", "' + info.LONGITUDINE + '", "' + info.DESCRIZIONE + '", "' + info.CURIOSITA + '", "' + info.DEVIPROVARE + '", "' + info.LINK + '");');
    link.innerHTML = numero+': '+info.LUOGO
    return L.marker([lat, lon], { icon: ColorIcon }).bindPopup(link)
    
}

function dettagli_marker(luogo,tipologia,emozioni,indirizzo,longitudine,latitudine,descrizione,curiosita,daProvare,link){
    document.getElementById("luogo").textContent = luogo;
    document.getElementById("tipologia").textContent = tipologia;
    document.getElementById("emozioni").textContent = emozioni;
    document.getElementById("indirizzo").textContent = indirizzo;
    /*document.getElementById("latitudine").textContent = latitudine;
    document.getElementById("longitudine").textContent = longitudine;*/
    document.getElementById("posizione").href = coord;
    document.getElementById("posizione").textContent = longitudine+","+latitudine;
    document.getElementById("descrizione").textContent = descrizione;
    document.getElementById("curiosita").textContent = curiosita;
    document.getElementById("daProvare").textContent = daProvare;
    document.getElementById("link").href = link;
    document.getElementById("link").textContent = link;
    if (!(url_img === "")) {
        document.getElementById("img_info").style.display = "block";
        document.getElementById("img_info").src = url_img;
    }
}

// creare qui la funzione che permetta di mostrare o nascondere il blocco dei dettagli
// e di riempirlo con i particolari dello specifico marcatore cliccato


// funzione da eliminare: caricando i dettagli subito sotto la mappa, 
// non si costruisce la lista dei punti filtrati, ma si mostra solo 
// quello cliccato nei suoi dettagli
/*function makeUL(array, tipologia) {

    var pageBody = document.getElementById("mapPage");

    // Create the list element:
    try {
        pageBody.removeChild(document.getElementById("list"));
    } catch (e) {}

    var list = document.createElement('ol');

    list.id = "list";

    for (var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        var link = document.createElement('button');

        // prova
        // array[i].IMMAGINE = "img/carlo.png";

        var img = "";

        if (!(typeof array[i].IMMAGINE === "undefined")) {
            img = array[i].IMMAGINE;
        }

        link.setAttribute("onclick", 'newPage("' + array[i].LUOGO + '", "' + array[i].TIPOLOGIA + '", "' + array[i].EMOZIONI + '", "' + array[i].INDIRIZZO + '", "' + array[i].LATITUDINE + '", "' + array[i].LONGITUDINE + '", "' + array[i].DESCRIZIONE + '", "' + array[i].CURIOSITA + '", "' + array[i].DEVIPROVARE + '", "' + array[i].LINK + '", "' + img + '");');

        link.class = "listElement";

        link.innerHTML = array[i].LUOGO;

        if (tipologia === '') {
            var codice = mapArray[i].CODICE;
        } else {
            var codice = tipologia;
        }

        switch (codice.charAt(0)) {
            case 'B':
                link.style.backgroundColor = "#e40f76";
                break;
            case 'C':
                link.style.backgroundColor = "#ffc70a";
                break;
            case 'S':
                link.style.backgroundColor = "#2085b1";
                break;
            case 'G':
                link.style.backgroundColor = "#68830e";
                break;
            case 'U':
                link.style.backgroundColor = "#94271f";
                break;
            default:
                link.style.backgroundColor = "#b26c01";
        }

        link.style.color = "#FFFFFF";
        link.style.fontWeight = "bold";
        link.style.padding = "20px";


        item.appendChild(link);


        // Add it to the list:
        list.appendChild(item);
    }
    // Finally, return the constructed list:
    pageBody.appendChild(list);
}*/

// non più necessaria per la mappa standalone, perché i dettagli sono caricati 
// nella pagina, sotto la mappa
/*function newPage(luogo, tipologia, emozioni, indirizzo, latitudine, longitudine, descrizione, curiosita, deviProvare, link, url_img) {

    window.localStorage.removeItem("luogo");
    window.localStorage.removeItem("tipologia");
    window.localStorage.removeItem("emozioni");
    window.localStorage.removeItem("indirizzo");
    window.localStorage.removeItem("latitudine");
    window.localStorage.removeItem("longitudine");
    window.localStorage.removeItem("descrizione");
    window.localStorage.removeItem("curiosita");
    window.localStorage.removeItem("deviProvare");
    window.localStorage.removeItem("link");
    window.localStorage.removeItem("url_img");

    window.localStorage.setItem("luogo", luogo);
    window.localStorage.setItem("tipologia", tipologia);
    window.localStorage.setItem("emozioni", emozioni);
    window.localStorage.setItem("indirizzo", indirizzo);
    window.localStorage.setItem("latitudine", latitudine);
    window.localStorage.setItem("longitudine", longitudine);
    window.localStorage.setItem("descrizione", descrizione);
    window.localStorage.setItem("curiosita", curiosita);
    window.localStorage.setItem("deviProvare", deviProvare);
    window.localStorage.setItem("link", link);
    window.localStorage.setItem("url_img", url_img);

    window.open("dettagli.html", "_self");
}*/