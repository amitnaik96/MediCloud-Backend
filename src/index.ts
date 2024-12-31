import express from 'express';
import patientRouter from "./routes/patientRoute";
import doctorRouter from "./routes/doctorRoute";
import signinRouter from "./routes/signinRoute";
import signoutRouter from "./routes/signoutRoute";
import isAdminRouter from "./routes/isAdminRoute";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

const limiter = rateLimit({
    windowMs : 1 * 60 * 1000,
    max : 100
});

const app = express();
app.use(cors({
    credentials : true,
    origin : "https://medicloud.realamit.xyz"
}));
app.use(express.json());
app.use(cookieParser());
app.use(limiter);
app.use('/api/v1', patientRouter);
app.use('/api/v1', doctorRouter);
app.use('/api/v1', signinRouter);
app.use('/api/v1', isAdminRouter);
app.use('/api/v1', signoutRouter);
app.use(helmet());

app.listen(3000, () => console.log(`Listening on port ${3000}`));