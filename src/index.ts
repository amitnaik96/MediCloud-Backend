import express from 'express';
import patientRouter from "./routes/patientRoute";
import doctorRouter from "./routes/doctorRoute";
import signinRouter from "./routes/signinRoute";
import isAdminRouter from "./routes/isAdminRoute";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', patientRouter);
app.use('/', doctorRouter);
app.use('/', signinRouter);
app.use('/', isAdminRouter);


app.listen(3000, () => console.log(`Listening on port ${3000}`));