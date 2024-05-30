import express, { Request, Response} from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
import mongoose from 'mongoose';
import 'dotenv/config'
import userRoute  from './routes/users.route'

//Database conntection
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(() => console.log('Database Conntected...'))
    .catch((error) => console.log(`Mongo Connection error: ${error.message}`))


const app = express();
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))


app.get('/api/test', async(req: Request, res: Response) => {
    res.json({ message: 'Hello from express endpoint!'})
})

app.use('/api/v1/user', userRoute)

app.listen(7000, () => {
    console.log('Sunver running on PORT 7000')
})