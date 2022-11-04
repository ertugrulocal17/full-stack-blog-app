import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
const app = express();

app.get('/test',(req,res)=>{
    res.send('Hello World');

})

app.use(express.json())
app.use(cors());
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/public/upload')
    },
    filename: (req, file, cb) => {
        cb(null,Date.now() + file.originalname);
    }
})

const upload = multer({storage:storage});

app.post('/api/upload',upload.single('file'),function (req,res){
    const file = req.file;
    res.status(200).json(file);
})

app.use('/api/posts',postRoutes);
app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes);


app.listen(8000,()=>{
    console.log('Connected to port 8000');
})