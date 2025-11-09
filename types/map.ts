export type ArtisanalSiteDetailsProps = {
  sources: string
  site_name: string
  visit_date: string
  site_visit__bgr: string
  site_visit__cgsp: string
  geom: string
  longitude: number
  latitude: number
  location_origin: string
  province__territory: string
  cooperative_in_charge: string | null
  employees: number
  minerals_extracted: string
  point_of_sale__purchasing_station: string | null
  status_in_2023: string
}

export type IndustralProjectDetailsProps = {
  'N°': string
  _project_id: string
  Project_name: string
  Short_name: string
  Permit_ID: string
  Code: string
  Ownership: string
  Nationality: string
  'Copper/Cobalt_annual_production_(2022)': string
  ISO_A3: string
  Province: string
  Geographical_coordinates: string
  latitude_longitude: string
  Geographical_description_project_description: string
  Project_size: string
  'Deposit_size_(official_reserves)'?: string
  'Mine_life/permit_validity': string
  Mine_type: string
  Contract_type: string
  Share_allocation: string
  Project_background?: string
  Management?: string
  NumberOfEmployees?: string
  SourcesLinks?: string
  Nat0: string
  Nat1: string
}

export type MonthlyProductionData = {
  _project_id: string
  month: string
  quantity_tons: string
  product: string
}

export type NewMonthlyProductionData = {
  month: string
  quantity: string
  product: string
}

// T in TMonthlyProductionData means transformed
export type TMonthlyProductionData = {
  month: string
  Cobalt: number
  Copper: number
}

export type DestinationData = {
  _project_id: string
  quantity_tons: string //  Sum of dry_weight_decl
  destination: string
}

export type TDestinationData = {
  destination: string
  quantity_tons: number
  label: string
}

// ----------------------------------------Additional Information Markers

type CRS = {
  type: 'name'
  properties: {
    name: string
  }
}

type Geometry = {
  type: 'Point'
  coordinates: [number, number]
}

type Feature = {
  type: 'Feature'
  properties: {
    country: string
    project_name: string
    description: string
    infrastructure_development_type: string
  }
  geometry: Geometry
}

type xFeature = {
  type: 'Feature'
  properties: {
    name: string
    corridor_name: string
    country: string
    province: string
    description: string
    products_transported: string
  }
  geometry: Geometry
}

export type BorderPost = {
  type: 'FeatureCollection'
  name: string
  crs: CRS
  features: Feature[]
}

export type GeoJSONExportPort = {
  type: 'FeatureCollection'
  name: string
  crs: CRS
  features: xFeature[]
}
