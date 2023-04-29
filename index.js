import express from 'express';
import mongoose from 'mongoose';

import bodyParser from 'body-parser';

import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js'
import categoriesRoutes from './routes/categories.js';
import electronicDevicesRoutes from './routes/electronic_devicesRoutes.js';
import advertisementsRoutes from './routes/advertisementsRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import FactoriesRoutes from './routes/factoriesRoutes.js';
import foodsProducts from './routes/foods_productsRoutes.js';
import menFashionRoutes from './routes/men_fashionRoutes.js';
import womenFashionRoutes from './routes/women_fashionRoutes.js';
import tendersRoutes from './routes/tendersRoutes.js';
import dealsRoutes from './routes/dealsRoutes.js';
import legalAdviceRoutes from './routes/legalAdviceRoutes.js';
import devicesRoutes from './routes/devicesRoutes.js';
import perfumesRoutes from './routes/perfumesRoutes.js';
import watchesRoutes from './routes/watchesRoutes.js';
import vacanciesRoutes from './routes/vacanciesRoutes.js';

const app = express();
dotenv.config();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

app.use('/user', authRoutes);
app.use('/categories', categoriesRoutes);
app.use('/electronic-devices', electronicDevicesRoutes);
app.use('/advertisements', advertisementsRoutes);
app.use('/news', newsRoutes);
app.use('/factories', FactoriesRoutes);
app.use('/foodsproducts', foodsProducts);
app.use('/menfashion', menFashionRoutes);
app.use('/womenfashion', womenFashionRoutes);
app.use('/tenders', tendersRoutes);
app.use('/deals', dealsRoutes);
app.use('/legalAdvices', legalAdviceRoutes);
app.use('/devices', devicesRoutes);
app.use('/perfumes', perfumesRoutes);
app.use('/watches', watchesRoutes);
app.use('/vacancies',vacanciesRoutes);




mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`)
})).catch((error) => console.log(error.message));

mongoose.set('strictQuery', false);