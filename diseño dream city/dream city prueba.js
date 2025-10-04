// --- Referencias a paneles y botón volver ---
const mapPanel = document.getElementById('mapPanel');
const parametersPanel = document.getElementById('parametersPanel');
const lawPanel = document.getElementById('lawPanel');
const backButton = document.getElementById('backButton');
const infoPanel = document.getElementById('infoPanel');
let expanded = null;

// --- Inicializar mapa Leaflet ---
const map = L.map('mapPanel').setView([-32.9468, -60.6393], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

// --- Datos de ejemplo: país → provincia → municipio → leyes ---
const data = {
  argentina: {
    provincias: {
      "Mendoza": {
        municipios: {
          "Mendoza Capital": ["Ley 101: Uso del agua de riego", "Ley 102: Preservación de viñedos"],
          "Godoy Cruz": ["Ley 103: Protección de parques", "Ley 104: Control de napas"],
          "Guaymallén": ["Ley 105: Regulación de altura", "Ley 106: Zonas verdes obligatorias"],
          "Las Heras": ["Ley 107: Expansión urbana regulada", "Ley 108: Protección de arroyos"],
          "Luján de Cuyo": ["Ley 109: Conservación de ríos", "Ley 110: Restricción de construcciones"],
          "Maipú": ["Ley 111: Cuidado de humedales", "Ley 112: Espacios verdes en barrios nuevos"],
          "Lavalle": ["Ley 113: Uso sostenible de suelos", "Ley 114: Protección de flora autóctona"],
          "Rivadavia": ["Ley 115: Control de napas", "Ley 116: Regulación de altura en zona centro"],
          "San Martín": ["Ley 117: Protección de zonas agrícolas", "Ley 118: Regulación de aguas subterráneas"],
          "Tunuyán": ["Ley 119: Conservación de viñedos", "Ley 120: Control de construcción en zonas rurales"],
          "San Rafael": ["Ley 121: Regulación de industria pesada", "Ley 122: Protección de ríos"],
          "General Alvear": ["Ley 123: Uso responsable de recursos", "Ley 124: Preservación de humedales"],
          "La Paz": ["Ley 125: Zonas protegidas en montañas", "Ley 126: Regulación de urbanización"],
          "Santa Rosa": ["Ley 127: Protección de flora y fauna", "Ley 128: Espacios verdes obligatorios"],
          "Malargüe": ["Ley 129: Conservación de agua", "Ley 130: Restricción de construcciones"]
        }
      },
      "Santa Fe": {
        municipios: {
          "Rosario": ["Ley 201: Regulación de altura", "Ley 202: Preservación de humedales"],
          "Santa Fe Capital": ["Ley 203: Espacios verdes", "Ley 204: Control de napas"],
          "Rafaela": ["Ley 205: Protección de arroyos", "Ley 206: Restricción de industrias"],
          "Reconquista": ["Ley 207: Regulación de suelos", "Ley 208: Preservación de flora local"],
          "Venado Tuerto": ["Ley 209: Control de agua subterránea", "Ley 210: Uso sostenible del suelo"],
          "Cañada de Gómez": ["Ley 211: Protección de zonas agrícolas", "Ley 212: Regulación de altura"],
          "Sunchales": ["Ley 213: Conservación de ríos", "Ley 214: Espacios verdes obligatorios"],
          "San Lorenzo": ["Ley 215: Restricción de construcción", "Ley 216: Control de humedales"],
          "Villa Constitución": ["Ley 217: Regulación de industria", "Ley 218: Protección de zonas costeras"],
          "Esperanza": ["Ley 219: Uso sostenible de suelos", "Ley 220: Conservación de flora"],
          "Frontera": ["Ley 221: Protección de ríos", "Ley 222: Regulación de altura"],
          "Ceres": ["Ley 223: Restricción de expansión urbana", "Ley 224: Zonas verdes obligatorias"],
          "Tostado": ["Ley 225: Control de napas", "Ley 226: Protección de humedales"],
          "Villa Minetti": ["Ley 227: Conservación de suelo agrícola", "Ley 228: Regulación de construcción"],
          "Firmat": ["Ley 229: Regulación de urbanización", "Ley 230: Espacios verdes en barrios nuevos"]
        }
      },
      "Buenos Aires": { municipios: { "La Plata": ["Ley 301: Protección de arroyos", "Ley 302: Techos verdes"],
          "Mar del Plata": ["Ley 303: Cuidado de médanos", "Ley 304: Regulación de aguas subterráneas"],
          "Bahía Blanca": ["Ley 305: Restricción de industria pesada", "Ley 306: Protección de humedales"],
          "Tres Arroyos": ["Ley 307: Conservación de ríos", "Ley 308: Uso sostenible de suelo"],
          "Olavarría": ["Ley 309: Regulación de altura", "Ley 310: Espacios verdes"],
          "Pehuajó": ["Ley 311: Protección agrícola", "Ley 312: Restricción de construcciones"],
          "Necochea": ["Ley 313: Protección de dunas", "Ley 314: Regulación de urbanización"],
          "Pergamino": ["Ley 315: Conservación de arroyos", "Ley 316: Control de napas"],
          "Junín": ["Ley 317: Regulación de industria", "Ley 318: Espacios verdes obligatorios"],
          "San Nicolás": ["Ley 319: Protección de ríos", "Ley 320: Restricción de altura"],
          "Rauch": ["Ley 321: Conservación de suelos", "Ley 322: Regulación de construcción"],
          "Mercedes": ["Ley 323: Control de humedales", "Ley 324: Uso sostenible de agua"],
          "San Pedro": ["Ley 325: Protección de flora local", "Ley 326: Restricción de expansión urbana"],
          "Luján": ["Ley 327: Regulación de urbanización", "Ley 328: Espacios verdes en barrios nuevos"],
          "Avellaneda": ["Ley 329: Conservación de humedales", "Ley 330: Control de napas"] } },
      "Córdoba": { municipios: { "Córdoba Capital": ["Ley 401: Protección de sierras", "Ley 402: Control de contaminación"],
          "Villa Carlos Paz": ["Ley 403: Conservación del lago San Roque", "Ley 404: Regulación de urbanización"],
          "Río Cuarto": ["Ley 405: Uso sostenible de ríos", "Ley 406: Restricción de altura"],
          "Villa María": ["Ley 407: Protección de parques", "Ley 408: Regulación de industrias"],
          "San Francisco": ["Ley 409: Conservación de humedales", "Ley 410: Espacios verdes obligatorios"],
          "Alta Gracia": ["Ley 411: Protección de patrimonio", "Ley 412: Regulación de construcción"],
          "Bell Ville": ["Ley 413: Uso responsable de suelo", "Ley 414: Control de napas"],
          "Río Tercero": ["Ley 415: Conservación de ríos", "Ley 416: Restricción de industria"],
          "Villa del Rosario": ["Ley 417: Protección de flora", "Ley 418: Regulación de altura"],
          "Jesús María": ["Ley 419: Espacios verdes", "Ley 420: Regulación de urbanización"],
          "Colonia Caroya": ["Ley 421: Protección agrícola", "Ley 422: Uso sostenible del agua"],
          "La Cañada": ["Ley 423: Conservación de suelos", "Ley 424: Restricción de construcciones"],
          "General Deheza": ["Ley 425: Protección de flora autóctona", "Ley 426: Control de humedales"],
          "Corral de Bustos": ["Ley 427: Regulación de urbanización", "Ley 428: Espacios verdes obligatorios"],
          "Oncativo": ["Ley 429: Conservación de parques", "Ley 430: Uso sostenible de suelo"] } },
      "Entre Ríos": { municipios: {"Paraná": ["Ley 501: Protección de ríos", "Ley 502: Regulación de altura"],
    "Concordia": ["Ley 503: Conservación de humedales", "Ley 504: Restricción de industria"],
    "Gualeguaychú": ["Ley 505: Protección de arroyos", "Ley 506: Espacios verdes obligatorios"],
    "Nogoyá": ["Ley 507: Regulación de construcción", "Ley 508: Conservación de suelos"],
    "Concepción del Uruguay": ["Ley 509: Restricción de expansión urbana", "Ley 510: Protección de flora"],
    "Victoria": ["Ley 511: Control de napas", "Ley 512: Uso sostenible de suelo"],
    "Chajarí": ["Ley 513: Regulación de urbaniza/*ción", "Ley 514: Conservación de humedales"],
    "Gualeguay": ["Ley 515: Protección de ríos", "Ley 516: Espacios verdes obligatorios"],
    "Colón": ["Ley 517: Regulación de industria", "Ley 518: Restricción de altura"],
    "Federal": ["Ley 519: Conservación de suelos", "Ley 520: Protección agrícola"],
    "San José": ["Ley 521: Uso responsable de agua", "Ley 522: Protección de flora"],
    "Diamante": ["Ley 523: Regulación de urbanización", "Ley 524: Espacios verdes"],
    "Paraná Campaña": ["Ley 525: Conservación de humedales", "Ley 526: Restricción de construcciones"],
    "Villa Elisa": ["Ley 527: Protección de ríos", "Ley 528: Regulación de altura"],
    "La Paz": ["Ley 529: Control de napas", "Ley 530: Conservación de flora autóctona"] } },
      "Tucumán": { municipios: {   "Corrientes Capital": ["Ley 701: Regulación de altura", "Ley 702: Protección de ríos"],
    "Goya": ["Ley 703: Conservación de humedales", "Ley 704: Restricción de industria"],
    "Mercedes": ["Ley 705: Protección de arroyos", "Ley 706: Espacios verdes"],
    "Paso de los Libres": ["Ley 707: Regulación de urbanización", "Ley 708: Control de napas"],
    "Curuzú Cuatiá": ["Ley 709: Uso sostenible de suelos", "Ley 710: Protección agrícola"],
    "Monte Caseros": ["Ley 711: Restricción de altura", "Ley 712: Conservación de humedales"],
    "Ituzaingó": ["Ley 713: Protección de flora", "Ley 714: Regulación de industria"],
    "San Roque": ["Ley 715: Conservación de ríos", "Ley 716: Espacios verdes obligatorios"],
    "Goya Norte": ["Ley 717: Regulación de construcción", "Ley 718: Control de napas"],
    "Santa Lucía": ["Ley 719: Protección de parques", "Ley 720: Uso responsable de agua"],
    "Lavalle": ["Ley 721: Conservación de suelos", "Ley 722: Restricción de construcciones"],
    "Curuzú Cuatiá Oeste": ["Ley 723: Regulación de urbanización", "Ley 724: Protección de flora autóctona"],
    "Paso de los Libres Sur": ["Ley 725: Conservación de humedales", "Ley 726: Espacios verdes obligatorios"],
    "Bella Vista": ["Ley 727: Regulación de altura", "Ley 728: Protección de ríos"],
    "Empedrado": ["Ley 729: Control de napas", "Ley 730: Uso sostenible de suelos"] } },
      "Corrientes": { municipios: {  "Corrientes Capital": ["Ley 701: Regulación de altura", "Ley 702: Protección de ríos"],
    "Goya": ["Ley 703: Conservación de humedales", "Ley 704: Restricción de industria"],
    "Mercedes": ["Ley 705: Protección de arroyos", "Ley 706: Espacios verdes"],
    "Paso de los Libres": ["Ley 707: Regulación de urbanización", "Ley 708: Control de napas"],
    "Curuzú Cuatiá": ["Ley 709: Uso sostenible de suelos", "Ley 710: Protección agrícola"],
    "Monte Caseros": ["Ley 711: Restricción de altura", "Ley 712: Conservación de humedales"],
    "Ituzaingó": ["Ley 713: Protección de flora", "Ley 714: Regulación de industria"],
    "San Roque": ["Ley 715: Conservación de ríos", "Ley 716: Espacios verdes obligatorios"],
    "Goya Norte": ["Ley 717: Regulación de construcción", "Ley 718: Control de napas"],
    "Santa Lucía": ["Ley 719: Protección de parques", "Ley 720: Uso responsable de agua"],
    "Lavalle": ["Ley 721: Conservación de suelos", "Ley 722: Restricción de construcciones"],
    "Curuzú Cuatiá Oeste": ["Ley 723: Regulación de urbanización", "Ley 724: Protección de flora autóctona"],
    "Paso de los Libres Sur": ["Ley 725: Conservación de humedales", "Ley 726: Espacios verdes obligatorios"],
    "Bella Vista": ["Ley 727: Regulación de altura", "Ley 728: Protección de ríos"],
    "Empedrado": ["Ley 729: Control de napas", "Ley 730: Uso sostenible de suelos"] } }
    }
  },
  uruguay: {
    provincias: {
      "Montevideo": {
        municipios: {
          "Montevideo": ["Ley 301: Restricción en la rambla", "Ley 302: Reforestación urbana"]
        }
      },
      "Canelones": {
        municipios: {
          "Ciudad de la Costa": ["Ley 303: Protección de dunas", "Ley 304: Control expansión urbana"]
        }
      }
    }
  }
};

// --- Referencias a selects y div de leyes ---
const paisSelect = document.getElementById('pais');
const provinciaSelect = document.getElementById('provincia');
const municipioSelect = document.getElementById('municipio');
const lawContent = document.getElementById('lawContent');

// --- Eventos de cascada país → provincia → municipio ---
paisSelect.addEventListener('change', () => {
  provinciaSelect.innerHTML = '<option value="">-- Seleccionar provincia --</option>';
  municipioSelect.innerHTML = '<option value="">-- Seleccionar municipio --</option>';
  municipioSelect.disabled = true;
  lawContent.innerHTML = "";

  if (paisSelect.value) {
    const provincias = data[paisSelect.value].provincias;
    for (let prov in provincias) {
      let opt = document.createElement('option');
      opt.value = prov;
      opt.textContent = prov;
      provinciaSelect.appendChild(opt);
    }
    provinciaSelect.disabled = false;
  } else {
    provinciaSelect.disabled = true;
  }
});

provinciaSelect.addEventListener('change', () => {
  municipioSelect.innerHTML = '<option value="">-- Seleccionar municipio --</option>';
  lawContent.innerHTML = "";

  if (provinciaSelect.value) {
    const municipios = data[paisSelect.value].provincias[provinciaSelect.value].municipios;
    for (let muni in municipios) {
      let opt = document.createElement('option');
      opt.value = muni;
      opt.textContent = muni;
      municipioSelect.appendChild(opt);
    }
    municipioSelect.disabled = false;
  } else {
    municipioSelect.disabled = true;
  }
});

municipioSelect.addEventListener('change', () => {
  lawContent.innerHTML = "";
  if (municipioSelect.value) {
    const leyes = data[paisSelect.value].provincias[provinciaSelect.value].municipios[municipioSelect.value];
    let ul = document.createElement('ul');
    leyes.forEach(l => {
      let li = document.createElement('li');
      li.textContent = l;
      ul.appendChild(li);
    });
    lawContent.appendChild(ul);
  }
});

// --- Función para expandir un panel ---
function expandPanel(panel) {
  if (expanded === panel) return;

  backButton.style.display = 'block'; // mostrar botón volver

  // Ocultar todos los paneles
  mapPanel.style.display = 'none';
  parametersPanel.style.display = 'none';
  lawPanel.style.display = 'none';

  // Mostrar solo el panel seleccionado
  if (panel === mapPanel) {
    mapPanel.style.display = 'flex';
    mapPanel.style.flex = '1';
    infoPanel.style.display = 'none'; // ocultar parámetros y leyes al ampliar mapa
  } else if (panel === parametersPanel) {
    parametersPanel.style.display = 'flex';
    parametersPanel.style.flex = '1';
    lawPanel.style.display = 'none';
    mapPanel.style.display = 'none';
    infoPanel.style.display = 'flex';
  } else if (panel === lawPanel) {
    lawPanel.style.display = 'flex';
    lawPanel.style.flex = '1';
    parametersPanel.style.display = 'none';
    mapPanel.style.display = 'none';
    infoPanel.style.display = 'flex';
  }

  expanded = panel;
}

// --- Eventos click para expandir cada panel ---
mapPanel.addEventListener('click', () => expandPanel(mapPanel));
parametersPanel.addEventListener('click', () => expandPanel(parametersPanel));
lawPanel.addEventListener('click', () => expandPanel(lawPanel));

// --- Botón volver ---
backButton.addEventListener('click', () => {
  mapPanel.style.flex = '1';
  mapPanel.style.display = 'flex';

  parametersPanel.style.flex = '1';
  parametersPanel.style.display = 'flex';

  lawPanel.style.flex = '1';
  lawPanel.style.display = 'flex';

  infoPanel.style.display = 'flex'; // mostrar parámetros y leyes
  backButton.style.display = 'none';
  expanded = null;
});
