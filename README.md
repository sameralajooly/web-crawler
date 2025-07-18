# Web Crawler Application

A full-stack web application that analyzes websites for structure, metadata, and accessibility. Built with **React**, **Go (Gin)**, and **MySQL**, and runs via **Docker Compose**.

## Features

- Add and manage URLs for crawling
- Real-time crawling status (queued → running → done / error)
- Extracts:
    - HTML version
    - Page title
    - Heading tags (H1–H6) count
    - Internal vs. external link counts
    - Broken links
    - Presence of login forms
- Dashboard with:
    - Sortable, paginated table
    - Column filters and global search
    - Bulk actions (delete, re-analyze)
- Detailed view:
    - Donut chart and Bar chart of link types
    - List of broken links with status code
- Mobile-responsive UI

## Run Locally with Docker

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)

1.  **Clone the repo:**

```bash
git clone https://github.com/sameralajooly/web-crawler.git
```
2. **Create `.env` files:**
	1. Create `.env` file in root directory similar to `.env.sample`
	2. Create `.env` file in web-crawler-backend directory similar to `.env.sample` inside it
	3. Create `.env` file in web-crawler-backend directory similar to `.env.sample` inside it
3. **To start the app run:**
``` bash
docker compose up --build
```
4. **Open browser:**
	- Frontend: http://localhost:3000
	- Backend API: http://localhost:8080
  
## Run Locally without Docker
###  Prerequisites (No Docker)

To run the project without Docker, you must install the following dependencies and tools manually.

#### Backend (`web-crawler-backend`)

1. **Go (Golang)**
   - Version: **1.24+**
   - Install: [https://go.dev/doc/install](https://go.dev/doc/install)

2. **MySQL Server**
   - Version: **8.x**
   - Must be running locally.
   - You need to create a database and user matching your `.env` config.

3. **Environment Variables**
   - Create `.env` files:
	1. Create `.env` file in root directory similar to `.env.sample`
	2. Create `.env` file in web-crawler-backend directory similar to `.env.sample` inside it
**Importent**
Set  `DB_HOST` to `localhost` or to the correct host
	3. Create `.env` file in web-crawler-backend directory similar to `.env.sample` inside it
    

4. **Install Go Dependencies**
   ```bash
   go mod tidy
   ```

5. **Run the Backend**
```
go run main.go
```

### Frontend
1. **Node.js Version 18+**
2. **Install Frontend Dependencies**
```
cd web-crawler-frontend
npm install
```
3. **Run the Backend**
```
npm run dev
```


## Testing
To run the tests locally:
```
cd web-crawler-frontend
npx cypress open
```

### Importent
- Make sure Docker is running before starting the containers.
- Make sure that the ports used by the application are free
	- Mysql: 33306
	- Frontend: 3000
	- Backend: 8080
- The live status update (using WebSocket) was tested and worked fine on **Chrome** and **Opera** browsers. There was some problems on **Firefox** (sometimes the connection closes) 
