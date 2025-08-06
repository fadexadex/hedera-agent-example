import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ChatRequest {
  sessionId: string;
  accountId: string;
  privateKey: string;
  message: string;
}

export interface ChatResponse {
  sessionId: string;
  response: string;
  success: boolean;
}

export interface ApiError {
  error: string;
  message: string;
  success: false;
}

export const chatWithAgent = async (request: ChatRequest): Promise<ChatResponse> => {
  try {
    const response = await api.post<ChatResponse>('/api/agent/chat', request);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to communicate with agent');
    }
    throw new Error('Network error occurred');
  }
};

export const clearSession = async (sessionId: string): Promise<void> => {
  try {
    await api.delete(`/api/agent/session/${sessionId}`);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to clear session');
    }
    throw new Error('Network error occurred');
  }
};

export const clearAllSessions = async (): Promise<void> => {
  try {
    await api.delete('/api/agent/sessions');
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to clear all sessions');
    }
    throw new Error('Network error occurred');
  }
};