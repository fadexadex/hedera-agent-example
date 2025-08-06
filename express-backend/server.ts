import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import agentRoutes from './agent.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/agent', agentRoutes);


// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message || 'Unknown error',
    success: false
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Hedera Agent Kit Backend running on port ${PORT}`);
  console.log(`🤖 Agent chat: http://localhost:${PORT}/api/agent/chat`);
});