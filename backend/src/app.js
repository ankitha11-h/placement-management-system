import express from 'express'
import studentRouter from './routes/student.routes.js';

const app = express();

app.use(express.json()); //middleware


app.get('/', (req, res) => {
    console.log(req.method);
    console.log(req.url);
    res.send("Placement Management API is running")
});

app.use('/api/students', studentRouter);

export default app
