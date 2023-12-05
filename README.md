# Park Quest

## Introduction

Welcome to Park Quest! The app that allows you to search and save your favorite theme parks around the world!
(\*) Currently working on profile-page branch.

## How you can run it

- Clone the repository by typing "git clone https://github.com/Andrea-Teres/ParkQuest.git" in your terminal.
- "cd" into the project folder and run "npm install" in your terminal. This will install the BACKEND dependencies.
- "cd" into the "client" folder of the project and run "npm install" in your terminal. This will install the FRONTEND dependencies.

Once everyhting's installed, you will need three open tabs in your terminal to run the BACKEND, the FRONTEND and the DATABASE:

BACKEND

- "cd" into the project folder and run "npm start" in your terminal. This will start running the BACKEND.

FRONTEND

- "cd" into the "client" folder of the project and run "npm run dev" in your terminal. This will start running the FRONTEND in a localhost.

DATABASE

- Type "mysql -u root -p" to start running MySQL. Enter your password.
- Type "CREATE DATABASE parks" to create the database.
- Type "USE parks" to use the database.

- In a different tab of your terminal, INSIDE THE PROJECT FOLDER, type "npm run migrate". This will install the database tables.

- Back in the MySQL tab, type "SHOW TABLES" and you'll see three tables:
  - users: contains the users who have registered in the app.
  - parks: contains the parks saved in the Wishlist.
  - SequelizeMeta: since the backend is written using Sequelize, this table is automatically created and contains the migration files.

VSCODE

- Open the project in Visual Studio Code.
- Create an ".env" file inside the project folder and write the following:

DB_HOST=127.0.0.1
DB_USER=root
DB_NAME=parks
DB_PASS=YOUR_MYSQL_PASSWORD
SUPER_SECRET=shhhhhhh
REACT_APP_GOOGLE_API_KEY=YOUR_GOOGLE_MAPS_API_KEY(\*)

(\*) This app works with Google Maps API, so you'll need to get an API key if you don't already have one.

- Create an ".env" file inside the client folder and write the following:

VITE_GOOGLE_API_KEY=YOUR_GOOGLE_MAPS_API_KEY

## Technologies

### Database

- MySQL

### Backend

- Node.js
- Express
- Sequelize

### Frontend

- React
- Google Maps API
- Material UI
- CSS

## File contents

### Database

- migrations:
  20230831183540-create-park.js
  20230831183811-create-user.js

- models:
  index.js
  park.js
  user.js

### Backend

app.js

- routes:
  auth.js
  users.js
  wishlist.js

- guards:
  parkShouldNotExist.js
  userEmailShouldNotExist.js
  userShouldBeLoggedIn.js

- contexts:
  AuthContext.js

### Frontend

- src:
  App.jsx
  main.jsx

- pages:
  Home.jsx
  Login.jsx
  Register.jsx
  Wishlist.jsx

- components:
  GoogleMapComponent.jsx
  Map.jsx
  NavBar.jsx
  RequireAuth.jsx

- styles:
  GoogleMapComponent.css
  stylesheet.css
