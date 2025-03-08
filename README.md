# Redis BullMQ Worker

This project is a Node.js-based worker that processes jobs from a Redis queue using BullMQ and stores the results in a PostgreSQL database.

## Features
- **Job Queueing**: Uses Redis and BullMQ to handle job processing efficiently.
- **PostgreSQL Integration**: Stores processed job data in a PostgreSQL database.
- **Auto Job Cleanup**: Configured to remove completed and failed jobs.
- **Graceful Error Handling**: Logs and manages errors effectively.
- **Concurrent Job Processing**: Handles multiple jobs in parallel with locking mechanisms.

## Prerequisites
Ensure you have the following installed:
- Node.js (v17+ recommended)
- Redis
- PostgreSQL

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/docker-redis-worker.git
   cd redis-bullmq-worker
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

## Configuration

Set up the PostgreSQL and Redis connection details in the `worker.js` file:

```js
const POSTGRES_USERNAME = 'your_username';
const POSTGRES_PASSWORD = 'your_password';
const POSTGRES_HOST = 'your_postgres_host';
const POSTGRES_PORT = 5432;
```

## Running the Worker

Start the worker using:
```sh
npm start
```
This will launch the worker and begin processing jobs from the Redis queue.

## Handling Errors
- Ensure PostgreSQL and Redis are running before starting the worker.
- If you encounter `ECONNREFUSED` errors, check that your database is accessible and restart the worker.
- If `ENOSPC` errors occur, increase the file watcher limit:
  ```sh
  echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
  ```
