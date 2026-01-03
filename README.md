#  EduSafe - Student DropOut Identification Dashboard

A cutting-edge, intelligent dashboard for identifying and monitoring at-risk dropout students through data-driven analysis. EduSafe processes attendance, assessment, and attempt records to provide educators with actionable insights and early warning signals.

![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

### 📊 Advanced Analytics
- **Risk Calculation Engine**: Real-time analysis of student performance metrics
- **Multi-Factor Assessment**: Evaluates attendance, test scores, and learning attempts
- **Risk Categorization**: Automatic classification into Safe, Watchlist, and At-Risk categories

### 🎨 Modern UI/UX
- **Dark Premium Theme**: Elegant glassmorphism design with smooth animations
- **Animated Hero Section**: Dual-layer SVG background with continuous drift animations
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Interactive Components**: Smooth scroll indicators and interactive cards

### 📈 Dashboard & Visualization
- **Risk Distribution Chart**: Visual overview of student risk categories
- **Comprehensive Student Table**: Sortable and expandable student records with detailed flags
- **Alert System**: High-visibility banner alerts for critical issues
- **Performance Breakdown**: Detailed test score and attempt analysis

### 🔐 Data Management
- **CSV Upload System**: Support for attendance, assessment, and attempts data
- **Data Merging**: Intelligent consolidation of multiple data sources
- **Risk Flagging**: Automated detection of problematic patterns
- **Reset Functionality**: Easy data management and testing workflows

## 🚀 Getting Started

### Prerequisites
- **Node.js**: 16.x or higher
- **npm**: 8.x or higher (or yarn/pnpm)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/edusafe.git
cd edusafe
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173`

## 📝 Usage

### Uploading Data

1. Navigate to the **Upload Student Data** section
2. Upload three CSV files in the following format:

#### Attendance Data CSV
```
StudentID,AttendancePercentage
STU001,95
STU002,78
STU003,45
```

#### Assessment Data CSV
```
StudentID,TestScore1,TestScore2,TestScore3
STU001,85,88,90
STU002,72,68,75
STU003,45,42,38
```

#### Attempts Data CSV
```
StudentID,AttemptsUsed
STU001,2
STU002,4
STU003,8
```

### Dashboard Features

- **Summary Cards**: View overall statistics and risk distribution
- **Risk Chart**: Visual representation of student risk categories
- **Student Table**: Browse individual student records with risk details
- **Expandable Rows**: Click to view detailed risk flags and score breakdowns
- **Reset Data**: Clear all uploads to start fresh

## 🏗️ Project Structure

```
edusafe/
├── src/
│   ├── assets/
│   │   ├── hero-bg.svg          # Animated hero background
│   │   └── react.svg            # React logo
│   ├── components/
│   │   ├── AlertBanner.tsx      # Alert notification system
│   │   ├── CSVUpload.tsx        # File upload handler
│   │   ├── RiskChart.tsx        # Risk distribution visualization
│   │   ├── StudentTable.tsx     # Student data table with expansion
│   │   └── index.ts             # Component exports
│   ├── types/
│   │   └── index.ts             # TypeScript type definitions
│   ├── utils/
│   │   └── riskCalculator.ts    # Risk analysis engine
│   ├── App.tsx                  # Main application component
│   ├── App.css                  # Global styles and animations
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global base styles
├── public/
│   └── sample-data/             # Sample CSV files for testing
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 🎯 Risk Calculation Algorithm

EduSafe uses a weighted scoring system to identify at-risk students:

### Factors Considered
- **Attendance**: 40% weight
- **Assessment Scores**: 35% weight  
- **Learning Attempts**: 25% weight

### Risk Categories
- **Safe** (Risk Score < 30): Student is performing well
- **Watchlist** (30-70): Monitor closely for changes
- **At-Risk** (> 70): Immediate intervention recommended

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19.2** | UI framework |
| **TypeScript** | Type-safe development |
| **Vite 5.0** | Lightning-fast build tool |
| **TailwindCSS** | Styling (via CSS Variables) |
| **Lucide React** | Icon library |
| **Papa Parse** | CSV parsing |

## 🎨 Design System

### Color Palette
- **Primary**: `#3b82f6` (Blue)
- **Secondary**: `#06b6d4` (Cyan)
- **Accent**: `#10b981` (Green)
- **Background**: `#020617` (Deep Navy)
- **Text**: `#f1f5f9` (Light Slate)

### Key Features
- **Glassmorphism**: Semi-transparent cards with backdrop blur
- **Animations**: Smooth transitions and continuous SVG drift
- **Responsive Grid**: Adapts from desktop to mobile seamlessly

## 📦 Building for Production

```bash
npm run build
```

Output will be in the `dist/` directory, optimized and ready for deployment.

## 🔧 Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint checks |

## 📖 API Reference

### Risk Calculator

**analyzeAllStudents()**
```typescript
analyzeAllStudents(
  attendance: AttendanceRecord[],
  assessment: AssessmentRecord[],
  attempts: AttemptsRecord[]
): StudentProfile[]
```
Analyzes all student records and returns risk profiles.

**getRiskDistribution()**
```typescript
getRiskDistribution(profiles: StudentProfile[]): RiskDistribution
```
Calculates the distribution of risk categories.


##  Acknowledgments

- Built with 💙 by **Angela Bera**
- Icon library: [Lucide React](https://lucide.dev/)
- CSV parsing: [Papa Parse](https://www.papaparse.com/)
- Build tool: [Vite](https://vitejs.dev/)

