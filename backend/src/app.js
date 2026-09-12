import express from 'express'

import studentRouter from './routes/student.routes.js';
import companyRouter from './routes/company.routes.js';
import placementDriveRouter from './routes/placementDrive.routes.js';
import applicationRouter from './routes/application.routes.js';
import authRouter from './routes/auth.routes.js';

import errorMiddleware from './middlewares/error.middlewares.js';

const app = express();

app.use(express.json()); //middleware


app.get('/', (req, res) => {
    console.log(req.method);
    console.log(req.url);
    res.send("Placement Management API is running")
});

app.use('/api/auth', authRouter);
app.use('/api/students', studentRouter);
app.use('/api/companies', companyRouter);
app.use('/api/placement-drives', placementDriveRouter);
app.use('/api/applications', applicationRouter);

app.use(errorMiddleware);

export default app
