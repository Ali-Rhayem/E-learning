import express from 'express';
import connectDB from './connection.js';
import authRoutes from './routes/auth.routes.js';
import classRoutes from './routes/class.routes.js'

const app = express();
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/classes',classRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
