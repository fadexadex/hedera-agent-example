import { Router } from 'express';
import { chat, clearSession, clearAllSessions } from './agent.controller';

const router = Router();

// Chat with the agent
router.post('/chat', chat);

// Clear session memory
router.delete('/session/:sessionId', clearSession);

// Clear all session memories
router.delete('/sessions', clearAllSessions);

export default router;