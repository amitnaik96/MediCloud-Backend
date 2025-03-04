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
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';

const limiter = rateLimit({
    windowMs : 1 * 60 * 1000,
    max : 100
});

const app = express();
app.use(cors({
    credentials : true,
    origin : [ process.env.CORS_URL as string, "http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"]
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

const swaggerDocument = YAML.load("./docs/swagger.yaml");
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(3000, () => console.log(`Listening on port ${3000}`));