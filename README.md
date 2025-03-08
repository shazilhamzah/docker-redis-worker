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
