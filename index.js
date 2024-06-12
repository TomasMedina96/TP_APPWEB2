import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.routes.js'
import sellRouter from './routes/sell.routes.js'
import productsRouter from './routes/products.routes.js'

const app = express()

const port = 3000 
app.use(express.json());

app.listen(port, () => {

    console.log(`Servidor levantado en puerto ${port}`)
})

app.use(cors({
    origin: 'http://127.0.0.1:5500'

}))

app.use('/user', userRouter)
app.use('/sell', sellRouter)
app.use('/products', productsRouter)




