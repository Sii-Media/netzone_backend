import express from 'express';
import mongoose from 'mongoose';
import multer from "multer";


import bodyParser from 'body-parser';

import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js'
import categoriesRoutes from './routes/categories.js';
import electronicDevicesRoutes from './routes/electronic_devicesRoutes.js';
import advertisementsRoutes from './routes/advertisementsRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
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
import departmentsRoutes from './routes/departmentsRours.js';
import openionsRoutes from './routes/openionsRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import requestRoutes from './routes/requestsRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
dotenv.config();


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
console.log(__dirname);

// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'images');
//     },
//     filename: (req, file, cb) => {
//         cb(null, new Date().toISOString() + '-' + file.originalname);
//     }
// });
const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));

// const upload = multer({ storage: fileStorage, fileFilter: fileFilter });


const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

app.use('/user', authRoutes);
app.use('/categories', categoriesRoutes);
app.use('/electronic-devices', electronicDevicesRoutes);
app.use('/advertisements', advertisementsRoutes);
app.use('/news', newsRoutes);
app.use('/foodsproducts', foodsProducts);
app.use('/menfashion', menFashionRoutes);
app.use('/womenfashion', womenFashionRoutes);
app.use('/tenders', tendersRoutes);
app.use('/deals', dealsRoutes);
app.use('/legalAdvices', legalAdviceRoutes);
app.use('/devices', devicesRoutes);
app.use('/perfumes', perfumesRoutes);
app.use('/watches', watchesRoutes);
app.use('/vacancies', vacanciesRoutes);
app.use('/departments', departmentsRoutes);
app.use('/openions', openionsRoutes);
app.use('/questions', questionRoutes);
app.use('/requests',requestRoutes);




mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`)
})).catch((error) => console.log(error.message));

mongoose.set('strictQuery', false);

