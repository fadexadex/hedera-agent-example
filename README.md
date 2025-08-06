# Template Hedera Agent Kit - Next.js + Express Full Stack

A complete full-stack application for interacting with the Hedera blockchain through AI agents. Features a modern React frontend with a powerful Express backend.

## 🚀 Features

### **Frontend (Next.js)**
- 🎨 **Modern Chat Interface** - Clean, responsive design with real-time messaging
- 🔐 **Secure Credential Management** - Local credential storage (not sent to server)
- 📱 **Mobile-First Design** - Works perfectly on all devices
- 🔗 **Transaction Tracking** - Display token IDs, transaction IDs, and HashScan links
- 📋 **Copy & Share** - Easy copying of transaction details
- ⚡ **Real-time Updates** - Live response parsing and display

### **Backend (Express)**
- 🤖 **AI Agent Integration** - Chat with AI that executes Hedera operations
- 💾 **Session Management** - Persistent conversation memory
- 🔧 **REST API** - Simple, clean endpoints
- 🌐 **CORS Enabled** - Ready for frontend integration
- 📊 **Comprehensive Logging** - Detailed operation tracking

## 📦 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Lucide Icons
- **Backend**: Express.js, TypeScript, Hedera Agent Kit, LangChain
- **AI**: Groq LLM with tool calling capabilities
- **Blockchain**: Hedera Testnet integration


## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ installed
- Groq API key ([Get one here](https://console.groq.com/))
- Hedera testnet account ([Create one here](https://portal.hedera.com/register))

### **1. Clone & Setup**
```bash
# Navigate to the project directory
cd typescript/examples/nextjs-express
```

### **2. Backend Setup**
```bash
# Navigate to backend
cd express-backend

# Install dependencies
npm install

# Setup environment
cp env.example .env

# Edit .env file and add your GROQ_API_KEY
# nano .env
```

**Backend Environment Variables:**
```env
# Required
GROQ_API_KEY=your_groq_api_key_here

# Optional
PORT=3001
```

```bash
# Start backend server
npm run dev
```

Backend will run on `http://localhost:3001`

### **3. Frontend Setup (New Terminal)**
```bash
# Navigate to frontend
cd nextjs-frontend

# Install dependencies  
npm install

# Setup environment
cp env.example .env.local

# Edit .env.local if needed (default should work)
# nano .env.local
```

**Frontend Environment Variables:**
```env
# Backend API URL (default should work)
NEXT_PUBLIC_API_URL=http://localhost:3001
```

```bash
# Start frontend development server
npm run dev
```

Frontend will run on `http://localhost:3000`

### **4. Access the Application**
1. Open `http://localhost:3000` in your browser
2. Enter your Hedera credentials:
   - **Hedera Account ID**: `0.0.xxxxxxx`
   - **DER Encoded Private Key**: Your ECDSA private key
3. Start chatting with the AI agent!

## 💡 Usage Examples

### **Token Operations**
```
"Create a fungible token called MyToken with symbol MTK"
"Create an NFT collection called MyNFTs with symbol MNFT"  
"Mint 1000 more tokens for token 0.0.1234567"
```

### **Account Operations**
```
"What's my HBAR balance?"
"Transfer 10 HBAR to 0.0.1234567"
"Get account information for 0.0.1234567"
```

### **Consensus Service**
```
"Create a topic called MyTopic"
"Submit message 'Hello World' to topic 0.0.1234567"
```

## 🔧 API Endpoints

### **Chat with Agent**
```bash
POST /api/agent/chat
Content-Type: application/json

{
  "sessionId": "user123",
  "accountId": "0.0.6255888", 
  "privateKey": "your_private_key",
  "message": "Create a fungible token called TestToken with symbol TST"
}
```

### **Session Management**
```bash
# Clear specific session
DELETE /api/agent/session/:sessionId

# Clear all sessions
DELETE /api/agent/sessions
```

