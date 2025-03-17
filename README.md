# Flocash

This project is a **Next.js** application powered by **Vite** for faster builds and development.

## Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js** (latest LTS recommended)
- **npm** or **yarn**

### Installation
Clone the repository and install dependencies:

```sh
npm install
# or
yarn install
```

## 📜 Scripts
The following scripts are available in `package.json`:

### Development
```sh
npm run dev
```
Starts the development server using **Vite**.

### Build
```sh
npm run build
```
Builds the application for production using **Vite**.

### Preview
```sh
npm run preview
```
Runs the built application in preview mode.

### Production
To run the application in production:

```sh
npm run build
npm run preview
```
This will build the application and serve it using Vite's preview mode.

For deployment, you can serve the **.build** directory using a production-ready server like **Node.js**, **NGINX**, or **Vercel**.

A **vercel.json** file has already been included to help with deploying to Vercel and also cater for rewriting end points

### Code Formatting & Linting

#### Check Formatting
```sh
npm run prettier
```
Checks formatting using **Prettier**.

#### Fix Formatting
```sh
npm run prettier:fix
```
Formats files using **Prettier**.

#### Linting
```sh
npm run lint
```
Runs **ESLint** to analyze code.

#### Fix Linting Issues
```sh
npm run lint:fix
```
Attempts to fix linting issues automatically.

#### Format & Lint in One Step
```sh
npm run format
```
Runs **Prettier** and **ESLint** fixes together.

## 📂 Project Structure
```
├── src/                # Application source code
│   ├── components/     # Reusable components
│   ├── views/          # Next.js pages
│   ├── assets/         # Global and component styles
│   └── utils/          # Utility functions
├── public/             # Static assets
├── main.tsx            # Main entry point for the project
├── .eslintrc           # ESLint configuration
├── .prettierrc         # Prettier configuration
├── package.json        # Dependencies and scripts
└── vite.config.js      # Vite configuration
```

## 🎯 Features
- **Next.js** for SSR & static site generation
- **Vite** for fast builds and hot module replacement
- **Prettier** for code formatting
- **ESLint** for code linting

## 📌 Notes
- Ensure **Vite** plugins for Next.js are configured correctly in `vite.config.js`.
- You can customize ESLint and Prettier settings as per your coding standards.

## 📜 License
This project is licensed under **MIT**.

---
Happy coding! 🚀

