var mapArray;

readFromFile();

var mymap = L.map('Map').setView([0, 0], 13);

if(!navigator.geolocation){
    console.log('Il browser non supporta la geolocalizzazione.')
} else {
    setInterval(() => {
        navigator.geolocation.getCurrentPosition(getPosition)
    }, 1000);
}

var marker,circle; 

function getPosition(position){
    var latitude = position.coords.latitude
    var longitude = position.coords.longitude
    var accuracy = position.coords.accuracy

    if(mymap.hasLayer(marker)) {
        mymap.removeLayer(marker)
    }

    if(mymap.hasLayer(circle)) {
        mymap.removeLayer(circle)
    }

    marker = L.marker([latitude,longitude])
    circle = L.circle([latitude,longitude],{radius: 15})

    var featureGroup = L.featureGroup([marker,circle]).addTo(mymap)

    // mymap.fitBounds(featureGroup.getBounds())

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
        //mostraTipologia('');
    });
}

function mostraTipologia(tipologia) {
	if (!mapArray) {
        return;
    }
	
    // gestire la geolocalizzazione
	mymap.remove();
    mymap = null;
    mymap = L.map('Map').setView([44.285268464566485, 11.882925129689992], 13);
	
	navigator.geolocation.getCurrentPosition(getPosition);
	
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
<<<<<<< HEAD
	//alert(mapArray.length);
=======
	alert(mapArray.length);
>>>>>>> branch 'devel' of https://github.com/informagiovanifaenza/mappaemotiva.git
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
<<<<<<< HEAD
				/*if (mapArray[i].LUOGO == 'Rione Borgo Durbecco')
					alert(mapArray[i].LUOGO);*/
=======
				if (mapArray[i].LUOGO == 'Rione Borgo Durbecco')
					alert(mapArray[i].LUOGO);
>>>>>>> branch 'devel' of https://github.com/informagiovanifaenza/mappaemotiva.git
                var marker = createMarker(mapArray[i],lat, lon, luogo, j, codice);
                cluster.addLayer(marker);
            } catch (e) {
                console.error(e.message);
            }

        }
        i++;
    }
    mymap.addLayer(cluster);
    
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
		
	var marker = L.marker([lat, lon], { icon: ColorIcon }).bindPopup("<b>" + numero + ": " + luogo + "</b>");
    marker.on('popupopen', function(){
        var img = "";
        if (!(typeof info.IMMAGINE === "undefined")) {
            img = info.IMMAGINE;
        }
        dettagli_marker(info.LUOGO, info.TIPOLOGIA, info.EMOZIONI, info.INDIRIZZO, info.LONGITUDINE, info.LATITUDINE, info.DESCRIZIONE, info.CURIOSITA, info.DEVIPROVARE, info.LINK, img);
    });
	
    marker.on('popupclose', function(){
        document.getElementById("dettagli").style.display = "none";
    });
    return marker;
    
}

function dettagli_marker(luogo,tipologia,emozioni,indirizzo,longitudine,latitudine,descrizione,curiosita,daProvare,link,url_img){
    var coord = new URL("http://maps.google.com/")
    coord.searchParams.append("ie", "UTF8");
    coord.searchParams.append("hq", "");
    coord.searchParams.append("ll", latitudine+","+longitudine);

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
    if (url_img === "") {
        document.getElementById("img_info").style.display = "none";
    } else {
        document.getElementById("img_info").style.display = "block";
        document.getElementById("img_info").src = url_img;
    }

    document.getElementById("dettagli").style.display = "block";
}