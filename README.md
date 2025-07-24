# FarmSmarter E-Commerce App

A mock e-commerce mobile app built with Expo (React Native), featuring authentication, product listing, cart, purchase, and real device location. Styled with NativeWind (Tailwind for RN) and following best practices.

## Features

- Onboarding screen
- Authentication (login/signup, users stored in `assets/data/users.json`)
- Product listing (from `assets/data/products.json`)
- Add to cart, view cart, remove items, purchase (mocked)
- Real device location (Expo Location)
- Search/filter products
- Profile screen (user info, logout)
- Persistent cart and login state (AsyncStorage)
- Modern, branded UI with FarmSmarter colors

## Setup Instructions

1. **Clone the repo:**
   ```bash
   git clone <your-repo-url>
   cd farm-starter
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the app:**
   ```bash
   npx expo start
   ```
4. **Run on your device:**
   - Use the Expo Go app (iOS/Android) or an emulator/simulator.

## How to Test Login/Signup

- **Default test user:**
  - Email: `demo@farmsmarter.app`
  - Password: `password123`
- **Sign up:**
  - Use the signup screen to create a new user (appends to `users.json`).
- **Login:**
  - Use your credentials to log in. Credentials are validated against `users.json`.

## Tech Stack

- React Native (Expo, TypeScript)
- NativeWind (Tailwind CSS for RN)
- React Hook Form + Yup (forms/validation)
- Expo Location (real device location)
- Expo FileSystem (read/write JSON data)
- AsyncStorage (persist cart/login)

## Brand Colors

- Green: `#6A8A2C`
- Dark Green: `#2C4A1E`
- Yellow: `#F5D94E`
- Blue: `#4A7BA7`
- Orange: `#F28C28`
- Light: `#F5F5F5`

## Contact

FarmSmarter Ltd (Nig)  
144 Old Ojo Road, Agboju Amuwo, Lagos  
www.farmsmarter.app  
Tel: (+234) 08151478642  
E: hello@farmsmarter.app

## Screenshots

_Add screenshots of the app here_
