import express from 'express';
import patientRouter from "./routes/patientRoute";
import doctorRouter from "./routes/doctorRoute";
import signinRouter from "./routes/signinRoute";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', patientRouter);
app.use('/', doctorRouter);
app.use('/', signinRouter);


app.listen(3000, () => console.log(`Listening on port ${3000}`));