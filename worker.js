const { Worker } = require('bullmq');
const express = require('express');
const { Client } = require('pg');

const app = express();
const PORT = 4000;

const POSTGRES_USERNAME = '*';
const POSTGRES_PASSWORD = '*';
const POSTGRES_HOST = '*';
const POSTGRES_PORT = 5432;

let client;  

async function connectToDB(retries = 15000, delay = 5000) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            client = new Client({
                user: POSTGRES_USERNAME,
                host: POSTGRES_HOST,
                database: POSTGRES_USERNAME,
                password: POSTGRES_PASSWORD,
                port: POSTGRES_PORT,
            });

            await client.connect();
            console.log("Connected to PostgreSQL successfully!");
            return;
        } catch (error) {
            console.error(`PostgreSQL connection failed (Attempt ${attempt}/${retries}):`, error.message);
            if (attempt < retries) {
                console.log(`Retrying in ${delay / 1000} seconds...`);
                await new Promise((resolve) => setTimeout(resolve, delay));
            } else {
                console.error("Could not connect to PostgreSQL. Exiting...");
                process.exit(1); // Exit if connection fails after retries
            }
        }
    }
}

connectToDB();

// Worker to process jobs
const worker = new Worker('RedisQueue', async job => {
    console.log(`Processing job ID: ${job.id}`);
    const { id, name, grades } = job.data;
    const avgGrade = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
    console.log(`Student: ${name} (ID: ${id}), Average Grade: ${avgGrade.toFixed(2)}`);

    try {
        // Check if client is connected, if not, reconnect
        if (!client || client._ending) {
            console.log("Reconnecting to PostgreSQL...");
            await connectToDB();
        }

        await client.query(
            `INSERT INTO students_avg_grades (student_id, name, average_grade) VALUES ($1, $2, $3)`,
            [id, name, avgGrade]
        );

        console.log(`Data inserted for Student ID: ${id}`);
        return { id, name, avgGrade };

    } catch (error) {
        console.error(`Error inserting data for Student ID: ${id}`, error);
        throw error;
    }
}, {
    connection: {
        host: '20.106.195.225',
        port: 6379
    },
    lockDuration: 30000, // 30s lock prevents race conditions
    removeOnComplete: { age: 0, count: 0 },
    removeOnFail: { age: 0, count: 0 }
});

worker.on('completed', job => {
    console.log("Job completed successfully");
});

worker.on('failed', (job, err) => {
    console.error("Job failed", err);
});
