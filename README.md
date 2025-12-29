# SignIt - Real-Time Sign Language Alphabet Recognition

<div align="center">

![SignIt Logo](public/logo_s.svg)

**A web app that translates sign language alphabet gestures in real-time using computer vision and machine learning.**

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

SignIt is a web application that helps people communicate. It recognizes sign language alphabet letters in real-time. The app uses a webcam to watch your hands. Then it turns your hand signs into text and speech.

### What Makes SignIt Special

- **Real-Time Processing**: The app recognizes sign language alphabet letters right away
- **Modern Design**: The app looks nice and is easy to use
- **Text-to-Speech**: The app speaks the letters it recognizes
- **Works on Different Devices**: You can use it on phones, tablets, and computers
- **High Accuracy**: The app is very good at recognizing signs
- **No Login Needed**: Anyone can use it right away

---

## Features

### Main Features

- **Real-Time Alphabet Recognition**: The app watches your webcam and recognizes sign language alphabet letters as you make them
- **Visual Feedback**: The app shows dots and lines on your hands so you can see what it sees
- **Text Display**: The app shows the letters it recognizes as text on the screen
- **Text-to-Speech**: The app speaks the letters out loud
- **Easy Controls**: You can start, stop, and change settings easily

### User Experience Features

- **Loading Screen**: A nice loading screen shows while the app gets ready
- **Draggable Audio**: You can move the audio player around the screen
- **Notifications**: The app tells you when something important happens
- **Control Panel**: Easy buttons to control everything

---

## Technology Stack

### Frontend

- **React 18.2.0** - A tool for building websites
- **Redux** - A tool for managing information in the app
- **React Router** - A tool for moving between pages
- **Tailwind CSS** - A tool for making things look nice
- **Framer Motion** - A tool for animations
- **React Webcam** - A tool for using your camera

### Machine Learning and Computer Vision

- **MediaPipe Tasks Vision** - A tool that recognizes hand signs
- **MediaPipe Hands** - A tool that finds and tracks your hands
- **MediaPipe Drawing Utils** - A tool for drawing on the screen

### Backend and Storage

- **Firebase 9.19.1** - A tool for storing information
  - Firestore - A place to store data
  - Firebase Storage - A place to store files

### Other Tools

- **React Toastify** - A tool for showing messages
- **Chart.js** - A tool for making charts
- **React Icons** - A tool for showing icons
- **UUID** - A tool for making unique IDs

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
5. MediaPipe processes frames → detects hands → recognizes gestures
   ↓
6. Detected alphabet letter sent to Home component
   ↓
7. Text displayed in captions + Text-to-Speech conversion
   ↓
8. Visual feedback on canvas overlay
```

---

## Installation

### What You Need

- Node.js (version 14 or higher)
- npm or yarn
- A web browser that works with webcams
- A webcam

### Steps

1. **Get the code**
   ```bash
   git clone <repository-url>
   cd signit
   ```

2. **Install the tools**
   ```bash
   npm install
   ```

3. **Set up Firebase** (Optional - only if you want to save data)
   - Open `src/firebase.js` and add your Firebase settings
   - Make sure Firebase Storage rules are set up

4. **Start the app**
   ```bash
   npm start
   ```

5. **Open in your browser**
   - Go to `http://localhost:3000`
   - Say yes when the browser asks to use your camera

---

## Usage

### Getting Started

1. **Open the App**
   - Open the app in your web browser
   - Wait for the loading screen to finish

2. **Allow Camera Access**
   - When the browser asks, click yes to let it use your webcam

3. **Start Recognizing Signs**
   - Click the "Start" button
   - Put your hands in front of the camera
   - Make sign language alphabet letters with your hands

4. **See the Results**
   - The letters you make will show up as text
   - The app will speak the letters out loud
   - You will see dots and lines on your hands on the screen

### Controls

- **Start/Pause**: Turn recognition on or off
- **Captions**: Show or hide the text on screen
- **Settings**: Change app settings (coming soon)
- **Record**: Record your session (coming soon)

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
This is the main part that does the work:
- Takes video from your webcam
- Uses MediaPipe to recognize hand signs
- Draws dots and lines on your hands
- Recognizes alphabet letters in real-time

### LoadingModal Component
A nice loading screen that:
- Shows progress while the app loads
- Shows when the app is ready
- Has a button to start using the app

### Home Component
The main container that:
- Holds all the other parts together
- Keeps track of what is happening
- Updates when new letters are recognized

### TextSpeakerVisualizer
Turns text into sound:
- Makes the app speak the letters
- Shows a visual wave when speaking
- Can be moved around the screen

---

## How It Works

### Recognition Steps

1. **Video Capture**
   - Your webcam takes pictures very fast
   - The app looks at each picture one by one

2. **Hand Detection**
   - The app looks for hands in the pictures
   - It finds 21 special points on each hand
   - It can find up to 2 hands at once

3. **Gesture Recognition**
   - The app looks at the hand points
   - It compares them to sign language alphabet letters
   - It figures out which letter you are making

4. **Visualization**
   - The app draws dots on your hands
   - It draws lines connecting the dots
   - This helps you see what the app sees

5. **Output**
   - The app shows the letter as text
   - The app speaks the letter out loud
   - You can see and hear what letter you made

### Technical Details

- **Model**: A special computer program trained to recognize sign language alphabet letters
- **Processing**: The app works very fast so you see results right away
- **Accuracy**: The app is good at recognizing letters from A to Z
- **Speed**: The app works in real-time so there is no delay

---

## Development

### Commands You Can Use

```bash
# Start the app for development
npm start

# Build the app for production
npm run build

# Run tests
npm test

# Eject from Create React App (cannot be undone)
npm run eject
```

### Environment Variables

Create a file called `.env` to store settings:

```env
REACT_APP_FIREBASE_KEY=your_firebase_key
```

### Code Style

- Follow React best practices
- Use functional components with hooks
- Use the same naming style everywhere
- Add comments to explain hard parts

---

## Contributing

We welcome help! Here is how to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Save your changes (`git commit -m 'Add some AmazingFeature'`)
4. Send your changes (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### How to Contribute

- Write clear messages when you save changes
- Follow the same code style
- Add tests for new features
- Update this file when you add new things

---

## License

This project uses the MIT License. See the LICENSE file for more information.

---

## Acknowledgments

- **Google MediaPipe** - For the gesture recognition tool
- **React Community** - For the React tools
- **Firebase** - For storing data
- **Tailwind CSS** - For making things look nice

---

## Contact and Support

If you have questions or find problems, please open an issue on the GitHub repository.

---

<div align="center">

**Made for the Deaf community**

Star this repo if you find it helpful!

</div>
