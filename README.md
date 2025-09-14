![WhatsApp Image 2025-09-05 at 21 25 30](https://github.com/user-attachments/assets/2055f754-784b-44b0-942a-3deec3a388fe)
![WhatsApp Image 2025-07-12 at 21 23 08 (1)](https://github.com/user-attachments/assets/3cdce187-ac88-4eae-97ed-6a2fdca2db0e)
![WhatsApp Image 2025-07-12 at 21 21 42 (1)](https://github.com/user-attachments/assets/6bbf9632-af2b-4707-ab96-f43e53d3b995)



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



