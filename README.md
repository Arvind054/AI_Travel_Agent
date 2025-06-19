# AI Travelling Agent

An intelligent travel planning web application that helps users create, customize, and manage their trips with ease. Powered by AI and Google Maps, the app provides a seamless experience for planning solo, family, couple, or friends trips, with budget and itinerary suggestions.

## ✨ Features
- Beautiful, modern UI with responsive design
- Google Places Autocomplete for source and destination
- Customizable trip options: title, dates, duration, budget, and travel companions
- Animated loading screen for a delightful user experience
- AI-powered trip planning (backend integration)
- Secure handling of API keys and environment variables

## 🛠️ Tech Stack
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express (or similar)
- **APIs:** Google Maps/Places API

## 📁 Folder Structure
```
AI_Travelling/
  ├── Client/         # Frontend React app
  │   ├── src/
  │   │   ├── Components/
  │   │   └── ...
  │   └── ...
  └── Server/         # Backend Node.js app
      └── ...
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- Google Maps API Key

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/ai-travelling-agent.git
   cd ai-travelling-agent
   ```
2. **Install dependencies:**
   - For the client:
     ```bash
     cd Client
     npm install
     ```
   - For the server:
     ```bash
     cd ../Server
     npm install
     ```

### Environment Variables
- In `Client/.env`, add:
  ```
  VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
  ```
- In `Server/.env`, add any backend secrets as needed.

### Running the App
- **Client:**
  ```bash
  cd Client
  npm run dev
  ```
- **Server:**
  ```bash
  cd Server
  npm start
  ```

## 🧭 Usage
1. Open the client app in your browser (usually at `http://localhost:5173`)
2. Fill in your trip details: title, destination, source, dates, budget, and companions
3. Submit to generate your AI-powered itinerary!

## 📄 License
This project is licensed under the MIT License. 