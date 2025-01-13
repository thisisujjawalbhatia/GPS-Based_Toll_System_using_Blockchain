# Blockchain-Based Toll Application - Frontend

This is the frontend of the Blockchain-Based Toll Application, built using the Ionic framework. This application allows users to interact with the toll system through a user-friendly interface.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js and npm installed
- Ionic CLI installed (`npm install -g @ionic/cli`)

## Installation

1. Navigate to the frontend directory:
    ```bash
    cd Blockchain-Based-TollApplication/Frontend
    ```
2. Install the dependencies: (use node version =<18)
    ```bash
    npm install
    ```

## Running the Application

### Viewing the Web Preview

To view the application in a web browser, use the following command:
```bash
ionic serve
```
This will start a local development server and open the application in your default web browser. Any changes you make to the code will automatically reload the browser.

### Viewing on Android

To view the application on an Android device, follow these steps:

1. Ensure you have Android Studio installed and set up.
2. Connect your Android device to your computer via USB, or start an Android emulator.
3. Add the Android platform to your Ionic project:
    ```bash
    ionic capacitor add android
    ```
4. Build the project:
    ```bash
    ionic build
    ```
5. Sync the project with Capacitor:
    ```bash
    npx cap sync
    ```
6. Open the project in Android Studio:
    ```bash
    npx cap open android
    ```
7. In Android Studio, run the project on your connected device or emulator.

