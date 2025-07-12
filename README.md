# 🩺 AetherCare Dashboard

**AetherCare** is an AI-powered, real-time health monitoring dashboard designed to work with our custom-built wearable device. Developed during the **Hacksagon National Hackathon**, this system enables proactive healthcare using **IoT + ML**, built with affordability and scalability in mind.

💡 Built for **less than ₹3000**, AetherCare tracks and analyzes critical vitals, predicts over **54+ medical conditions**, and enables **instant emergency response** — all in seconds.

---

## 🔍 Overview

AetherCare Dashboard provides two key interfaces:

- **User Dashboard**: For individuals to monitor their real-time health data and risk status.
- **Responder Dashboard**: For emergency teams to get live alerts, GPS location, and critical vitals when a user enters a risky state.

All data is captured by the wearable and pushed to Firebase, where it's processed and visualized on the dashboard.

---

## 🧠 Key Features

### 🧍 User Dashboard
- 🔴 Real-time vitals monitoring: **Heart Rate, SpO₂, Temperature, Respiratory Rate**
- 📊 Dynamic **Health Score** & condition classification: `Normal`, `Caution`, `Risky`
- 🤖 ML-powered condition prediction using **LSTM**
- 🔔 Visual indicators & health trend interface

### 🚑 Responder Dashboard
- 🚨 Instant alert when user is in critical condition
- 📍 Live GPS + vitals stream
- 🕒 Auto-refresh, patient sorting by severity
- 📞 Integrated **Twilio SMS + voice alerts**

---

## 🛠️ Tech Stack

| Layer        | Technologies                               |
|--------------|---------------------------------------------|
| **Frontend** | Next.js, React, Tailwind CSS, Framer Motion |
| **Backend**  | Node.js, Express.js                         |
| **ML Model** | Flask (LSTM Prediction Server)              |
| **Database** | Firebase Realtime Database                  |
| **Alerts**   | Twilio (SMS & Voice Integration)            |

---

## 🧪 Hardware Components

- **ESP8266** – Microcontroller with Wi-Fi
- **MAX30102** – Heart Rate & SpO₂ sensor
- **AD8232** – ECG Signal Acquisition
- **DHT11** – Temperature sensor
- **GPS Module** – Location tracking
- **3D Printed Case** – Compact wearable enclosure

---

## 🧩 System Architecture

Here’s a visual representation of how the entire AetherCare system works:

     ┌──────────────────────┐
     │   Wearable Device    │
     │ (ESP8266 + Sensors)  │
     └────────┬─────────────┘
              │ Wi-Fi
              ▼
     ┌──────────────────────┐
     │  Firebase Realtime   │
     │      Database        │
     └────────┬─────────────┘
              │
  ┌───────────▼────────────┐
  │                        │
  │  Backend Services      │
  │ (Node.js + Flask ML)   │
  └────────┬──────┬────────┘
           │      │
 ┌─────────▼─┐  ┌─▼──────────┐
 │ Prediction│  │ Alert Engine│
 │  (LSTM)   │  │ (Twilio)    │
 └───────────┘  └────────────┘
           │
 ┌─────────▼────────────────────────────┐
 │     AetherCare Dashboard (Next.js)   │
 ├──────────────────────────────────────┤
 │  - User View                         │
 │  - Responder View                    │
 └──────────────────────────────────────┘



