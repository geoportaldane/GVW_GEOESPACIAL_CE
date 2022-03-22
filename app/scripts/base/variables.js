// Geovisor - OpenLayers | Variables Globales
export const variables = {

    title: 'Geovisor Resultados del Conteo de Unidades Económicas', //Cambielo por el título de su geovisor
    description: 'Visor para consulta de los Resultados del Conteo de Unidades Económicas.',
    country: 'Colombia',
    place: ' Todos los departamentos ',
    year: ' 2021 ',
    map: null,
    urlTemas: 'https://nowsoft.app/geoportal/laboratorio/serviciosjson/visores/temas_upper.php', //enlace/servicio  que trae el servicio de las tematicas por visor
    urlVariables: 'https://nowsoft.app/geoportal/laboratorio/serviciosjson/visores/variables8_upper.php',//enlace/servicio  que trae los datos de la variable seleccionada
    codVisor: "45", //Ponga el codigo que corresponde a SU VISOR
    varVariable: "26402001", //Ponga el codigo de la CATEGORIA que corresponda a su visor
    series: [0, 0, 0, 0, 0],
    // urlUE: "https://geoportal.dane.gov.co/laboratorio/serviciosjson/censo_economico/unidades2_segment.php?min=y&codigo_municipio=",
    // urlCount: "https://geoportal.dane.gov.co/laboratorio/serviciosjson/censo_economico/unidades2_segment.php?count=y&codigo_municipio=",
    key: "pk.eyJ1IjoiYXBwbW92aWxkYW5lIiwiYSI6ImNrbzY4b2tiajFxN2cyb3F3YnR1NDF6eWkifQ.mVlSJXQZVl4CNmQpZ1pXNA",
    baseMaps: {
        'Gris': 'https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}?access_token=',
        'Noche': 'https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}?access_token=',
        'OSM': 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=',
        'Satelital': 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=',
    },
    baseMapCheck: "Gris",  // Ponga el MAPA BASE que quiere por defecto
    layers: {
        departamentos: {
            tipo: "vt",  // Tipos vt: Vector Tile, wms, wfs
            id: "deptos_vt",
            url: "https://nowsoft.app/vector-tiles/maps/geoportal_dane/mgn_2020_dpto_politico/{z}/{x}/{y}.pbf",
            title: 'Departamentos',
            visible: true,
            minZoom: 3,
            maxZoom: 21,
            style: {
                stroke: {
                    color: '#7F3872',
                    width: 2
                }
            },
            ol: null
        },
        departamentoSel: {
            tipo: "vt",  // Tipos vt: Vector Tile, wms, wfs
            id: "deptos_vt2",
            url: "https://nowsoft.app/vector-tiles/maps/geoportal_dane/mgn_2020_dpto_politico/{z}/{x}/{y}.pbf",
            title: 'Departamentos sel',
            visible: true,
            checked: false,
            minZoom: 1,
            maxZoom: 12,
            hideToc: true,
            style: {
                stroke: {
                    color: '#ffffff00',
                    width: 0
                }
            },
            ol: null
        },
        municipios: {
            tipo: "vt",  // Tipos vt: Vector Tile, wms, wfs
            id: "mpios_vt",
            url: "https://nowsoft.app/vector-tiles/maps/geoportal_dane/mgn_2020_mpio_politico/{z}/{x}/{y}.pbf",
            title: 'Municipios',
            visible: true,
            checked: true,
            minZoom: 7,
            maxZoom: 21,
            style: {
                stroke: {
                    // color: '#FFF',
                    color: '#000000',
                    width: 0.1
                }
            },
            ol: null
        },
        manzanas: {
            tipo: "vt",  // Tipos vt: Vector Tile, wms, wfs
            id: "mzn_vt",
            url: "https://nowsoft.app/vector-tiles/maps/geoportal_dane/MGN_2018_URB_MANZANA/{z}/{x}/{y}.pbf",
            title: 'manzanas',
            visible: true,
            minZoom: 12,
            maxZoom: 21,
            style: {
                stroke: {
                    color: '#c086f0',
                    width: 1
                }
            },
            ol: null
        },
        clase: {
            tipo: "wms",  // Tipos vt: Vector Tile, wms, wfs
            id: "clase_wms",
            url: "https://nowsoft.app/geoserver/geoportal/wms",
            layer: 'geoportal:mgn2020_area_censal',
            title: 'Area Censal Urbana',
            visible: true,
            checked: true,
            minZoom: 9,
            maxZoom: 13,
            ol: null
        },
        vial: {
            tipo: "wms",  // Tipos vt: Vector Tile, wms, wfs
            id: "vial_wms",
            url: "https://nowsoft.app/geoserver/geoportal/wms",
            layer: 'geoportal:red_vial_nacional',
            title: 'Red Vial Nacional (INVIAS)',
            visible: false,
            checked: false,
            minZoom: 9,
            maxZoom: 13,
            ol: null
        },
        resguardos: {
            tipo: "wms",  // Tipos vt: Vector Tile, wms, wfs
            id: "resguardos_wms",
            url: "https://nowsoft.app/geoserver/geoportal/wms",
            layer: 'geoportal:ant_resguardos',
            title: 'Resguardos indígenas',
            visible: false,
            checked: false,
            minZoom: 9,
            maxZoom: 13,
            style: {
                stroke: {
                    color: '#7F3872',
                    width: 1
                }
            },
            ol: null
        },
        pnn: {
            tipo: "wms",  // Tipos vt: Vector Tile, wms, wfs
            id: "pnn_wms",
            url: "https://nowsoft.app/geoserver/geoportal/wms",
            layer: 'postgis:PARQUES_NATURALES ',
            title: 'Parques nacionales naturales',
            visible: false,
            checked: false,
            minZoom: 9,
            maxZoom: 13,
            style: {
                stroke: {
                    color: '#7F3872',
                    width: 1
                }
            },
            ol: null
        },
        cmn: {
            tipo: "wms",  // Tipos vt: Vector Tile, wms, wfs
            id: "cmn_wms",
            url: "https://nowsoft.app/geoserver/geoportal/wms",
            layer: 'geoportal:ant_cons_comunitariosn',
            title: 'Territorios colectivos de comunidades negras',
            visible: false,
            checked: false,
            minZoom: 9,
            maxZoom: 13,
            style: {
                stroke: {
                    color: '#7F3872',
                    width: 1
                }
            },
            ol: null
        },
        zrc: {
            tipo: "wms",  // Tipos vt: Vector Tile, wms, wfs
            id: "zrc_wms",
            url: "https://nowsoft.app/geoserver/geoportal/wms",
            layer: 'geoportal:ant_zrcampesina',
            title: 'Zonas de reserva campesina',
            visible: false,
            checked: false,
            minZoom: 9,
            maxZoom: 13,
            style: {
                stroke: {
                    color: '#7F3872',
                    width: 1
                }
            },
            ol: null
        },
        veredas: {
            tipo: "wms",  // Tipos vt: Vector Tile, wms, wfs
            id: "veredas_wms",
            url: "https://nowsoft.app/geoserver/geoportal/wms",
            layer: 'geoportal:veredas_2020',
            title: 'Nivel de referencia de veredas',
            visible: false,
            checked: false,
            minZoom: 9,
            maxZoom: 13,
            style: {
                stroke: {
                    color: '#7F3872',
                    width: 1
                }
            },
            ol: null
        },
    },
    // checkedLayers :{},
    // changeLoader: null,
    layersInMap: [],
    consulta: "as",
    tematica: JSON.parse(localStorage.getItem('tematica')) != null ? JSON.parse(localStorage.getItem('tematica')) : {
        "GRUPOS": {},
        "SUBGRUPOS": {},
        "TEMAS": [],
        "CATEGORIAS": {}
    },
    tema: null,
    dataArrayDatosMpio: {},
    dataArrayDatos: {},
    dataArrayDatosManzana: {},
    dataRangos: JSON.parse(localStorage.getItem('rangos')) != null ? JSON.parse(localStorage.getItem('rangos')) : {},
    dataRangos: {},
    dataChart: {},
    changeTheme: null,
    coloresLeyend: JSON.parse(localStorage.getItem('leyenda')) != null ? JSON.parse(localStorage.getItem('leyenda')) : {},
    coloresLeyend: {},
    changeLegend: null,
    changeChart: null,
    changeMap: null,
    queryText: {},
    alias: null,
    valorTotal: null,
    pintarCluster: null,
    capas: {},
    legenTheme: null,
    legendChange: null,
    tipoVar: null,
    thematicTheme: null,
    tansparency: 10,
    listaVariables: [],
    labelsData: [],
    dataPie: [],
    changeLoader: null,
    changeData: null,
    updateData: null,
    filterGeo: null,
    deptoSelected: null,
    deptoSelectedFilter: null,
    deptoVariable: null,
    currentZoom: null,
    changeBarChartData: null,
    changePieChartData: null,
    changeDonuChartData: null,
    changeGaugeChartData: null,
    visualGroup: null,
    visualThematic: null,
    state: {
        labels: [],

        datasets: [
            {
                label: '',
                // labels: myLabels,
                backgroundColor: [],
                data: []
            }
        ]
    },
    structureUE: {
        "M": "Manzana",
        "E": "Edificación",
        "UE": "Unidad económica",
        "U": "Unidad",
        "EO": "Cantidad de unidades ocupadas",
        "ED": "Cantidad de unidades desocupadas",
        "EB": "Cantidad de unidades en obra",
        "EF": "Cantidad de unidades fijas",
        "ES": "Cantidad de unidades semifijas",
        "PM": "Cantidad de puestos móviles",
        "VA": "Cantidad de viviendas con actividad económica",
        "OBE": "Cantidad de obras en edificación",
        "SC": "Cantidad de unidades - comercio",
        "SI": "Cantidad de unidades - industria",
        "SS": "Cantidad de unidades - servicios",
        "ST": "Cantidad de unidades - transporte",
        "SCN": "Cantidad de unidades - construcción",
        "SN": "Cantidad de unidades - Sector no aplica",
        "LT": "Latitud",
        "LG": "Longitud",
    },
    unidadesCluster: null,
    distanceCluster: 40,
    loadUE: null,
    changeBaseMap: null,
    activeChart: null,
    baseMapPrev: "Gris",
    changeDepto: null,
    listaCapitales: [
        '05001',
        '08001',
        '13001',
        '15001',
        '17001',
        '18001',
        '19001',
        '20001',
        '23001',
        '27001',
        '41001',
        '44001',
        '47001',
        '50001',
        '52001',
        '54001',
        '63001',
        '66001',
        '68001',
        '70001',
        '73001',
        '76001',
        '81001',
        '85001',
        '86001',
        '88001',
        '91001',
        '94001',
        '95001',
        '97001',
        '99001'
    ],
    deptoConsulta: null,
    municipioConsulta: null,
    apiGoogle: 'AIzaSyAOha4Su8EqOFQfDE8NjrS_KdSHfu50WkA',
    changeStyleDepto: null,
    changeStyleMpio: null,
    data_dc: {},
    colorMedio: null
}
export const urlDeploy = 'http://localhost:3000/'