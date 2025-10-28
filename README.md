# Cobalt & Copper Production - Data Visualization Platform

> A Next.js 14 data visualization platform for tracking Cobalt and Copper mining operations in the Democratic Republic of the Congo (DRC).

## 📋 Overview

Interactive web application providing maps, charts, and analytics for:
- Mining project locations and statistics
- Production data by year, company, and nationality  
- Export flows and destinations
- Individual project performance tracking

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
pnpm start
```

## 🛠️ Tech Stack

### Core
- **Next.js 14.2.3** - React framework with App Router
- **React 18** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 3.4.3** - Utility-first CSS

### Visualization
- **Recharts 2.13** - Charts (line, bar, area)
- **Tremor 3.17** - Pre-built chart components
- **ECharts 5.5** - TreeMap & Sankey diagrams
- **Mapbox GL 3.4** - Interactive maps
- **React Map GL 7.1** - React wrapper for Mapbox

### UI Components
- **Shadcn/UI** - Accessible component library
- **Radix UI** - Headless UI primitives
- **Lucide React** - Icons
- **Framer Motion 11.2** - Animations
- **Sonner** - Toast notifications

### State & Data
- **Zustand 4.5** - State management
- **Zod 3.23** - Schema validation
- **@turf/turf 7.0** - Geospatial analysis
- **csv2geojson** - CSV to GeoJSON conversion
- **supercluster** - Map clustering

## 📁 Project Structure

```
cobalt/
├── app/                    # Next.js App Router
│   ├── (dashboard)/       # Dashboard routes
│   │   ├── (root)/        # Map page (/)
│   │   ├── production-overview/
│   │   ├── export-flows/
│   │   ├── projects/
│   │   └── companies/
│   └── layout.tsx
├── components/            # React components
│   ├── charts/           # Chart components
│   ├── elements/         # UI elements
│   ├── ui/               # Shadcn components
│   └── ...
├── data/                 # Static JSON/CSV data
│   ├── map/
│   ├── overview/
│   ├── projects/
│   └── export-flow/
├── lib/                  # Utilities
│   ├── dataProcessing.ts
│   ├── geojsonProcessing.ts
│   └── ...
├── store/                # Zustand stores
├── types/                # TypeScript types
├── constants/            # App constants
└── hooks/                # Custom hooks
```

## 🗺️ Routes

| Route | Description |
|-------|-------------|
| `/` | Interactive map with mining projects |
| `/production-overview` | Production statistics dashboard |
| `/export-flows` | Export flow Sankey diagrams |
| `/projects?project_id=X` | Individual project details |
| `/companies` | Mining companies directory |

## ✨ Key Features

### Interactive Map
- Mapbox-powered map of DRC
- Mining project markers with clustering
- Mining permits overlay (GeoJSON)
- International routes & border posts
- Filter by nationality and project type

### Production Dashboard
- KPI cards with trend sparklines
- Nationality distribution (donut charts)
- Top export destinations
- Production by project (bar charts)
- Year-over-year comparisons (2022-2024)

### Export Flows
- Sankey diagrams (projects → destinations)
- Interactive filtering by year
- Color-coded flows by product

### Project Details
- Monthly export trends
- Product composition by destination
- Export flow visualization
- Historical data with year filtering

## 📊 Data Processing

Key functions in `lib/dataProcessing.ts` and `lib/geojsonProcessing.ts`:

- `transformMonthlyData()` - Monthly production aggregation
- `calculateYearlySums()` - Yearly totals
- `summarizeDestinations()` - Destination aggregation
- `transformTrendData()` - Time series transformation
- `matchAndCombineFeatures()` - GeoJSON geometry merging
- `processNationality()` - Nationality parsing

## 🔄 State Management

Zustand stores in `store/`:
- `filterStore` - Filter drawer state
- `mapFilterStore` - Map filtering options
- `mapDetailsStore` - Selected feature details
- `markerVisibilityStore` - Marker visibility toggles

## 🎨 Styling

- Tailwind CSS utility classes
- Dark/light mode support (next-themes)
- Responsive design (mobile-first)
- Custom color palette in `tailwind.config.ts`


## 📝 Development

### Adding a New Page
1. Create `app/(dashboard)/your-page/page.tsx`
2. Add route to `constants/application.ts` NAVLIST
3. Create components in `app/(dashboard)/your-page/components/`
4. Add data files to `data/your-page/`

### Adding a Chart
1. Create component in `components/charts/`
2. Process data using `lib/dataProcessing.ts` functions
3. Define TypeScript types in `types/`

### Adding State
1. Create store in `store/yourStore.ts`
2. Define interface and Zustand store
3. Import and use in components

## 📦 Scripts

```bash
pnpm dev      # Development server (localhost:3000)
pnpm build    # Production build
pnpm start    # Production server
pnpm lint     # Run ESLint
```

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## 📄 License

See LICENSE file for details.

---

**For detailed documentation**, see [DOCUMENTATION.md](./DOCUMENTATION.md)
