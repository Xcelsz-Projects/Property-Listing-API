import express from 'express';
import cors from 'cors';
import propertyRouter from './routes/property.js';
import helmet from 'helmet';

const app = express();

app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            fontSrc: ["'self'", "https://property-listing-api-production.up.railway.app", "data:"],
            styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles if required
          },
    })
)

app.use(cors());
app.use(express.json());

app.use('/api', propertyRouter);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
