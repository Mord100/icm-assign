const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors')
const connectDB  = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')
const cors = require('cors');


const port = process.env.port || 5000

connectDB()
const app = express()
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/luggages', require('./routes/luggageRoutes'))
// app.get('/api/luggage/:ticketNumber', async (req, res) => {
//     try {
//       const luggage = await Luggage.findOne({ ticketNumber: req.params.ticketNumber });
//       if (!luggage) {
//         return res.status(404).json({ message: 'Luggage not found' });
//       }
//       res.json(luggage);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });

app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on port ${port}`))