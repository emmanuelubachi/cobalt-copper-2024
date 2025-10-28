# Cobalt & Copper Production - Detailed Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Application Pages](#application-pages)
3. [Data Flow](#data-flow)
4. [Component Library](#component-library)
5. [State Management](#state-management)
6. [Data Processing Functions](#data-processing-functions)
7. [Type Definitions](#type-definitions)
8. [API Integration](#api-integration)
9. [Deployment](#deployment)

---

## Architecture Overview

### Technology Stack Details

**Frontend Framework**
- Next.js 14.2.3 with App Router
- Server-Side Rendering (SSR) for initial page loads
- Client-Side Rendering (CSR) for interactive components
- React Server Components for data fetching

**Styling System**
- Tailwind CSS 3.4.3 for utility-first styling
- Custom theme configuration in `tailwind.config.ts`
- Dark/light mode support via `next-themes`
- Responsive breakpoints: sm, md, lg, xl, 2xl, 3xl

**State Management**
- Zustand 4.5.2 for global state
- React hooks (useState, useEffect, useMemo) for local state
- URL search params for shareable state

**Data Visualization**
- Recharts for standard charts (line, bar, area)
- Tremor for pre-styled chart components
- ECharts for complex visualizations (Sankey, TreeMap)
- Mapbox GL for interactive maps
- Supercluster for map marker clustering

---

## Application Pages

### 1. Map Page (`/`)

**File**: `app/(dashboard)/(root)/page.tsx`  
**Type**: Server Component  
**Purpose**: Interactive map showing mining projects and permits in DRC

**Data Sources**:
```typescript
- industrial_projects.csv (CSV → GeoJSON conversion)
- democratic_republic_of_the_congo_mining_permits.geojson
- lineFiltered.geojson (international routes)
- posts.geojson (border posts)
- point.geojson (export ports)
```

**Processing Pipeline**:
```typescript
1. readCsvFile() → Read industrial projects CSV
2. readGeoJsonFile() → Read permit boundaries, routes, posts, ports
3. csv2geojson() → Convert CSV to GeoJSON format
4. filterFeatures() → Remove entries with empty codes
5. matchAndCombineFeatures() → Match projects with permit polygons
6. processNationality() → Parse and index nationality data
7. filterOutPoints() → Keep only polygon geometries
8. Render <MainMap /> with processed data
```

**Key Features**:
- Cluster markers for better performance (Supercluster)
- Click on markers to view project details
- Filter by nationality (8 countries)
- Toggle layers (routes, posts, ports)
- Responsive zoom and pan controls

### 2. Production Overview (`/production-overview`)

**File**: `app/(dashboard)/production-overview/page.tsx`  
**Type**: Client Component (`"use client"`)  
**Purpose**: Dashboard showing production statistics and trends

**State Management**:
```typescript
const [selectedYear, setSelectedYear] = useState<string>("2024");
const [kpi, setKpi] = useState<typeof kpiData>([]);
const [coShareData, setCoShareData] = useState<shareDataByCountryProps>([]);
// ... more state variables
```

**Data Sources** (7 JSON files):
- `kpi_data.json` - KPI metrics by year
- `co_cu_share_nationality.json` - Combined share by nationality
- `cobalt_share_nationality.json` - Cobalt-specific shares
- `copper_share_nationality.json` - Copper-specific shares
- `product_export_by_project.json` - Export volumes by project
- `product_export_destination.json` - Export destinations
- `export_share_by_project.json` - Market share percentages

**Components Used**:
- `<KPI />` - Key performance indicator cards
- `<DonutChart />` - Nationality distribution charts
- `<ProductionExports />` - Export by project bar charts
- `<TopDestinations />` - Top destination bar charts
- `<ExportTrend />` - Historical trend line charts
- `<ExportTable />` - Detailed export share table

**Data Processing**:
```typescript
// Filter by year
const filtered = kpiData.filter(row => row.year === selectedYear);

// Calculate percentages
const share = parseFloat((row.quantity_share * 100).toFixed(1));

// Aggregate destinations
const processedData = summarizeDestinations(filter2);

// Transform for charts
const trendData = transformTrendData(data);
```

### 3. Export Flows (`/export-flows`)

**File**: `app/(dashboard)/export-flows/page.tsx`  
**Type**: Client Component  
**Purpose**: Visualize export flows using Sankey diagrams

**Data Sources**:
- `export_flow_from_projects.json` - Direct project exports
- `export_flow_from_importers.json` - Importer-mediated exports

**Visualization**:
```typescript
<ExportFlow
  data={exportFromProjData}        // Projects → Destinations
  data2={exportFromImportData}     // Importers → Destinations
  hasYear={false}
/>
```

**Features**:
- Year selector (2022-2024)
- Dual Sankey diagrams
- Interactive hover tooltips
- Color-coded flows

### 4. Projects Page (`/projects`)

**File**: `app/(dashboard)/projects/page.tsx`  
**Type**: Server Component  
**Purpose**: Individual project performance details

**URL Parameters**:
```typescript
/projects?project_id=ruashi  // Required parameter
```

**Validation**:
```typescript
// Using Zod schema in lib/fetchData.ts
const searchParamsSchema = z.object({
  project_id: z.string().min(2),
});
```

**Error Handling**:
```typescript
if (errorType === "invalidParams") {
  if (!searchParams.project_id) {
    redirect(`/projects?project_id=${defaultPRoject}`); // "ruashi"
  } else {
    redirect("/companies");
  }
}
```

**Data Processing**:
```typescript
// Find project data
const projectData = IndustrialProjectsData?.find(
  d => d._project_id === projectInfo._project_id
);

// Filter product composition
const productData = ProductCompositionDestinationData.filter(
  d => d._project_id === projectInfo._project_id
);

// Extract unique years
const productionYears = Array.from(
  new Set(productData.map(item => item.year))
).sort((a, b) => parseInt(a) - parseInt(b));
```

### 5. Companies Page (`/companies`)

**File**: `app/(dashboard)/companies/page.tsx`  
**Type**: Server Component  
**Purpose**: Directory of mining companies grouped by nationality

**Data Source**:
```typescript
// From constants/application.ts
export const CompaniesList = [
  {
    value: "China",
    label: "China",
    flagCode: "CN",
    children: [
      { value: "ruashi", label: "Ruashi Mining SPRL" },
      // ... more companies
    ]
  },
  // ... more countries
];
```

**Component**:
```typescript
<GridList data={CompaniesList} />
```

---

## Data Flow

### Server-Side Data Flow (Map Page)

```
┌─────────────────────────────────────────────────┐
│ Server Component (page.tsx)                    │
├─────────────────────────────────────────────────┤
│ 1. readCsvFile("industrial_projects.csv")      │
│ 2. readGeoJsonFile("permits.geojson")          │
│ 3. csv2geojson.csv2geojson(csvData)            │
│ 4. filterFeatures(geojsonData)                 │
│ 5. matchAndCombineFeatures(data, overlayData)  │
│ 6. processNationality(data, "en")              │
│ 7. filterOutPoints(data)                       │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│ Client Component (MainMap)                     │
├─────────────────────────────────────────────────┤
│ - Receives processed GeoJSON                   │
│ - Renders Mapbox map                           │
│ - Applies clustering                           │
│ - Handles user interactions                    │
└─────────────────────────────────────────────────┘
```

### Client-Side Data Flow (Production Overview)

```
┌─────────────────────────────────────────────────┐
│ Import JSON data (static)                      │
├─────────────────────────────────────────────────┤
│ import kpiData from '@/data/overview/kpi.json' │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│ useEffect hook (filters by year)               │
├─────────────────────────────────────────────────┤
│ const filtered = kpiData.filter(               │
│   row => row.year === selectedYear             │
│ );                                              │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│ Data processing functions                      │
├─────────────────────────────────────────────────┤
│ - summarizeDestinations()                      │
│ - transformTrendData()                         │
│ - calculateYearlySums()                        │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│ Chart components                               │
├─────────────────────────────────────────────────┤
│ <DonutChart data={processedData} />            │
└─────────────────────────────────────────────────┘
```

---

## Component Library

### Chart Components

#### Recharts-based (`components/charts/`)

**areaChart.tsx**
```typescript
// Area chart for trend visualization
<AreaChart data={monthlyData}>
  <Area dataKey="Cobalt" fill="#3b82f6" />
  <Area dataKey="Copper" fill="#f97316" />
</AreaChart>
```

**barChart.tsx**
```typescript
// Vertical bar chart for comparisons
<BarChart data={projectData}>
  <Bar dataKey="quantity" fill="#8884d8" />
</BarChart>
```

**barListChart.tsx**
```typescript
// Horizontal bar list with labels
<BarList data={destinationData} />
```

#### ECharts-based (`components/charts/echarts/`)

**sankey.tsx**
```typescript
// Sankey diagram for flow visualization
<ReactECharts
  option={{
    series: [{
      type: 'sankey',
      data: nodes,
      links: links
    }]
  }}
/>
```

**barChart.tsx**
```typescript
// Advanced bar chart with custom styling
<ReactECharts option={barChartOptions} />
```

#### Shadcn Charts (`components/charts/shadcn/`)

**pie-chart/donut.tsx**
```typescript
// Donut chart for percentage breakdowns
<DonutChart
  data={shareData}
  title="Market Share by Nationality"
/>
```

### Navigation Components

**sideNav.tsx** - Collapsed sidebar
```typescript
// Icon-only vertical navigation
<nav className="fixed left-0 top-0 h-screen w-16">
  {NAVLIST.map(item => (
    <Link href={item.link}>
      <item.icon />
    </Link>
  ))}
</nav>
```

**bigSideNav.tsx** - Expanded sidebar
```typescript
// Full labels with icons
<nav className="fixed left-0 top-0 h-screen w-64">
  {NAVLIST.map(item => (
    <Link href={item.link}>
      <item.icon />
      <span>{item.name}</span>
    </Link>
  ))}
</nav>
```

**mobileNav.tsx** - Mobile bottom navigation
```typescript
// Fixed bottom bar for mobile
<nav className="fixed bottom-0 left-0 right-0 sm:hidden">
  {NAVLIST.map(item => (
    <Link href={item.link}>
      <item.icon />
      <span>{item.name}</span>
    </Link>
  ))}
</nav>
```

### UI Elements

**year-toggle.tsx**
```typescript
interface YearToggleProps {
  value: string;
  onChangeFunction: (year: string) => void;
  years: string[];
}

// Usage
<YearToggle
  value={selectedYear}
  onChangeFunction={setSelectedYear}
  years={["2022", "2023", "2024"]}
/>
```

**product-toggle.tsx**
```typescript
// Toggle between Cobalt and Copper
<ProductToggle
  value={selectedProduct}
  onChange={setSelectedProduct}
/>
```

**mode-toggle.tsx**
```typescript
// Dark/light/system theme switcher
<ModeToggle />
```

---

## State Management

### Zustand Stores

#### filterStore.ts

```typescript
interface FilterState {
  isFilterOpen: boolean;
  filterDrawerContent: React.ReactNode;
  toggleFilter: () => void;
  setFilterContent: (content: React.ReactNode) => void;
  openFilter: () => void;
  closeFilter: () => void;
}

const useFilterStore = create<FilterState>((set) => ({
  isFilterOpen: false,
  filterDrawerContent: null,
  toggleFilter: () => set(state => ({ 
    isFilterOpen: !state.isFilterOpen 
  })),
  setFilterContent: (content) => set({ 
    filterDrawerContent: content 
  }),
  openFilter: () => set({ isFilterOpen: true }),
  closeFilter: () => set({ 
    isFilterOpen: false, 
    filterDrawerContent: null 
  }),
}));

// Usage in components
const { openFilter, setFilterContent } = useFilterStore();

const handleFilterClick = () => {
  setFilterContent(<MyFilterComponent />);
  openFilter();
};
```

#### mapFilterStore.ts

```typescript
// Manages map filtering state
interface MapFilterState {
  selectedNationalities: string[];
  setNationalities: (nationalities: string[]) => void;
  // ... more filter options
}
```

#### mapDetailsStore.ts

```typescript
// Stores selected map feature details
interface MapDetailsState {
  selectedFeature: GeoJSONFeature | null;
  setSelectedFeature: (feature: GeoJSONFeature | null) => void;
}
```

#### markerVisibilityStore.ts

```typescript
// Controls marker layer visibility
interface MarkerVisibilityState {
  showProjects: boolean;
  showRoutes: boolean;
  showPosts: boolean;
  showPorts: boolean;
  toggleProjects: () => void;
  toggleRoutes: () => void;
  // ... more toggles
}
```

---

## Data Processing Functions

### GeoJSON Processing (`lib/geojsonProcessing.ts`)

#### filterFeatures()
```typescript
export const filterFeatures = (
  data: GeoJSONFeatureCollection
): GeoJSONFeatureCollection => {
  return {
    ...data,
    features: data.features.filter(d => d.properties.Code !== ""),
  };
};
```
**Purpose**: Remove features with empty permit codes

#### matchAndCombineFeatures()
```typescript
export const matchAndCombineFeatures = (
  data: GeoJSONFeatureCollection,
  overlayData: GeoJSONFeatureCollection
): GeoJSONFeatureCollection => {
  // Match projects with mining permits by code
  // Combine multiple permit polygons into single geometry
  // Uses Turf.js combine() function
};
```
**Purpose**: Merge project points with permit polygon geometries

#### processNationality()
```typescript
export const processNationality = (
  data: GeoJSONFeatureCollection,
  lang: string
): GeoJSONFeatureCollection => {
  const nationalityLabel = lang === "en" 
    ? "Nationality" 
    : "Nationalité des actionnaires";
    
  data.features = data.features.map(d => {
    const split = d.properties[nationalityLabel].split("/");
    split.forEach((element: string, index: number) => {
      d.properties[`nat-${index}`] = element.toLowerCase();
    });
    return d;
  });
  
  return data;
};
```
**Purpose**: Parse nationality strings and create indexed properties for filtering

### Data Aggregation (`lib/dataProcessing.ts`)

#### transformMonthlyData()
```typescript
export function transformMonthlyData(
  data: MonthlyProductionData[]
): TMonthlyProductionData[] {
  const result: TMonthlyProductionData[] = [];
  const months = ["January", "February", ..., "December"];
  
  // Initialize with all months
  months.forEach(month => {
    result.push({ month, Cobalt: 0, Copper: 0 });
  });
  
  // Aggregate quantities
  data.forEach(entry => {
    const targetMonth = result.find(m => m.month === entry.month);
    if (targetMonth && (entry.product === "Cobalt" || entry.product === "Copper")) {
      targetMonth[entry.product] += parseFloat(entry.quantity_tons);
    }
  });
  
  // Remove empty months
  return result.filter(m => m.Cobalt || m.Copper);
}
```

#### calculateYearlySums()
```typescript
export function calculateYearlySums(data: MiningData[]): YearlySummary[] {
  const result: { [year: string]: YearlySummary } = {};
  
  data.forEach(item => {
    if (!result[item.year]) {
      result[item.year] = {
        year: item.year,
        totalCopper: 0,
        totalCobalt: 0,
      };
    }
    result[item.year].totalCopper += parseFloat(item.copper);
    result[item.year].totalCobalt += parseFloat(item.cobalt);
  });
  
  return Object.values(result);
}
```

#### summarizeDestinations()
```typescript
export function summarizeDestinations(
  data: OverviewDestinationSummary[],
  sortBy?: "quantity" | "transaction"
): OverviewDestinationSummary[] {
  const summaryMap = new Map<string, OverviewDestinationSummary>();
  
  // Aggregate by destination
  data.forEach(item => {
    const existing = summaryMap.get(item.short_destination);
    if (existing) {
      existing.quantity += item.quantity;
      existing.transaction += item.transaction;
    } else {
      summaryMap.set(item.short_destination, { ...item });
    }
  });
  
  // Sort and return
  let summarizedData = Array.from(summaryMap.values());
  summarizedData.sort((a, b) => 
    sortBy ? b[sortBy] - a[sortBy] : b.quantity - a.quantity
  );
  
  return summarizedData;
}
```

---

## Type Definitions

### Core Types (`types/index.ts`)

```typescript
export interface NavItem {
  name: string;
  path: string;
  link: string;
  icon: React.FC<LucideProps & React.RefAttributes<SVGSVGElement>>;
}

export type SearchParams = {
  [key: string]: string | undefined;
};

export type ErrorType = "invalidParams" | "projectNotFound" | "serverError";

export interface ProjectInfo {
  _project_id: string;
  project_name: string;
  short_name: string;
}
```

### Map Types (`types/map.ts`)

```typescript
export interface MonthlyProductionData {
  month: string;
  quantity_tons: string;
  product: string;
}

export interface TMonthlyProductionData {
  month: string;
  Cobalt: number;
  Copper: number;
}

export interface DestinationData {
  _project_id: string;
  destination: string;
  quantity_tons: string;
}
```

### GeoJSON Types (`types/geojson.d.ts`)

```typescript
export interface GeoJSONFeature {
  type: "Feature";
  id?: number | string;
  geometry: {
    type: "Point" | "Polygon" | "MultiPolygon";
    coordinates: any;
  };
  properties: {
    [key: string]: any;
  };
}

export interface GeoJSONFeatureCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}
```

---

## API Integration

### Tinybird API (`lib/fetchData.ts`)

```typescript
export async function fetchTinybirdData(url: string) {
  const authorizationToken = `Bearer ${process.env.TINYBIRD_API_TOKEN}`;

  
  try {
    const result = await fetch(url, {
      headers: {
        Authorization: authorizationToken,
      },
    }).then(r => r.json());
    
    return result.data || [];
  } catch (e: any) {
    console.error(e.toString());
    return [];
  }
}
```

---

## Deployment

### Build Configuration

**next.config.mjs**:
```javascript
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};
```

### Build Commands

```bash
# Development
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

### Environment Variables

Create `.env.local`:
```env
# Mapbox (if needed)
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token

# Tinybird API
TINYBIRD_API_TOKEN=your_tinybird_token
```

### Deployment Platforms

**Vercel** (Recommended):
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Other Platforms**:
- Netlify
- AWS Amplify
- Railway
- Render

---

## Performance Optimizations

### Implemented Optimizations

1. **Server-Side Rendering**: Initial page loads use SSR for better SEO and performance
2. **Code Splitting**: Automatic code splitting via Next.js
3. **Image Optimization**: Next.js Image component (if used)
4. **Memoization**: `useMemo` for expensive calculations
5. **Map Clustering**: Supercluster reduces marker count
6. **Lazy Loading**: React Suspense for component loading

### Recommended Optimizations

1. **Add React Query**: Cache API responses
2. **Implement Virtual Scrolling**: For large lists
3. **Optimize Bundle Size**: Analyze with `@next/bundle-analyzer`
4. **Add Service Worker**: For offline support
5. **Implement Pagination**: For large datasets

---

## Testing

### Recommended Testing Strategy

**Unit Tests** (Jest + React Testing Library):
```typescript
// lib/__tests__/dataProcessing.test.ts
import { transformMonthlyData } from '../dataProcessing';

describe('transformMonthlyData', () => {
  it('should aggregate monthly production data', () => {
    const input = [
      { month: 'January', quantity_tons: '100', product: 'Cobalt' },
      { month: 'January', quantity_tons: '200', product: 'Copper' },
    ];
    
    const result = transformMonthlyData(input);
    
    expect(result[0]).toEqual({
      month: 'January',
      Cobalt: 100,
      Copper: 200,
    });
  });
});
```

**Integration Tests** (Playwright):
```typescript
// e2e/map.spec.ts
import { test, expect } from '@playwright/test';

test('map page loads and displays markers', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.mapboxgl-canvas')).toBeVisible();
});
```

---

## Troubleshooting

### Common Issues

**Issue**: Map not loading
```
Solution: Check Mapbox token in environment variables
```

**Issue**: Build fails with TypeScript errors
```
Solution: Run `pnpm tsc --noEmit` to check types
```

**Issue**: Data not updating
```
Solution: Clear `.next` cache and rebuild
```

**Issue**: Slow performance on map
```
Solution: Increase cluster radius or reduce data points
```

---

## Contributing

### Code Style

- Use TypeScript for all new files
- Follow ESLint rules (`.eslintrc.json`)
- Use Prettier for formatting (`.prettierrc`)
- Write meaningful commit messages

### Pull Request Process

1. Create feature branch from `main`
2. Make changes and test locally
3. Run `pnpm lint` and fix issues
4. Submit PR with description
5. Wait for review and approval

---

## License

See LICENSE file for details.

---

**Last Updated**: October 2025  
**Version**: 0.1.0
