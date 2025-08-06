import { Request, Response } from 'express';
import { chatWithToolAgent, clearSessionMemory, clearAllMemories } from './agent.service';

export async function chat(req: Request, res: Response) {
  try {
    const result = await chatWithToolAgent(req.body);
    res.json(result);
  } catch (error) {
    console.error('Error in chat:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
      success: false
    });
  }
}

export async function clearSession(req: Request, res: Response) {
  try {
    const { sessionId } = req.params;
    const cleared = clearSessionMemory(sessionId);
    res.json({
      success: true,
      cleared,
      message: cleared ? 'Session memory cleared' : 'Session not found'
    });
  } catch (error) {
    console.error('Error clearing session:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
      success: false
    });
  }
}

export async function clearAllSessions(req: Request, res: Response) {
  try {
    clearAllMemories();
    res.json({
      success: true,
      message: 'All session memories cleared'
    });
  } catch (error) {
    console.error('Error clearing all sessions:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
      success: false
    });
  }
}