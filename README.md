# SortViz - Interactive Sorting Algorithm Visualizer

Here is the link - https://sort-viz-z.vercel.app/

A beautiful, educational web application that helps students learn sorting algorithms through interactive visualizations. Built with React, JavaScript, and Tailwind CSS.

## Features

### 🎯 Multiple Input Methods
- **Manual Input**: Enter comma-separated numbers directly
- **File Upload**: Extract numbers from TXT or PDF files
- **Random Generator**: Generate random number sets for quick demos

### 🧮 Sorting Algorithms
- Bubble Sort
- Selection Sort  
- Insertion Sort
- Merge Sort
- Quick Sort
- Heap Sort
- Counting Sort
- Radix Sort
- Bucket Sort

### 🎬 Interactive Visualization
- Real-time animated sorting with color-coded operations
- Play/pause controls with variable speed (0.25x - 4x)
- Step-by-step navigation (forward/backward)
- Live statistics tracking (comparisons, swaps, time complexity)
- Responsive design for all devices

### ♿ Accessibility Features
- ARIA labels and keyboard navigation
- High contrast color schemes
- Screen reader friendly
- Mobile-responsive down to 320px

## Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sortviz
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
npm run preview
```

## Usage

1. **Enter Numbers**: Choose your preferred input method on the home page
2. **Select Algorithm**: Pick a sorting algorithm from the dropdown
3. **Start Visualization**: Click "Start Visualization" to begin
4. **Control Playback**: Use play/pause, step controls, and speed adjustment
5. **Watch & Learn**: Observe how the algorithm works with color-coded operations

### Color Legend
- 🟨 **Yellow**: Elements being compared
- 🟥 **Red**: Elements being swapped
- 🟩 **Green**: Elements in final sorted position
- 🟪 **Purple**: Pivot element (Quick Sort)

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: React Context API
- **Build Tool**: Vite
- **PDF Processing**: PDF.js

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## Performance Optimization

- Uses `requestAnimationFrame` for smooth animations
- Implements efficient re-rendering with React.memo
- Optimized canvas drawing for large datasets
- Lazy loading of algorithm implementations

---

**SortViz** - Making algorithm learning visual and interactive! 🎓✨
