## Getting Started with Express.js Search API

### Prerequisites

First of all replace **env.example** with **.env** file

Make sure you have **Docker** installed on your system.  
If Docker is not installed, you can install it using the official guide:  
👉 [Install Docker on Windows](https://docs.docker.com/desktop/install/windows-install/)

Or via command line (PowerShell with winget):
```bash
winget install --id Docker.DockerDesktop -e
```

### Run the Application

Use the following command to start the app with Docker Compose:

```bash
docker-compose up -d
```

This will start the server in detached mode.

### Test the Search API

Once the server is running, open your browser or a tool like **Postman** and make a GET request to:

```
http://localhost:3000/api/v1/search?q=wireless
```

> Replace `"wireless"` with any keyword you'd like to search for.

The API will return matching records based on the **name** or **description** fields.
