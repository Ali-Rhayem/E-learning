import express from 'express';
import connectDB from './connection.js';
import authRoutes from './routes/auth.routes.js';
import classRoutes from './routes/class.routes.js';
import fileRoutes from './routes/file.routes.js';
import withdrawalRequestRoutes from './routes/withdrawalRequest.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/withdrawal-requests', withdrawalRequestRoutes);

app.get('/test', (req, res) => {
    res.send('Server is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
