
# Web Scraping Application

## Overview

This project is a full-stack web application that allows users to scrape a website by entering a URL. The application will fetch the website content, extract all the links from the page, store the results (including the URLs and domains) in a MongoDB database, and display the results on the frontend.

The project is built using the following technologies:

- **Frontend:** React with TypeScript
- **Backend:** NestJS (a Node.js framework) with TypeScript
- **Database:** MongoDB
- **Containerization:** Docker and Docker Compose

## Features

- Scrape any website by entering a URL.
- Extract all links from the scraped website.
- Store the extracted URLs and domains in MongoDB.
- Display the results on the frontend, including the number of unique domains and URLs found.
- Automatically update the results after the scraping process is complete.

<!-- ## Project Structure

\`\`\`
web-scraping-app/
├── backend/                  # Backend service (NestJS)
│   ├── Dockerfile            # Dockerfile for backend
│   ├── package.json          # Backend dependencies
│   ├── tsconfig.json         # TypeScript configuration
│   └── src/
│       ├── main.ts           # Entry point for NestJS app
│       ├── app.module.ts     # Root module for NestJS app
│       ├── scraping/         # Scraping service and controller
│       └── schemas/          # MongoDB schema for results
├── frontend/                 # Frontend service (React)
│   ├── Dockerfile            # Dockerfile for frontend
│   ├── package.json          # Frontend dependencies
│   ├── tsconfig.json         # TypeScript configuration
│   └── src/
│       ├── index.tsx         # Entry point for React app
│       ├── App.tsx           # Main App component
│       ├── components/       # React components
│       └── index.css         # Styles
├── docker-compose.yml        # Docker Compose configuration
└── README.md                 # Project documentation
\`\`\` -->

## Prerequisites

- **Docker:** Make sure you have Docker installed on your machine. You can download it from [here](https://www.docker.com/products/docker-desktop).
- **Docker Compose:** Docker Compose is included with Docker Desktop, so no additional installation is needed.

## How to Run the Project

You can run the entire project, including the frontend, backend, and MongoDB, using Docker Compose. Follow the steps below to get the application running.

### 1. Clone the Repository

First, clone this repository to your local machine:

\`\`\`bash
git clone https://github.com/SaharGalimidi/web-scraping-app.git
cd web-scraping-app
\`\`\`

### 2. Build and Run with Docker Compose

Run the following command to build the Docker images and start the containers:

``` bash
    docker-compose up --build
```
This command will:

- Build the Docker images for both the frontend and backend services.
- Start the MongoDB database.
- Start the frontend on port \`8080\`.
- Start the backend on port \`3000\`.

### 3. Access the Application

Once the containers are up and running:
Open your browser and go to [http://localhost:8080](http://localhost:8080). This is where you'll see the web interface for the application.

### 4. Stop the Application

To stop the application, press \`Ctrl + C\` in the terminal where Docker Compose is running. You can also stop and remove the containers using:

\`\`\`bash
docker-compose down
\`\`\`

This will stop all running containers and remove them.