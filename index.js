const { Queue } = require('bullmq');
const express = require('express');
const app = express();
const PORT = 8080;

const RedisQueue = new Queue('RedisQueue', {
    connection: {
      host: '*',
      port: 6379
    }
  });

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


const data = {
    "students": [
        {
            "id": 1,
            "name": "Alice Johnson",
            "grades": [3.5, 3.8, 3.2, 3.9, 3.7, 3.4, 3.8, 3.6]
        },
        {
            "id": 2,
            "name": "Bob Smith",
            "grades": [2.8, 3.0, 3.2, 3.5, 3.1, 2.9, 3.3, 3.0]
        },
        {
            "id": 3,
            "name": "Charlie Brown",
            "grades": [3.9, 3.8, 3.7, 3.9, 4.0, 3.9, 3.8, 3.9]
        },
        {
            "id": 4,
            "name": "David Williams",
            "grades": [3.0, 3.2, 3.3, 3.5, 3.4, 3.6, 3.7, 3.1]
        },
        {
            "id": 5,
            "name": "Emma Thomas",
            "grades": [3.1, 3.4, 3.2, 3.6, 3.3, 3.2, 3.5, 3.4]
        },
        {
            "id": 6,
            "name": "Frank White",
            "grades": [2.5, 2.7, 3.0, 3.2, 3.1, 3.0, 2.8, 2.9]
        },
        {
            "id": 7,
            "name": "Grace Lewis",
            "grades": [3.6, 3.7, 3.8, 3.5, 3.7, 3.9, 3.8, 3.9]
        },
        {
            "id": 8,
            "name": "Henry Martin",
            "grades": [3.2, 3.3, 3.4, 3.1, 3.5, 3.2, 3.3, 3.1]
        },
        {
            "id": 9,
            "name": "Ivy Scott",
            "grades": [3.8, 3.7, 3.9, 4.0, 3.9, 3.8, 3.7, 3.9]
        },
        {
            "id": 10,
            "name": "Jack Nelson",
            "grades": [3.3, 3.4, 3.2, 3.5, 3.3, 3.2, 3.6, 3.4]
        },
        {
            "id": 11,
            "name": "Katie Moore",
            "grades": [2.9, 3.0, 3.1, 3.3, 3.2, 3.4, 3.0, 3.1]
        },
        {
            "id": 12,
            "name": "Leo Perez",
            "grades": [3.5, 3.6, 3.8, 3.7, 3.9, 3.8, 3.7, 3.6]
        },
        {
            "id": 13,
            "name": "Mia Rivera",
            "grades": [3.2, 3.4, 3.5, 3.3, 3.6, 3.7, 3.8, 3.4]
        },
        {
            "id": 14,
            "name": "Noah Carter",
            "grades": [2.8, 3.0, 3.1, 2.9, 3.2, 3.0, 3.3, 3.1]
        },
        {
            "id": 15,
            "name": "Olivia Martinez",
            "grades": [3.6, 3.7, 3.9, 3.8, 4.0, 3.9, 3.8, 3.7]
        },
        {
            "id": 16,
            "name": "Paul Adams",
            "grades": [3.4, 3.5, 3.6, 3.3, 3.7, 3.8, 3.5, 3.6]
        },
        {
            "id": 17,
            "name": "Quinn Baker",
            "grades": [3.0, 3.2, 3.4, 3.1, 3.3, 3.2, 3.5, 3.4]
        },
        {
            "id": 18,
            "name": "Ryan Gonzalez",
            "grades": [2.7, 2.9, 3.1, 3.0, 3.2, 3.1, 3.3, 3.2]
        },
        {
            "id": 19,
            "name": "Sophia Hernandez",
            "grades": [3.5, 3.6, 3.8, 3.9, 4.0, 3.8, 3.7, 3.9]
        },
        {
            "id": 20,
            "name": "Tyler Clark",
            "grades": [3.2, 3.4, 3.3, 3.6, 3.5, 3.2, 3.3, 3.1]
        }
    ]
}


app.post('/data', async (req, res) => {

    for (let index = 0; index < req.body.length; index++) {
        console.log(req.body[index].id);
        try {
            await RedisQueue.add('processing', {
                id: req.body[index].id,
                name: req.body[index].name,
                grades: req.body[index].grades
            })
        } catch (error) {
            res.sendStatus(500).send("Error queuing the job!");
            console.error(error.message);
        }
    }
    res.sendStatus(200);
})


app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}`);
});

module.exports = app;