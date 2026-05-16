# AI Transcription Dashboard

A modern, dark-themed dashboard for AI-powered audio transcription and summarization. Built with React, Vite, TailwindCSS, and Framer Motion.

## Features

- 🎨 **Dark Futuristic UI** - Beautiful gradient effects and smooth animations
- 📤 **Audio Upload** - Drag-and-drop interface with file validation
- 📝 **Transcript Viewer** - Scrollable viewer with search and copy functionality
- 🎯 **AI Summary Cards** - Key insights displayed in elegant cards
- ✅ **Action Items Panel** - Interactive checklist with priority indicators
- 📊 **Export Functionality** - Export to TXT, JSON, and Markdown formats
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile

## Tech Stack

- **Frontend**: React.js 18
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd IBM-BOB-Hackathon-Semicolon
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Dashboard/
│   │   ├── DashboardLayout.jsx    # Main layout component
│   │   └── DashboardHeader.jsx    # Header with export button
│   ├── Upload/
│   │   └── AudioUpload.jsx        # Drag-and-drop upload
│   ├── Transcript/
│   │   └── TranscriptViewer.jsx   # Transcript display with search
│   ├── Summary/
│   │   └── SummaryCards.jsx       # AI summary cards
│   ├── ActionItems/
│   │   └── ActionItemsPanel.jsx   # Action items checklist
│   ├── Export/
│   │   └── ExportButton.jsx       # Export modal and functionality
│   └── UI/
│       ├── Button.jsx             # Reusable button component
│       ├── Card.jsx               # Reusable card component
│       ├── Modal.jsx              # Modal component
│       └── Skeleton.jsx           # Loading skeletons
├── utils/
│   ├── sampleData.js              # Sample transcript data
│   └── exportHelpers.js           # Export utility functions
├── App.jsx                        # Root component
├── main.jsx                       # Entry point
└── index.css                      # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Features in Detail

### Audio Upload
- Drag-and-drop interface
- File type validation (MP3, WAV, M4A, OGG)
- File size limit (100MB)
- Upload progress indicator

### Transcript Viewer
- Full transcript display
- Search functionality with highlighting
- Copy to clipboard
- Word count and duration display
- Speaker identification

### AI Summary
- Key insights in card format
- Topic extraction
- Sentiment analysis
- Color-coded categories

### Action Items
- Interactive checklist
- Priority levels (high, medium, low)
- Filter by status (all, active, completed)
- Progress tracking
- Due dates and assignees

### Export Options
- Text format (.txt)
- JSON format (.json)
- Markdown format (.md)
- Selective content export

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
colors: {
  primary: { ... },
  accent: { ... },
  text: { ... }
}
```

### Animations
Modify Framer Motion animations in individual components or adjust global animation settings in `tailwind.config.js`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is part of the IBM BOB Hackathon by Team Semicolon.

## Acknowledgments

- IBM Watson for AI capabilities
- Lucide React for beautiful icons
- Framer Motion for smooth animations
- TailwindCSS for utility-first styling