import {
  LineChart,
  Map,
  Pickaxe,
  GitCompareArrows,
  Building,
} from "lucide-react";
import { NavItem } from "@/types";

export const defaultPRoject = "ruashi";

export const NAVLIST: NavItem[] = [
  {
    name: "Map",
    path: "/",
    link: "/",
    icon: Map,
  },
  {
    name: "Overview",
    path: "/production-overview",
    link: "/production-overview",
    icon: LineChart,
  },
  {
    name: "Flows",
    path: "/export-flows",
    link: "/export-flows",
    icon: GitCompareArrows,
  },
  {
    name: "Project",
    path: "/projects",
    link: `/projects`,
    icon: Pickaxe,
  },

  {
    name: "Companies",
    path: "/companies",
    link: "/companies",
    icon: Building,
  },
];

export const NATIONALITYLIST: string[] = [
  "Australia",
  "China",
  "China and Canada",
  "DR Congo",
  "India",
  "Kazakhstan",
  "South Africa",
  "Switzerland",
  "Unknown",
  "USA",
];

export const CompaniesList = [
  {
    value: "Australia",
    label: "Australia",
    flagCode: "AU",
    children: [
      {
        value: "sek",
        label: "Societe D'Exploitation De Kipoi",
      },
    ],
  },
  {
    value: "Canada",
    label: "Canada",
    flagCode: "CA",
    children: [
      {
        value: "kamoa",
        label: "Kamoa Copper SA",
      },
    ],
  },
  {
    value: "China",
    label: "China",
    flagCode: "CN",
    children: [
      {
        value: "anvil",
        label: "Anvil Mining Congo SARL",
      },
      {
        value: "ccr",
        label: "Chengtun Congo Ressources SARL",
      },
      {
        value: "cdm",
        label: "Congo Dongfang International Mining",
      },
      {
        value: "cjcmc",
        label: "Congo Jinjun Cheng",
      },
      {
        value: "cnmc",
        label: "Societe Cnmc Congo Compagnie Minier",
      },
      {
        value: "comika",
        label: "Compagnie Miniere De Kambove SPRL",
      },
      {
        value: "comilu",
        label: "Compagnie Miniere De Luisha",
      },
      {
        value: "commus",
        label: "La Compagnie Miniere De Musonoie Gl",
      },
      // {
      //   value: "congo_moon",
      //   label: "Congo Moon Mining SARL",
      // },
      {
        value: "divine",
        label: "Divine Land Mining SARL",
      },
      {
        value: "everbright",
        label: "Everbright Mining SARL",
      },
      {
        value: "excellen",
        label: "Excelent Minerals SARL",
      },
      {
        value: "hmc",
        label: "Hanuri Metal Congo",
      },
      {
        value: "huachin_mabende",
        label: "CNMC Huachin Mabende Mining SPRL",
      },
      {
        value: "huachin_metal",
        label: "Huachin Metal Leach SPRL",
      },
      {
        value: "jxcom",
        label: "Jin Xun Congo Mining SARL",
      },
      {
        value: "kaipeng",
        label: "Societe Kai Peng Mining",
      },
      {
        value: "kalongwe",
        label: "Kalongwe Mining S.A",
      },
      {
        value: "kambove",
        label: "Kambove Mining SAS",
      },
      {
        value: "kamoa",
        label: "Kamoa Copper SA",
      },
      {
        value: "kfm",
        label: "Kisanfu Mining",
      },
      {
        value: "kicc",
        label: "Kinsenda Copper Company SARL",
      },
      {
        value: "lamikal",
        label: "La Miniere De Kalunkundi",
      },
      {
        value: "lcs",
        label: "Lualaba Copper Smelter SAS",
      },
      {
        value: "lr_sas",
        label: "Luilu Ressources SAS",
      },
      {
        value: "mm",
        label: "Metal Mines SPRL",
      },
      {
        value: "mikas",
        label: "La Miniere De Kasombo",
      },
      {
        value: "mjm",
        label: "Macrolink Jiayuan Mining SPRL",
      },
      {
        value: "mkm",
        label: "La Miniere De Kalunbwe Myunga",
      },
      {
        value: "mmg",
        label: "MMG Kinsevere SARL",
      },
      {
        value: "mmt",
        label: "Mineral Metal Technology SARL",
      },
      {
        value: "new_minerals",
        label: "New Minerals",
      },
      {
        value: "ruashi",
        label: "Ruashi Mining SPRL",
      },
      {
        value: "sabwe",
        label: "Sabwe Mining SARL",
      },
      {
        value: "shituru",
        label: "Shituru Mining Corporation SPRL",
      },
      {
        value: "sicomines",
        label: "Sino Congolaise Des Mines SARL",
      },
      {
        value: "somidez",
        label: "Societe Miniere De Deziwa SAS",
      },
      {
        value: "tcc",
        label: "Tengyuan Cobalt & Copper Resources",
      },
      {
        value: "tfm",
        label: "Tenke Fungurume Mining",
      },
      {
        value: "thomas",
        label: "Thomas Mining SARL",
      },
    ],
  },
  {
    value: "DR Congo",
    label: "DR Congo",
    flagCode: "CD",
    children: [
      {
        value: "amical",
        label: "Amical Kakana Mining SPRL",
      },
      {
        value: "gcm",
        label: "GECAMINES",
      },

      {
        value: "stl",
        label: "Societe Pour Le Traitement Du Terril De Lubumbashi",
      },
    ],
  },
  {
    value: "India",
    label: "India",
    flagCode: "IN",
    children: [
      {
        value: "chemaf",
        label: "Chemical Of Africa SPRL",
      },
      {
        value: "golden",
        label: "Golden Africa Resources SPRL",
      },
      {
        value: "kimin",
        label: "Kisanfu Mining SPRL",
      },
      {
        value: "omr",
        label: "Om Metal Ressources SPRL",
      },
      {
        value: "rubamin",
        label: "Rubamin SARL",
      },
      {
        value: "somika",
        label: "Societe Miniere Du Katanga",
      },
      {
        value: "kastro",
        label: "Katanga Strategic Resources",
      },
    ],
  },
  {
    value: "Kazakhstan",
    label: "Kazakhstan",
    flagCode: "KZ",
    children: [
      {
        value: "boss",
        label: "Boss Mining SPRL",
      },
      {
        value: "comide",
        label: "La Congolaise Des Mines Et De Devel",
      },
      {
        value: "frontier",
        label: "Kalongwe Mining S.A",
      },
      {
        value: "metalkol",
        label: "Compagnie De Traitement Des Rejets KingyamBo",
      },
    ],
  },
  {
    value: "South Africa",
    label: "South Africa",
    flagCode: "ZA",
    children: [
      {
        value: "mpc",
        label: "Mining Progress Company SARL",
      },
    ],
  },
  {
    value: "Switzerland",
    label: "Switzerland",
    flagCode: "CH",
    children: [
      {
        value: "kcc",
        label: "Kamoto Copper Company SARL",
      },
      {
        value: "mumi",
        label: "Mutanda Mining SARL",
      },
    ],
  },
];

export const IndustralProjectsNode = [
  {
    value: "Australia",
    label: "Australia",
    children: [
      {
        value: "sek",
        label: "Societe D'Exploitation De Kipoi",
      },
    ],
  },
  {
    value: "Canada",
    label: "Canada",
    children: [
      {
        value: "kamoa",
        label: "Kamoa Copper SA",
      },
    ],
  },
  {
    value: "China",
    label: "China",
    children: [
      {
        value: "anvil",
        label: "Anvil Mining Congo SARL",
      },
      {
        value: "ccr",
        label: "Chengtun Congo Ressources SARL",
      },
      {
        value: "cdm",
        label: "Congo Dongfang International Mining",
      },
      {
        value: "cjcmc",
        label: "Congo Jinjun Cheng",
      },
      {
        value: "cnmc",
        label: "Societe Cnmc Congo Compagnie Minier",
      },
      {
        value: "comika",
        label: "Compagnie Miniere De Kambove SPRL",
      },
      {
        value: "comilu",
        label: "Compagnie Miniere De Luisha",
      },
      {
        value: "commus",
        label: "La Compagnie Miniere De Musonoie Gl",
      },
      {
        value: "congo_moon",
        label: "Congo Moon Mining SARL",
      },
      {
        value: "divine",
        label: "Divine Land Mining SARL",
      },
      {
        value: "everbright",
        label: "Everbright Mining SARL",
      },
      {
        value: "excellen",
        label: "Excelent Minerals SARL",
      },
      {
        value: "hanrui_metal",
        label: "Hanuri Metal Congo",
      },
      {
        value: "huachin_mabende",
        label: "CNMC Huachin Mabende Mining SPRL",
      },
      {
        value: "huachin metal",
        label: "Huachin Metal Leach SPRL",
      },
      {
        value: "jxcom",
        label: "Jin Xun Congo Mining SARL",
      },
      {
        value: "kaipeng",
        label: "Societe Kai Peng Mining",
      },
      {
        value: "kalongwe",
        label: "Kalongwe Mining S.A",
      },
      {
        value: "kambove",
        label: "Kambove Mining SAS",
      },
      {
        value: "kamoa_china",
        label: "Kamoa Copper SA",
      },
      {
        value: "kfm",
        label: "Kisanfu Mining",
      },
      {
        value: "kicc",
        label: "Kinsenda Copper Company SARL",
      },
      {
        value: "lamikal",
        label: "La Miniere De Kalunkundi",
      },
      {
        value: "lcs",
        label: "Lualaba Copper Smelter SAS",
      },
      {
        value: "lr_sas",
        label: "Luilu Ressources SAS",
      },
      {
        value: "mm",
        label: "Metal Mines SPRL",
      },
      {
        value: "mikas",
        label: "La Miniere De Kasombo",
      },
      {
        value: "mjm",
        label: "Macrolink Jiayuan Mining SPRL",
      },
      {
        value: "mkm",
        label: "La Miniere De Kalunbwe Myunga",
      },
      {
        value: "mmg",
        label: "MMG Kinsevere SARL",
      },
      {
        value: "mmt",
        label: "Mineral Metal Technology SARL",
      },
      {
        value: "new_minerals",
        label: "New Minerals",
      },
      {
        value: "ruashi",
        label: "Ruashi Mining SPRL",
      },
      {
        value: "sabwe",
        label: "Sabwe Mining SARL",
      },
      {
        value: "shituru",
        label: "Shituru Mining Corporation SPRL",
      },
      {
        value: "sicomines",
        label: "Sino Congolaise Des Mines SARL",
      },
      {
        value: "somidez",
        label: "Societe Miniere De Deziwa SAS",
      },
      {
        value: "tcc",
        label: "Tengyuan Cobalt & Copper Resources",
      },
      {
        value: "tfm",
        label: "Tenke Fungurume Mining",
      },
      {
        value: "thomas",
        label: "Thomas Mining SARL",
      },
    ],
  },
  {
    value: "DR Congo",
    label: "DR Congo",
    children: [
      {
        value: "amical",
        label: "Amical Kakana Mining SPRL",
      },
      {
        value: "gcm",
        label: "GECAMINES",
      },

      {
        value: "stl",
        label: "Societe Pour Le Traitement Du Terril De Lubumbashi",
      },
    ],
  },
  {
    value: "India",
    label: "India",
    children: [
      {
        value: "chemaf",
        label: "Chemical Of Africa SPRL",
      },
      {
        value: "golden",
        label: "Golden Africa Resources SPRL",
      },
      {
        value: "kimin",
        label: "Kisanfu Mining SPRL",
      },
      {
        value: "omr",
        label: "Om Metal Ressources SPRL",
      },
      {
        value: "rubamin",
        label: "Rubamin SARL",
      },
      {
        value: "somika",
        label: "Societe Miniere Du Katanga",
      },
      {
        value: "kastro",
        label: "Katanga Strategic Resources",
      },
    ],
  },
  {
    value: "Kazakhstan",
    label: "Kazakhstan",
    children: [
      {
        value: "boss",
        label: "Boss Mining SPRL",
      },
      {
        value: "comide",
        label: "La Congolaise Des Mines Et De Devel",
      },
      {
        value: "frontier",
        label: "Kalongwe Mining S.A",
      },
      {
        value: "metalkol",
        label: "Compagnie De Traitement Des Rejets KingyamBo",
      },
    ],
  },
  {
    value: "South Africa",
    label: "South Africa",
    children: [
      {
        value: "mpc",
        label: "Mining Progress Company SARL",
      },
    ],
  },
  {
    value: "Switzerland",
    label: "Switzerland",
    children: [
      {
        value: "kcc",
        label: "Kamoto Copper Company SARL",
      },
      {
        value: "mumi",
        label: "Mutanda Mining SARL",
      },
    ],
  },
  // {
  //   value: "Unknown",
  //   label: "Unknown",
  //   children: [

  //     {
  //       value: "societe_kasonta",
  //       label: "Societe Miniere De Kasonta",
  //     },
  //   ],
  // },
];

export const CheckAllIndustralProjects = [
  "amical",
  "anvil",
  "benco",
  "boss",
  "ccr",
  "cdm",
  "chemaf",
  "cjcmc",
  "cnmc",
  "comide",
  "comika",
  "comilu",
  "commus",
  "congo_moon",
  "divine",
  "everbright",
  "excellen",
  "frontier",
  "gcm",
  "golden",
  "hanrui_metal",
  "huachin_mabende",
  "huachin metal",
  "jxcom",
  "kaipeng",
  "kalongwe",
  "kambove",
  "kamoa",
  "kansonga",
  "kastro",
  "kcc",
  "kfm",
  "kicc",
  "kimin",
  "lamikal",
  "lcs",
  "lr_sas",
  "metalkol",
  "mikas",
  "mjm",
  "mkm",
  "mm",
  "mmg",
  "mmt",
  "mpc",
  "msl",
  "mumi",
  "new_minerals",
  "omr",
  "ruashi",
  "rubamin",
  "sabwe",
  "sek",
  "semhkat",
  "shituru",
  "sicomines",
  "societe_kasonta",
  "somidez",
  "somika",
  "stl",
  "tcc",
  "tfm",
  "thomas",
];

export const countriesWithColors = [
  { country: "Australia", color: "#546475" },
  { country: "Canada", color: "#13B8B1" },
  { country: "China", color: "#F16067" },
  { country: "DR Congo", color: "#ADBCDD" },
  { country: "India", color: "#ECC0A7" },
  { country: "Kazakhstan", color: "#A28882" },
  { country: "South Africa", color: "#033550" },
  { country: "Switzerland", color: "#FB9635" },
];

// export const CheckAllIndustralProjects = [
//   "SEK (Kipoi Mines)",
//   "KAMOA-KAKULA",
//   "ANVIL",
//   "CCR",
//   "CDM",
//   "CJCMC",
//   "CNMC CONGO",
//   "COMIKA",
//   "COMILU",
//   "COMMUS",
//   "DIVINE LAND",
//   "EVERBRIGHT",
//   "EXCELLEN",
//   "HANRUI METAL",
//   "HUACHIN MABENDE",
//   "HUACHIN METAL",
//   "JXCOM",
//   "KAI PENG",
//   "KAMBOVE MINING",
//   "KFM",
//   "KICC",
//   "LAMIKAL",
//   "LCS",
//   "LR SAS",
//   "MM",
//   "MIKAS",
//   "MJM",
//   "MKM SAS",
//   "MMG",
//   "NEW MINERALS",
//   "RUASHI MINING",
//   "SHITURU MINING",
//   "SICOMINES",
//   "SOMIDEZ",
//   "TCC",
//   "TFM",
//   "THOMAS",
//   "GECAMINES",
//   "KALONGWE",
//   "MMT",
//   "STL",
//   "CHEMAF",
//   "GOLDEN AFRICAN",
//   "KIMIN",
//   "OMR",
//   "RUBAMIN",
//   "SOMIKA",
//   "KATANGA STRATEGIC",
//   "BOSS MINING",
//   "COMIDE",
//   "FRONTIER",
//   "METALKOL",
//   "MPC",
//   "KCC",
//   "MUTANDA",
//   "AMICAL KAKANA",
//   "CONGO MOON",
//   "SABWE",
// ];

// export const TreemapData = [
//   // {
//   //   name: "Metals",
//   //   children: [
//   { name: "Axes", size: 1302 },
//   { name: "Axis", size: 24593 },
//   { name: "AxisGridLine", size: 652 },
//   { name: "AxisLabel", size: 636 },
//   { name: "CartesianAxes", size: 6703 },
//   //   ],
//   // },
//   // {
//   //   name: "Cobalt",
//   //   children: [
//   //     { name: "AnchorControl", size: 2138 },
//   //     { name: "ClickControl", size: 3824 },
//   //     { name: "Control", size: 1353 },
//   //     { name: "ControlList", size: 4665 },
//   //     { name: "DragControl", size: 2649 },
//   //     { name: "ExpandControl", size: 2832 },
//   //     { name: "HoverControl", size: 4896 },
//   //     { name: "IControl", size: 763 },
//   //     { name: "PanZoomControl", size: 5222 },
//   //     { name: "SelectionControl", size: 7862 },
//   //     { name: "TooltipControl", size: 8435 },
//   //   ],
//   // },
//   // {
//   //   name: "Copper",
//   //   children: [
//   //     { name: "Data", size: 20544 },
//   //     { name: "DataList", size: 19788 },
//   //     { name: "DataSprite", size: 10349 },
//   //     { name: "EdgeSprite", size: 3301 },
//   //     { name: "NodeSprite", size: 19382 },
//   //     {
//   //       name: "render",
//   //       children: [
//   //         { name: "ArrowType", size: 698 },
//   //         { name: "EdgeRenderer", size: 5569 },
//   //         { name: "IRenderer", size: 353 },
//   //         { name: "ShapeRenderer", size: 2247 },
//   //       ],
//   //     },
//   //     { name: "ScaleBinding", size: 11275 },
//   //     { name: "Tree", size: 7147 },
//   //     { name: "TreeBuilder", size: 9930 },
//   //   ],
//   // },
//   // {
//   //   name: "Platinum",
//   //   children: [
//   //     { name: "DataEvent", size: 7313 },
//   //     { name: "SelectionEvent", size: 6880 },
//   //     { name: "TooltipEvent", size: 3701 },
//   //     { name: "VisualizationEvent", size: 2117 },
//   //   ],
//   // },
//   // {
//   //   name: "Silver",
//   //   children: [
//   //     { name: "Legend", size: 20859 },
//   //     { name: "LegendItem", size: 4614 },
//   //     { name: "LegendRange", size: 10530 },
//   //   ],
//   // },
//   // {
//   //   name: "Gold",
//   //   children: [
//   //     {
//   //       name: "distortion",
//   //       children: [
//   //         { name: "BifocalDistortion", size: 4461 },
//   //         { name: "Distortion", size: 6314 },
//   //         { name: "FisheyeDistortion", size: 3444 },
//   //       ],
//   //     },
//   //     {
//   //       name: "encoder",
//   //       children: [
//   //         { name: "ColorEncoder", size: 3179 },
//   //         { name: "Encoder", size: 4060 },
//   //         { name: "PropertyEncoder", size: 4138 },
//   //         { name: "ShapeEncoder", size: 1690 },
//   //         { name: "SizeEncoder", size: 1830 },
//   //       ],
//   //     },
//   //     {
//   //       name: "filter",
//   //       children: [
//   //         { name: "FisheyeTreeFilter", size: 5219 },
//   //         { name: "GraphDistanceFilter", size: 3165 },
//   //         { name: "VisibilityFilter", size: 3509 },
//   //       ],
//   //     },
//   //     { name: "IOperator", size: 1286 },
//   //     {
//   //       name: "label",
//   //       children: [
//   //         { name: "Labeler", size: 9956 },
//   //         { name: "RadialLabeler", size: 3899 },
//   //         { name: "StackedAreaLabeler", size: 3202 },
//   //       ],
//   //     },
//   //     {
//   //       name: "layout",
//   //       children: [
//   //         { name: "AxisLayout", size: 6725 },
//   //         { name: "BundledEdgeRouter", size: 3727 },
//   //         { name: "CircleLayout", size: 9317 },
//   //         { name: "CirclePackingLayout", size: 12003 },
//   //         { name: "DendrogramLayout", size: 4853 },
//   //         { name: "ForceDirectedLayout", size: 8411 },
//   //         { name: "IcicleTreeLayout", size: 4864 },
//   //         { name: "IndentedTreeLayout", size: 3174 },
//   //         { name: "Layout", size: 7881 },
//   //         { name: "NodeLinkTreeLayout", size: 12870 },
//   //         { name: "PieLayout", size: 2728 },
//   //         { name: "RadialTreeLayout", size: 12348 },
//   //         { name: "RandomLayout", size: 870 },
//   //         { name: "StackedAreaLayout", size: 9121 },
//   //         { name: "TreeMapLayout", size: 9191 },
//   //       ],
//   //     },
//   //     { name: "Operator", size: 2490 },
//   //     { name: "OperatorList", size: 5248 },
//   //     { name: "OperatorSequence", size: 4190 },
//   //     { name: "OperatorSwitch", size: 2581 },
//   //     { name: "SortOperator", size: 2023 },
//   //   ],
//   // },
// ];
