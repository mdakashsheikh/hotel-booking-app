import express, { Request, Response} from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import 'dotenv/config'

//Database conntection
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(() => console.log('Database Conntected...'))
    .catch((error) => console.log(`Mongo Connection error: ${error.message}`))


const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.get('/api/test', async(req: Request, res: Response) => {
    res.json({ message: 'Hello from express endpoint!'})
})

app.listen(7000, () => {
    console.log('Sunver running on PORT 7000...')
})