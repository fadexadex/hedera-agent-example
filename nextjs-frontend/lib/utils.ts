import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSessionId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function parseHederaResponse(response: string): {
  cleanText: string;
  hashScanLink?: string;
  tokenId?: string;
  transactionId?: string;
} {
  // Extract HashScan link
  const hashScanMatch = response.match(/https:\/\/hashscan\.io\/testnet\/[^\s]+/);
  const hashScanLink = hashScanMatch ? hashScanMatch[0] : undefined;

  // Extract token ID
  const tokenIdMatch = response.match(/"tokenId":\s*"([^"]+)"/);
  const tokenId = tokenIdMatch ? tokenIdMatch[1] : undefined;

  // Extract transaction ID  
  const transactionIdMatch = response.match(/"transactionId":\s*"([^"]+)"/);
  const transactionId = transactionIdMatch ? transactionIdMatch[1] : undefined;

  // Clean up the response text by removing function call artifacts
  let cleanText = response
    .replace(/<anythingllm:thinking>[\s\S]*?<\/anythingllm:thinking>/g, '')
    .replace(/<anythingllm:function_calls>[\s\S]*?<\/anythingllm:function_calls>/g, '')
    .replace(/<anythingllm:function_calls_result>[\s\S]*?<\/anythingllm:function_calls_result>/g, '')
    .replace(/\n\n+/g, '\n\n')
    .trim();

  return {
    cleanText,
    hashScanLink,
    tokenId,
    transactionId
  };
}