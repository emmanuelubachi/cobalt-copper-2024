export type YearlySummaryProps = {
  year: string
  totalCopper: number
  totalCobalt: number
}

export type YearlyExportDataProps = {
  year: string
  month: string
  quantity: string
  product: string
}

export type DetailedYearlySummary = {
  year: string
  totalCopperExport: number
  totalCopperLocal: number
  totalCobaltExport: number
  totalCobaltLocal: number
}

export type ProjectSummary = {
  _project_id: string
  totalCobalt: number
  totalCopper: number
}

export type DestinationSummary = {
  destination: string
  totalQuantityTons: string
}

export type CompaniesListProps = {
  value: string
  label: string
  flagCode: string
  children: {
    value: string
    label: string
  }[]
}[]

export interface ProjectDataProps {
  Project_name: string
  Short_name: string
  Ownership: string
  Nationality: string
  Province: string
  Geographical_coordinates: string
  latitude_longitude: string
  longitude: string
  latitude: string
  Geographical_description_project_description: string
  Project_size: string
  Deposit_size_official_reserves: string
  Mine_life_permit_validity: string
  Mine_type: string
  Contract_type: string
  Share_allocation: string
  Project_background: string
  _project_id: string
}
