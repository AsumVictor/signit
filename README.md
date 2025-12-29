# SignIt - Real-Time Sign Language Alphabet Recognition

<div align="center">

![SignIt Logo](public/logo_s.svg)

**A web application that recognizes sign language alphabet gestures in real-time using computer vision technology.**

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![MediaPipe](https://img.shields.io/badge/MediaPipe-Tasks%20Vision-orange.svg)](https://developers.google.com/mediapipe)
[![Firebase](https://img.shields.io/badge/Firebase-9.19.1-yellow.svg)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.4-38bdf8.svg)](https://tailwindcss.com/)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [How It Works](#how-it-works)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

SignIt is a web application designed to recognize sign language alphabet letters in real-time. The application uses a webcam to capture hand gestures and identifies individual alphabet letters (A through Z) from American Sign Language. When a letter is recognized, the application displays it as text and can convert it to speech output.

This application focuses specifically on alphabet recognition and does not translate full sign language words or sentences. It is intended as a tool for learning and practicing sign language alphabet letters.

### Key Capabilities

- **Real-Time Alphabet Recognition**: Recognizes sign language alphabet letters as gestures are performed
- **Visual Feedback**: Displays hand landmarks and connections on the video feed
- **Text Display**: Shows recognized alphabet letters as on-screen captions
- **Text-to-Speech**: Converts recognized letters to audio output
- **Cross-Platform Compatibility**: Works on desktop computers, tablets, and mobile devices
- **No Authentication Required**: Accessible immediately without user accounts

---

## Features

### Core Functionality

- **Real-Time Alphabet Recognition**: Captures video from a webcam and recognizes sign language alphabet letters as they are performed
- **Hand Tracking Visualization**: Displays hand landmarks and connections overlaid on the video feed
- **Text Captions**: Shows recognized alphabet letters as text on the screen
- **Audio Output**: Converts recognized letters to speech using the Web Speech API
- **Interactive Controls**: Provides start, pause, and caption toggle functionality

### User Interface Features

- **Loading Interface**: Displays a loading screen with progress indicators during initialization
- **Draggable Components**: Audio visualizer can be repositioned on the screen
- **Toast Notifications**: Displays user-friendly notifications for important events
- **Control Toolbar**: Provides an intuitive control panel with clear icons and labels

---

## Technology Stack

### Frontend Framework

- **React 18.2.0** - JavaScript library for building user interfaces
- **Redux** - State management library for managing application data
- **React Router** - Routing library for navigation
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Framer Motion** - Animation library for smooth transitions
- **React Webcam** - React component for webcam integration

### Computer Vision and Machine Learning

- **MediaPipe Tasks Vision** - Framework for gesture recognition
- **MediaPipe Hands** - Hand tracking and landmark detection solution
- **MediaPipe Drawing Utils** - Utilities for visualizing hand landmarks

### Backend Services

- **Firebase 9.19.1** - Backend-as-a-Service platform
  - Firestore - NoSQL database for data storage
  - Firebase Storage - Cloud storage for model files

### Additional Libraries

- **React Toastify** - Toast notification library
- **Chart.js** - Charting library for data visualization
- **React Icons** - Icon library for UI elements
- **UUID** - Library for generating unique identifiers

---

## Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        User Interface                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Navbar     │  │    Detect    │  │   ToolBar    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                          │                                   │
│                    ┌─────▼─────┐                            │
│                    │   Home    │                            │
│                    │ Component │                            │
│                    └─────┬─────┘                            │
└─────────────────────────┼───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                    Application Layer                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Redux Store (State Management)         │   │
│  │  ┌──────────────┐  ┌──────────────┐                │   │
│  │  │ Auth Reducer │  │ Sign Reducer │                │   │
│  │  └──────────────┘  └──────────────┘                │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│              Computer Vision & ML Layer                      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         MediaPipe Gesture Recognizer                 │   │
│  │  ┌──────────────┐  ┌──────────────┐                │   │
│  │  │ Hand Tracking│  │  Gesture      │                │   │
│  │  │ & Landmarks  │  │  Recognition  │                │   │
│  │  └──────────────┘  └──────────────┘                │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                   │
│                    ┌─────▼─────┐                            │
│                    │  Webcam   │                            │
│                    │   Input   │                            │
│                    └───────────┘                            │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                    Output Layer                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Text Display │  │ Text-to-      │  │  Canvas      │     │
│  │ (Captions)   │  │ Speech       │  │  Overlay      │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                    Data Layer                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Firebase Services                      │   │
│  │  ┌──────────────┐  ┌──────────────┐                │   │
│  │  │  Firestore   │  │   Storage    │                │   │
│  │  │  (Optional)  │  │  (Models)    │                │   │
│  │  └──────────────┘  └──────────────┘                │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Component Architecture

```
App.js
  └── Home.jsx
      ├── Navbar.jsx
      ├── Detect.jsx
      │   ├── LoadingModal.jsx
      │   ├── Webcam Component
      │   └── Canvas Overlay
      ├── ToolBar.jsx
      │   └── Tool.jsx
      └── TextSpeakerVisualizer.jsx
          └── Voice Synthesizer
```

### Data Flow

```
1. User starts application
   ↓
2. LoadingModal displays (fetching → initializing → loading → ready)
   ↓
3. MediaPipe Gesture Recognizer loads
   ↓
4. Webcam captures video frames
   ↓
5. MediaPipe processes frames → detects hands → recognizes alphabet gestures
   ↓
6. Detected alphabet letter sent to Home component
   ↓
7. Text displayed in captions + Text-to-Speech conversion
   ↓
8. Visual feedback on canvas overlay
```

---

## Installation

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Modern web browser with webcam support
- Webcam device

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd signit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase** (Optional - for data storage features)
   - Update `src/firebase.js` with your Firebase configuration
   - Ensure Firebase Storage rules are properly configured

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open in browser**
   - Navigate to `http://localhost:3000`
   - Grant camera permissions when prompted by the browser

---

## Usage

### Getting Started

1. **Launch the Application**
   - Open the application in your web browser
   - Wait for the loading screen to complete initialization

2. **Grant Camera Permissions**
   - When prompted by your browser, allow access to your webcam

3. **Start Recognition**
   - Click the "Start" button in the toolbar
   - Position your hands in front of the camera
   - Perform sign language alphabet letters (A through Z)

4. **View Results**
   - Recognized letters will appear as text captions
   - Audio output will play automatically for each recognized letter
   - Hand landmarks will be visualized on the video feed

### Available Controls

- **Start/Pause**: Toggle alphabet recognition on or off
- **Captions**: Show or hide text captions on screen
- **Settings**: Access application settings (feature in development)
- **Record**: Record recognition session (feature in development)

---

## Project Structure

```
signit/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── logo_s.svg
├── src/
│   ├── components/
│   │   ├── Detect/
│   │   │   ├── Detect.jsx          # Main detection component
│   │   │   ├── Detect.css
│   │   │   ├── LoadingModal.jsx    # Loading screen
│   │   │   └── LoadingModal.css
│   │   ├── home/
│   │   │   ├── Home.jsx            # Main home component
│   │   │   ├── Tool.jsx            # Toolbar tool component
│   │   │   └── Dragable.js         # Draggable utilities
│   │   ├── navbar/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   ├── toolBar/
│   │   │   └── ToolBar.jsx
│   │   ├── voice/
│   │   │   └── voiceSynthezer.jsx  # Text-to-speech
│   │   └── loader/
│   │       └── Loading.jsx
│   ├── redux/
│   │   ├── actions/
│   │   │   ├── authaction.js
│   │   │   └── signdataaction.js
│   │   ├── reducer/
│   │   │   ├── authReducer.js
│   │   │   └── signReducer.js
│   │   ├── action-types/
│   │   │   └── index.js
│   │   └── store.js
│   ├── data/
│   │   ├── FeaturesData.js
│   │   ├── FeedbackData.js
│   │   └── quotes.js
│   ├── firebase.js                 # Firebase configuration
│   ├── App.js                      # Root component
│   └── index.js                    # Entry point
├── package.json
├── tailwind.config.js
├── firebase.json
└── README.md
```

---

## Key Components

### Detect Component

The core component responsible for alphabet recognition:
- Captures video input from the webcam
- Integrates with MediaPipe for gesture recognition
- Visualizes hand landmarks and connections
- Performs real-time alphabet letter recognition

### LoadingModal Component

A loading interface that:
- Displays loading progress during initialization
- Shows different stages (fetching, initializing, loading)
- Presents a ready state with an access button
- Provides visual feedback during the loading process

### Home Component

The main container component that:
- Orchestrates all child components
- Manages application state
- Handles updates when alphabet letters are recognized

### TextSpeakerVisualizer

Converts recognized text to audio output:
- Generates speech from recognized alphabet letters
- Displays a visual waveform during speech
- Provides a draggable interface for repositioning

---

## How It Works

### Recognition Process

1. **Video Capture**
   - The webcam captures video frames continuously
   - Frames are processed sequentially in real-time

2. **Hand Detection**
   - MediaPipe Hands model detects hand presence in each frame
   - Extracts 21 hand landmarks per detected hand
   - Supports detection of up to two hands simultaneously

3. **Gesture Recognition**
   - MediaPipe Gesture Recognizer analyzes hand landmark positions
   - Compares hand configurations against a trained sign language alphabet model
   - Returns the recognized alphabet letter with a confidence score

4. **Visualization**
   - Hand landmarks are drawn on a canvas overlay
   - Hand connections are displayed in real-time
   - Provides visual feedback to help users understand what the system detects

5. **Output Generation**
   - Recognized letters are displayed as text captions
   - Text is converted to speech using the Web Speech API
   - Audio visualizer indicates when speech is active

### Technical Specifications

- **Model**: MediaPipe Gesture Recognizer trained on sign language alphabet gestures
- **Processing**: Real-time video processing using requestAnimationFrame
- **Scope**: Recognizes individual alphabet letters (A through Z)
- **Performance**: Low-latency processing for real-time recognition

---

## Development

### Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (irreversible)
npm run eject
```

### Environment Variables

Create a `.env` file for environment-specific configurations:

```env
REACT_APP_FIREBASE_KEY=your_firebase_key
```

### Code Style Guidelines

- Follow React best practices and conventions
- Use functional components with React hooks
- Maintain consistent naming conventions throughout the codebase
- Add comments to explain complex logic and algorithms

---

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Write clear and descriptive commit messages
- Follow the existing code style and conventions
- Add tests for new features when applicable
- Update documentation as needed

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgments

- **Google MediaPipe** - For providing the gesture recognition framework
- **React Community** - For the comprehensive React ecosystem
- **Firebase** - For backend infrastructure and services
- **Tailwind CSS** - For the utility-first CSS framework

---

## Contact and Support

For questions, issues, or contributions, please open an issue on the GitHub repository.

---

<div align="center">

**Designed for sign language alphabet learning and practice**

Star this repository if you find it helpful.

</div>
