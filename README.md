
# Firebase NestJS Boilerplate

## Overview

This repository provides a boilerplate for building scalable server-side applications using **NestJS** with **Firebase** as the backend platform. It features **modular architecture** and **Firestore** database integration to help you kickstart your project with a clean, maintainable codebase.

## Features

- **Modular architecture** for scalable code organization.
- **NestJS** as the primary framework for building server-side logic.
- Integration with **Firestore** (NoSQL database) for scalable, real-time data storage.
- Firebase **Admin SDK** for secure access to Firestore and other Firebase services.
- Ready to use with Firebase **Cloud Functions**.
- Easy to extend and customize for your specific project requirements.

## Table of Contents

- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Configuration](#configuration)
- [Firestore Integration](#firestore-integration)
- [Available Commands](#available-commands)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Getting Started

### Prerequisites

To use this boilerplate, you will need the following:

- **Node.js** (v14 or higher)
- **Firebase CLI** installed globally (`npm install -g firebase-tools`)
- **NestJS CLI** installed globally (`npm install -g @nestjs/cli`)
- A **Firebase project** with Firestore enabled.

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/firebase-nestjs-boilerplate.git
   cd firebase-nestjs-boilerplate
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Initialize Firebase in your project by running:

   ```bash
   firebase init
   ```

   Select Firestore, Cloud Functions, and configure your Firebase project. This will create the `firebase.json` and `firestore.rules` files.

4. Set up your Firebase Admin SDK credentials. Copy example.env and put your credentials.

### Running Locally

Start the NestJS application in development mode:

```bash
npm run start:dev
```

Or using Firebase Functions locally:

```bash
firebase emulators:start
```

## Folder Structure

This project uses **modular architecture** to ensure the scalability and maintainability of the codebase.

```
src/
│
├── config/              # Configuration files
├── modules/             # Feature modules
│   ├── auth/            # Authentication module
│   ├── user/            # User management module
│   └── ...              # Additional feature modules
├── starters/            # Application starters. You can run locally via NestJS
```

### Key Modules

- **Auth Module**: Handles user authentication via Firebase Authentication.

## Firestore Integration

Firestore integration is provided through a dedicated service for each module that interacts with Firestore. This ensures modularity and separation of concerns. As an example take a look at `resource` module

## Available Commands

- **`npm run start`**: Run the application.
- **`npm run start:dev`**: Run the application in development mode with hot reloading.
- **`npm run lint`**: Lint the codebase using ESLint.
- **`npm run build`**: Build the application for production.

## Deployment

To deploy your NestJS app as Firebase Cloud Functions:

1. Build the project:

   ```bash
   npm run build
   ```

2. Deploy the functions:

   ```bash
   firebase deploy --only functions
   ```

This will deploy your NestJS app as a Firebase Cloud Function.

## Contributing

We welcome contributions! Please open an issue or submit a pull request to improve the boilerplate.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/feature-name`
5. Open a pull request

---
