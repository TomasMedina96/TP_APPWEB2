import express from 'express'
import userRouter from './routes/user.routes.js'
import sellRouter from './routes/sell.routes.js'

const app = express()

const port = 3000 
app.use(express.json());

app.listen(port, () => {

    console.log(`Servidor levantado en puerto ${port}`)
})

app.use('/user', userRouter)
app.use('/sell', sellRouter)


