

# Cobalt & Copper Production - Data Visualization Platform

## Project Documentation

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Key Features](#key-features)
6. [Pages & Routes](#pages--routes)
7. [State Management](#state-management)
8. [Data Processing](#data-processing)
9. [Components](#components)
10. [Setup & Installation](#setup--installation)
11. [Development Guide](#development-guide)
12. [Security Considerations](#security-considerations)
13. [Performance Optimizations](#performance-optimizations)

---

## 🎯 Project Overview

This is a **Next.js 14** data visualization platform focused on tracking and visualizing **Cobalt and Copper production** in the **Democratic Republic of the Congo (DRC)**. The application provides interactive maps, charts, and analytics for mining operations, export flows, and production statistics.

**Key Objectives:**
- Visualize mining project locations and data on interactive maps
- Track production statistics by year, company, and nationality
- Analyze export flows and destinations
- Monitor individual mining project performance
- Provide insights into the copper and cobalt mining industry in DRC

---

## 🏗️ Architecture

### Application Type
- **Framework**: Next.js 14 (App Router)
- **Rendering**: Hybrid (Server-Side Rendering + Client-Side Rendering)
- **Language**: TypeScript
- **Styling**: Tailwind CSS

### Architecture Pattern
- **Pages**: Route-based architecture using Next.js App Router
- **Components**: Modular, reusable React components
- **State**: Zustand for global state management
- **Data**: Static JSON files + CSV processing
- **Maps**: Mapbox GL with GeoJSON data

---

## 🛠️ Tech Stack

### Core Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.2.3 | React framework with SSR |
| React | 18 | UI library |
| TypeScript | 5 | Type-safe JavaScript |
| Tailwind CSS | 3.4.3 | Utility-first CSS |

### Visualization Libraries
- **Recharts** (2.13.0-alpha.4) - Line, bar, area charts
- **Tremor** (3.17.2) - Pre-built chart components
- **ECharts** (5.5.0) - TreeMap and Sankey diagrams
- **Mapbox GL** (3.4.0) - Interactive maps
- **React Map GL** (7.1.7) - React wrapper for Mapbox

### UI Components
- **Shadcn/UI** - Accessible component library
- **Radix UI** - Headless UI primitives
- **Lucide React** (0.381.0) - Icon library
- **Framer Motion** (11.2.10) - Animations
- **Sonner** (1.5.0) - Toast notifications

### State & Data Management
- **Zustand** (4.5.2) - Lightweight state management
- **Zod** (3.23.8) - Schema validation
- **React Responsive** (10.0.0) - Responsive utilities

### Data Processing
- **csv-parse** (5.5.6) - CSV parsing
- **csv2geojson** (5.1.2) - Convert CSV to GeoJSON
- **papaparse** (5.4.1) - CSV parser
- **@turf/turf** (7.0.0) - Geospatial analysis
- **supercluster** (8.0.1) - Map clustering

---


## 📁 Project Structure

```
cobalt/
├── app/                          # Next.js App Router
│   ├── (dashboard)/             # Dashboard layout group
│   │   ├── (root)/              # Map page (home)
│   │   │   ├── components/      # Map-specific components
│   │   │   ├── map.tsx          # Main map component
│   │   │   ├── mapContents.tsx  # Map content layer
│   │   │   ├── layout.tsx       # Map layout
│   │   │   ├── loading.tsx      # Loading state
│   │   │   └── page.tsx         # Map page entry
│   │   ├── production-overview/ # Production statistics
│   │   │   ├── components/      # Overview components
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── export-flows/        # Export flow visualizations
│   │   │   └── page.tsx
│   │   ├── projects/            # Individual project details
│   │   │   ├── components/      # Project components
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── companies/           # Company listings
│   │   │   ├── components/      # Company components
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   └── layout.tsx           # Dashboard layout
│   ├── layout.tsx               # Root layout
│   └── favicon.ico
│
├── components/                   # React components
│   ├── charts/                  # Chart components
│   │   ├── shadcn/             # Shadcn chart implementations
│   │   │   ├── area-chart/
│   │   │   ├── bar-chart/
│   │   │   ├── pie-chart/
│   │   │   ├── radial-chart/
│   │   │   └── tree-map/
│   │   ├── echarts/            # ECharts components
│   │   │   ├── barChart.tsx
│   │   │   └── sankey.tsx
│   │   ├── areaChart.tsx
│   │   ├── barChart.tsx
│   │   ├── barListChart.tsx
│   │   └── treeMap.tsx
│   ├── elements/               # UI elements
│   │   ├── sideNav.tsx         # Sidebar navigation
│   │   ├── bigSideNav.tsx      # Expanded sidebar
│   │   ├── mobileNav.tsx       # Mobile navigation
│   │   ├── filterDrawer.tsx    # Filter panel
│   │   ├── export-flow.tsx     # Export flow component
│   │   ├── backButton.tsx
│   │   ├── filterButton.tsx
│   │   ├── notification.tsx
│   │   ├── searchBar.tsx
│   │   └── shareButton.tsx
│   ├── m-ui/                   # Mobile UI components
│   │   └── combined-drawer.tsx
│   ├── ui/                     # Shadcn UI components (26 components)
│   ├── error-pages/            # Error components
│   ├── svg/                    # SVG components
│   ├── loading.tsx             # Loading component
│   ├── mode-toggle.tsx         # Dark/light mode toggle
│   ├── product-toggle.tsx      # Product filter toggle
│   ├── theme-provider.tsx      # Theme context provider
│   └── year-toggle.tsx         # Year selector
│
├── data/                        # Static data files
│   ├── map/                    # Map-related data
│   │   ├── industrial_projects.csv
│   │   ├── democratic_republic_of_the_congo_mining_permits.geojson
│   │   └── additional_info/    # Routes, posts, ports
│   ├── overview/               # Overview statistics (JSON files)
│   │   ├── kpi_data.json
│   │   ├── co_cu_share_nationality.json
│   │   ├── cobalt_share_nationality.json
│   │   ├── copper_share_nationality.json
│   │   ├── product_export_by_project.json
│   │   ├── product_export_destination.json
│   │   └── export_share_by_project.json
│   ├── projects/               # Project-specific data
│   │   ├── industrial_projects.json
│   │   ├── product_composition_destination.json
│   │   └── projects_monthly_exports.json
│   ├── export-flow/            # Export flow data
│   │   ├── export_flow_from_projects.json
│   │   └── export_flow_from_importers.json
│   ├── obsolete/               # Deprecated data files
│   ├── chartData.ts
│   └── industrial-projects.ts
│
├── lib/                         # Utility functions
│   ├── dataProcessing.ts       # Data transformation (505 lines)
│   ├── geojsonProcessing.ts    # GeoJSON operations
│   ├── fetchData.ts            # Data fetching utilities
│   ├── fetchCsvData.ts         # CSV data fetching
│   ├── readFiles.ts            # File reading utilities
│   ├── useOnWindowResize.ts    # Window resize hook
│   └── utils.ts                # General utilities (cn helper)
│
├── store/                       # Zustand stores
│   ├── filterStore.ts          # Filter drawer state
│   ├── mapFilterStore.ts       # Map filter state
│   ├── mapDetailsStore.ts      # Map details state
│   ├── markerVisibilityStore.ts # Marker visibility state
│   └── navstore.ts             # Navigation state (unused)
│
├── types/                       # TypeScript types
│   ├── index.ts                # General types (NavItem, SearchParams, etc.)
│   ├── map.ts                  # Map-related types
│   ├── overview.ts             # Overview types
│   ├── projects.ts             # Project types
│   └── geojson.d.ts            # GeoJSON type definitions
│
├── constants/                   # Application constants
│   ├── application.ts          # App-wide constants (730 lines)
│   │   ├── NAVLIST             # Navigation items
│   │   ├── NATIONALITYLIST     # Country list
│   │   ├── CompaniesList       # Company directory
│   │   ├── IndustrialProjectsNode # Project tree
│   │   └── countriesWithColors # Color mapping
│   └── chart.ts                # Chart configurations
│
├── hooks/                       # Custom React hooks
│   ├── useDeviceType.tsx       # Device detection hook
│   └── useUpdateSearchParams.tsx # URL params management
│
├── styles/                      # Global styles
│   └── globals.css
│
├── public/                      # Static assets
│   ├── logos/
│   ├── favicon-32x32.png
│   ├── placeholder-image.jpg
│   └── placeholder-user.jpg
│
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript config
├── tailwind.config.ts          # Tailwind config (8112 bytes)
├── next.config.mjs             # Next.js config
├── .eslintrc.json              # ESLint config
├── .prettierrc                 # Prettier config
├── postcss.config.mjs          # PostCSS config
├── components.json             # Shadcn config
├── .gitignore
└── README.md
```

---

## ✨ Key Features

### 1. Interactive Map Visualization
- **Mapbox-powered** interactive map of DRC
- **Mining project markers** with clustering (Supercluster)
- **Mining permits overlay** (GeoJSON polygons)
- **International routes** visualization
- **Border posts** markers
- **Export ports** markers
- **Filter by nationality** and project type
- **Click interactions** for detailed information
- **Responsive zoom** and pan controls

### 2. Production Overview Dashboard
- **KPI cards** showing total production metrics
  - Total quantity (Cobalt + Copper)
  - Total transactions
  - Year-over-year trends
- **Trend charts** for quantity and transactions over time
- **Nationality distribution** (donut charts)
  - Combined Cobalt & Copper share
  - Individual Cobalt share
  - Individual Copper share
- **Top export destinations** by product
- **Production by project** (horizontal bar charts)
- **Year selector** (2022-2024)
- **Export share table** with detailed breakdowns

### 3. Export Flow Analysis
- **Sankey diagrams** showing export flows
  - From projects to destinations
  - From importers to final destinations
- **Interactive filtering** by year
- **Hover tooltips** with detailed information
- **Color-coded flows** by product type

### 4. Project Details
- Individual project performance metrics
- **Monthly export data** (line/area charts)
- **Product composition** by destination
- **Production trends** over time
- **Export flow visualization** (Sankey)
- **Destination breakdown** (bar charts)
- **Year filtering** for historical data
- **Error handling** for invalid project IDs

### 5. Company Directory
- Searchable list of mining companies
- **Grouped by nationality** (8 countries)
- **Flag icons** for visual identification
- **Direct navigation** to project details
- **Hierarchical tree structure**
- **Expandable/collapsible** groups

---

## 🗺️ Pages & Routes

### Route Structure

| Route | Component | Type | Description |
|-------|-----------|------|-------------|
| `/` | `app/(dashboard)/(root)/page.tsx` | Server | Interactive map with mining projects |
| `/production-overview` | `app/(dashboard)/production-overview/page.tsx` | Client | Production statistics dashboard |
| `/export-flows` | `app/(dashboard)/export-flows/page.tsx` | Client | Export flow visualizations |
| `/projects?project_id=X` | `app/(dashboard)/projects/page.tsx` | Server | Individual project details |
| `/companies` | `app/(dashboard)/companies/page.tsx` | Server | Mining companies directory |

### Page Details

#### 1. Map Page (`/`)
- **Type**: Server Component
- **File**: `app/(dashboard)/(root)/page.tsx`
- **Data Sources**:
  - `industrial_projects.csv` - Project locations and metadata
  - `democratic_republic_of_the_congo_mining_permits.geojson` - Mining permit boundaries
  - `lineFiltered.geojson` - International trade routes
  - `posts.geojson` - Border crossing posts
  - `point.geojson` - Export ports

**Data Processing Flow**:
```typescript
1. Read CSV data (industrial projects)
2. Read GeoJSON data (permits, routes, posts, ports)
3. Convert CSV to GeoJSON using csv2geojson
4. Filter features (remove entries with empty codes)
5. Match projects with mining permits by code
6. Combine geometries using Turf.js
7. Process nationality data (split and index)
8. Filter out point geometries (keep polygons only)
9. Render map with processed data
```

**Key Functions Used**:
- [filterFeatures()](cci:1://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/lib/geojsonProcessing.ts:3:0-10:2) - Remove invalid entries
- [matchAndCombineFeatures()](cci:1://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/lib/geojsonProcessing.ts:12:0-45:2) - Merge project data with permit geometries
- [processNationality()](cci:1://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/lib/geojsonProcessing.ts:47:0-64:2) - Parse nationality strings
- [filterOutPoints()](cci:1://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/lib/geojsonProcessing.ts:66:0-73:2) - Keep only polygon features

#### 2. Production Overview (`/production-overview`)
- **Type**: Client Component (`"use client"`)
- **File**: `app/(dashboard)/production-overview/page.tsx`
- **State Management**: Local useState hooks
- **Features**:
  - Year selector (2022-2024)
  - KPI cards with sparkline trends
  - Nationality share donut charts
  - Export by project horizontal bar charts
  - Top destinations bar charts
  - Historical trend line charts
  - Export share data table

**Data Sources** (all JSON):
- `kpi_data.json` - Key performance indicators
- `co_cu_share_nationality.json` - Combined share by country
- `cobalt_share_nationality.json` - Cobalt-specific shares
- `copper_share_nationality.json` - Copper-specific shares
- `product_export_by_project.json` - Export volumes by project
- `product_export_destination.json` - Export destinations
- `export_share_by_project.json` - Market share percentages

**Data Processing**:
- Filters data by selected year
- Calculates percentages and shares
- Aggregates by destination using [summarizeDestinations()](cci:1://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/lib/dataProcessing.ts:274:0-300:1)
- Transforms trend data using [transformTrendData()](cci:1://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/lib/dataProcessing.ts:303:0-331:1)
- Memoizes expensive calculations with `useMemo`

#### 3. Export Flows (`/export-flows`)
- **Type**: Client Component
- **File**: `app/(dashboard)/export-flows/page.tsx`
- **Visualization**: ECharts Sankey diagrams
- **Features**:
  - Year selector (2022-2024)
  - Dual Sankey diagrams (projects → destinations, importers → destinations)
  - Interactive hover effects
  - Share button

**Data Sources**:
- `export_flow_from_projects.json` - Direct project exports
- `export_flow_from_importers.json` - Importer-mediated exports

**Component**: `<ExportFlow />` from `components/elements/export-flow.tsx`

#### 4. Projects ([/projects](cci:7://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/data/projects:0:0-0:0))
- **Type**: Server Component
- **File**: `app/(dashboard)/projects/page.tsx`
- **Query Params**: `project_id` (required)
- **Default Project**: `"ruashi"` (if no param provided)
- **Features**:
  - Project information card
  - Monthly exports line chart
  - Product composition breakdown
  - Export destinations bar chart
  - Export flow Sankey diagram
  - Year filtering
  - Error notifications

**Data Sources**:
- `industrial_projects.json` - Project metadata
- `product_composition_destination.json` - Product breakdown
- `projects_monthly_exports.json` - Monthly time series
- `export_flow_from_projects.json` - Flow data
- `export_flow_from_importers.json` - Importer flow data

**Error Handling**:
- Invalid `project_id` → Redirect to `/companies`
- Missing `project_id` → Redirect to `/projects?project_id=ruashi`
- Project not found → Redirect to `/companies`

**Validation**: Uses Zod schema in [lib/fetchData.ts](cci:7://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/lib/fetchData.ts:0:0-0:0)

#### 5. Companies (`/companies`)
- **Type**: Server Component
- **File**: `app/(dashboard)/companies/page.tsx`
- **Features**:
  - Grid list of companies
  - Grouped by nationality (8 countries)
  - Country flag icons
  - Search/filter functionality
  - Clickable links to project pages

**Data Source**: [constants/application.ts](cci:7://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/constants/application.ts:0:0-0:0) → `CompaniesList`

**Component**: `<GridList />` from `app/(dashboard)/companies/components/gridList.tsx`

---

## 🔄 State Management

### Zustand Stores

#### 1. Filter Store ([store/filterStore.ts](cci:7://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/store/filterStore.ts:0:0-0:0))
```typescript
interface FilterState {
  isFilterOpen: boolean;
  filterDrawerContent: React.ReactNode;
  toggleFilter: () => void;
  setFilterContent: (content: ReactNode) => void;
  openFilter: () => void;
  closeFilter: () => void;
}
```
**Purpose**: Manages filter drawer visibility and dynamic content injection

**Usage**:
```typescript
const { isFilterOpen, setFilterContent, openFilter } = useFilterStore();
```

#### 2. Map Filter Store (`store/mapFilterStore.ts`)
**Purpose**: Manages map filtering options (nationality filters, project type filters)

#### 3. Map Details Store (`store/mapDetailsStore.ts`)
**Purpose**: Stores selected map feature details for popup/sidebar display

#### 4. Marker Visibility Store (`store/markerVisibilityStore.ts`)
**Purpose**: Controls visibility of different marker types on the map (projects, routes, posts, ports)

#### 5. Nav Store ([store/navstore.ts](cci:7://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/store/navstore.ts:0:0-0:0))
**Status**: ⚠️ Not in use (commented in code)
**Note**: Can be removed or repurposed

---

## 📊 Data Processing

### Key Processing Functions

#### GeoJSON Processing ([lib/geojsonProcessing.ts](cci:7://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/lib/geojsonProcessing.ts:0:0-0:0))

1. **[filterFeatures(data: GeoJSONFeatureCollection)](cci:1://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/lib/geojsonProcessing.ts:3:0-10:2)**
   - Removes features with empty `Code` property
   - Returns cleaned GeoJSON collection

2. **[matchAndCombineFeatures(data, overlayData)](cci:1://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/lib/geojsonProcessing.ts:12:0-45:2)**
   - Matches industrial projects with mining permit polygons by code
   - Combines multiple permit geometries using Turf.js `combine()`
   - Assigns combined geometry to project feature
   - Handles multi-code projects (split by `&`)

3. **[processNationality(data, lang)](cci:1://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/lib/geojsonProcessing.ts:47:0-64:2)**
   - Splits nationality strings by `/` delimiter
   - Creates indexed properties (`nat-0`, `nat-1`, etc.)
   - Converts to lowercase for consistent filtering
   - Supports English and French labels

4. **[filterOutPoints(data)](cci:1://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/lib/geojsonProcessing.ts:66:0-73:2)**
   - Removes Point geometries
   - Keeps only Polygon and MultiPolygon features
   - Used to display only permit areas, not project points

5. **[parseCoordinates(coordinateString)](cci:1://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/lib/geojsonProcessing.ts:75:0-102:1)**
   - Parses comma-separated coordinate strings
   - Returns `{ latitude, longitude }` object
   - Includes error handling for invalid formats

#### Data Processing ([lib/dataProcessing.ts](cci:7://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/lib/dataProcessing.ts:0:0-0:0))

**Monthly Data Processing**:

1. **[transformMonthlyData(data: MonthlyProductionData[])](cci:1://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/lib/dataProcessing.ts:13:0-58:1)**
   - Transforms monthly production data for charts
   - Aggregates Cobalt and Copper quantities by month
   - Removes months with no data
   - Returns array of `{ month, Cobalt, Copper }`

**Destination Data Processing**:

2. **[transformDestinationData(data: DestinationData[])](cci:1://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/lib/dataProcessing.ts:67:0-100:1)**
   - Aggregates quantities by project and destination
   - Rounds to 1 decimal place
   - Sorts in descending order by quantity
   - Returns `{ destination, quantity_tons, label }`

3. **[transformSortTopDestination(data)](cci:1://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/lib/dataProcessing.ts:102:0-140:1)**
   - Same as above but returns only top 5 destinations
   - Used for summary views

**Yearly Aggregations**:

4. **[calculateYearlySums(data: MiningData[])](cci:1://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/lib/dataProcessing.ts:152:0-173:1)**
   - Sums Cobalt and Copper production by year
   - Returns `{ year, totalCopper, totalCobalt }[]`

5. **[calculateDetailedYearlySums(data)](cci:1://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/lib/dataProcessing.ts:175:0-206:1)**
   - Separates export vs. local production
   - Returns detailed breakdown by type and year

6. **[calculateProjectSums(data)](cci:1://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/lib/dataProcessing.ts:208:0-234:1)**
   - Aggregates production by project ID
   - Returns `{ _project_id, totalCopper, totalCobalt }[]`

**Destination Summaries**:

7. **[calculateDestinationSums(data, projectIdFilter?)](cci:1://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/lib/dataProcessing.ts:242:0-271:1)**
   - Sums quantities by destination
   - Optional project filtering
   - Sorts by total quantity descending
   - Returns `{ destination, totalQuantityTons }[]`

8. **[summarizeDestinations(data, sortBy?)](cci:1://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/lib/dataProcessing.ts:274:0-300:1)**
   - Aggregates destination data with quantity and transaction counts
   - Optional sorting by 'quantity' or 'transaction'
   - Merges duplicate destinations
   - Returns `OverviewDestinationSummary[]`

**Trend Data Processing**:

9. **[transformTrendData(data: InputData)](cci:1://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/lib/dataProcessing.ts:303:0-331:1)**
   - Transforms time series data for line charts
   - Pivots product column into Cobalt/Copper columns
   - Returns `{ date, Cobalt?, Copper? }[]`

**Product Summaries**:

10. **[calculateProductSummary(data: ProductData[])](cci:1://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/lib/dataProcessing.ts:346:0-376:1)**
    - Aggregates by product type
    - Sums quantity and transaction counts
    - Returns `{ product, totalQuantity, totalTransaction }[]`

11. **[transformProdDesData(data: ProdDesInputData[])](cci:1://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/lib/dataProcessing.ts:391:0-429:1)**
    - Transforms product-destination data
    - Separates Cobalt and Copper columns
    - Sorts by total value (cobalt + copper)
    - Returns `{ destination, cobalt, copper }[]`

**Utility Functions**:

12. **[sortDataByMonth(data: MonthlyData[])](cci:1://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/lib/dataProcessing.ts:437:0-464:1)**
    - Sorts data chronologically by month
    - Uses predefined month order array
    - Returns sorted array

13. **[groupByProductAndConcentration(data)](cci:1://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/lib/dataProcessing.ts:480:0-503:1)**
    - Groups production data by product and concentration level
    - Aggregates quantities and transactions
    - Returns grouped array

---

## 🧩 Components

### Chart Components

#### Recharts-based Charts
Located in [components/charts/](cci:7://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/components/charts:0:0-0:0)

- **`areaChart.tsx`** - Area charts for trend visualization
- **`barChart.tsx`** - Vertical bar charts for comparisons
- **`barListChart.tsx`** - Horizontal bar list with labels

#### ECharts-based Charts
Located in `components/charts/echarts/`

- **`barChart.tsx`** - Advanced bar charts with custom styling
- **`sankey.tsx`** - Sankey flow diagrams for export flows
  - Customizable node/link colors
  - Interactive hover effects
  - Responsive sizing

#### Shadcn Chart Components
Located in `components/charts/shadcn/`

- **`area-chart/`** - Area chart variants with Shadcn styling
- **`bar-chart/`** - Bar chart variants
- **`pie-chart/donut.tsx`** - Donut charts for percentage breakdowns
- **`radial-chart/`** - Radial/circular charts
- **`tree-map/`** - TreeMap visualizations for hierarchical data

### Navigation Components

- **`sideNav.tsx`** - Collapsed sidebar navigation (icons only)
  - Vertical icon menu
  - Active route highlighting
  - Tooltip on hover

- **`bigSideNav.tsx`** - Expanded sidebar navigation
  - Full labels with icons
  - Fixed positioning
  - Desktop only

- **`mobileNav.tsx`** - Mobile bottom navigation
  - Fixed bottom bar
  - Icon + label layout
  - Touch-optimized

- **`filterDrawer.tsx`** - Filter panel drawer
  - Slide-in from right
  - Dynamic content injection
  - Close on backdrop click

### UI Elements

- **[mode-toggle.tsx](cci:7://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/components/mode-toggle.tsx:0:0-0:0)** - Dark/light theme switcher
  - System, light, dark modes
  - Dropdown menu
  - Persists preference

- **[product-toggle.tsx](cci:7://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/components/product-toggle.tsx:0:0-0:0)** - Cobalt/Copper product filter
  - Toggle button group
  - Updates URL params
  - Visual active state

- **[year-toggle.tsx](cci:7://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/components/year-toggle.tsx:0:0-0:0)** - Year selector component
  - Dropdown or button group
  - Callback on change
  - Configurable year list

- **`shareButton.tsx`** - Share functionality
  - Copy current URL
  - Toast notification
  - Icon button

- **`searchBar.tsx`** - Search input component
  - Debounced input
  - Clear button
  - Icon prefix

- **`backButton.tsx`** - Navigation back button
  - Router-based navigation
  - Icon + label

- **`notification.tsx`** - Error notification component
  - Toast-based alerts
  - Error type handling
  - Auto-dismiss

### Layout Components

- **[theme-provider.tsx](cci:7://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/components/theme-provider.tsx:0:0-0:0)** - Theme context provider
  - Wraps application
  - next-themes integration
  - System preference detection

- **[loading.tsx](cci:7://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/components/loading.tsx:0:0-0:0)** - Loading spinner component
  - Centered spinner
  - Used in Suspense fallbacks

### Mobile UI Components

- **`m-ui/combined-drawer.tsx`** - Combined mobile drawer
  - Multi-purpose drawer
  - Swipe gestures
  - Responsive behavior

---

## ⚙️ Setup & Installation

### Prerequisites
- **Node.js**: 18+ or 20+ (LTS recommended)
- **Package Manager**: pnpm (preferred), npm, or yarn
- **Git**: For version control

### Installation Steps

```bash
# 1. Clone the repository
git clone <repository-url>
cd cobalt

# 2. Install dependencies (using pnpm)
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install

# 3. Run development server
pnpm dev
# Server runs at http://localhost:3000

# 4. Build for production
pnpm build

# 5. Start production server
pnpm start

# 6. Run linter
pnpm lint
```



### Development Server

```bash
pnpm dev
```

- Opens at `http://localhost:3000`
- Hot module replacement enabled
- TypeScript type checking
- Fast refresh for React components

### Build Process

```bash
pnpm build
```

- Compiles TypeScript
- Optimizes bundles
- Generates static pages
- Creates production build in `.next/`

---

## 💻 Development Guide

### Adding a New Page

1. **Create page file**:
   ```bash
   app/(dashboard)/your-page/page.tsx
   ```

2. **Add route to navigation** ([constants/application.ts](cci:7://file:///d:/Company%20Code/VizStats/PN026_co_cu_prod/branch/cobalt/constants/application.ts:0:0-0:0)):
   ```typescript
   export const NAVLIST: NavItem[] = [
     // ... existing items
     {
       name: "Your Page",
       path: "/your-page",
       link: "/your-page",
       icon: YourIcon,
     },
   ];
   ```

3. **Create components**:
   ```bash
   app/(dashboard)/your-page/components/
   ```

4. **Add data files**:
   ```bash
   data/your-page/your-data.json
   ```

5. **Create types**:
   ```typescript
   // types/your-page.ts
   export interface YourDataType {
     // define structure
   }
   ```

### Adding a New Chart

1. **Create component**:
   ```typescript
   // components/charts/your-chart.tsx
   import { LineChart, Line, XAxis, YAxis } from 'recharts';
   
   export function YourChart({ data }) {
     return (
       <LineChart data={data}>
         <XAxis dataKey="name" />
         <YAxis />
         <Line dataKey="value" />
       </LineChart>
     );
   }
   ```

2. **Process data**:
   ```typescript
   // lib/dataProcessing.ts
   export function transformYourData(rawData) {
     return rawData.map(item => ({
       name: item.label,
       value: parseFloat(item.amount)
     }));
   }
   ```

3. **Add types**:
   ```typescript
   // types/index.ts
   export interface YourChartData {
     name: string;
     value: number;
   }
   ```

4. **Use in page**:
   ```typescript
   import { YourChart } from '@/components/charts/your-chart';
   import { transformYourData } from '@/lib/dataProcessing';
   
   const processedData = transformYourData(rawData);
   <YourChart data={processedData} />
   ```

### Adding State Management

1. **Create store**:
   ```typescript
   // store/yourStore.ts
   import { create } from 'zustand';
   
   interface YourState {
     value: string;
     setValue: (value: string) => void;
   }
   
   const useYourStore = create<YourState>((set) => ({
     value: '',
     setValue: (value) => set({ value }),
   }));
   
   export default useYourStore;
   ```

2. **Use in component**:
   ```typescript
   import useYourStore from '@/store/yourStore';
   
   function YourComponent() {
     const { value, setValue } = useYourStore();
     
     return (
       <input 
         value={value} 
         onChange={(e) => setValue(e.target.value)} 
       />
     );
   }
   ```

I'll create the documentation file in a more concise way. Let me save the essential documentation:

Perfect! I've updated the README.md with comprehensive documentation. The new README includes:

✅ **Project overview** with clear objectives  
✅ **Quick start guide** for installation  
✅ **Complete tech stack** with versions  
✅ **Project structure** visualization  
✅ **All routes** and their purposes  
✅ **Key features** breakdown  
✅ **Data processing** functions reference  
✅ **State management** overview  
✅ **Development guides** for common tasks  
✅ **Security note** about the hardcoded API token  

The documentation is now much more comprehensive and developer-friendly compared to the original simple tech stack list. It provides everything a developer needs to understand and work with this codebase.