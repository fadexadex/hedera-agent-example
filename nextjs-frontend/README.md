# Hedera Agent Kit - Next.js Frontend

A beautiful, modern React frontend for interacting with the Hedera Agent Kit backend. Features a clean chat interface with real-time blockchain operations.

## 🚀 Features

- **Modern Chat Interface** - Clean, responsive design with real-time messaging
- **Hedera Integration** - Direct connection to Hedera testnet via agent backend
- **Transaction Tracking** - Display transaction IDs, token IDs, and HashScan links
- **Session Management** - Persistent conversations with memory
- **Copy & Share** - Easy copying of transaction details and links
- **Secure Credentials** - Local credential management (not stored on server)

## 🛠️ Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Setup environment:**
```bash
cp env.example .env.local
```

3. **Start the backend** (in the express folder):
```bash
cd ../express
npm run dev
```

4. **Start the frontend:**
```bash
npm run dev
```

5. **Open your browser:**
```
http://localhost:3000
```

## 🔧 Configuration

Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 💡 Usage

### 1. **Connect Your Account**
- Enter your Hedera testnet Account ID (e.g., `0.0.1234567`)
- Enter your ECDSA private key
- Click "Connect to Hedera"

### 2. **Start Chatting**
Ask the agent to perform blockchain operations:

**Token Operations:**
- "Create a fungible token called MyToken with symbol MTK"
- "Create an NFT collection called MyNFTs with symbol MNFT"
- "Mint 1000 more tokens for token 0.0.1234567"

**Account Operations:**
- "What's my HBAR balance?"
- "Transfer 10 HBAR to 0.0.1234567"
- "Get account information for 0.0.1234567"

**Consensus Service:**
- "Create a topic called MyTopic"
- "Submit message 'Hello World' to topic 0.0.1234567"

## 🎨 UI Features

### **Chat Interface**
- Real-time messaging with the AI agent
- Message history with timestamps
- Loading indicators during operations
- Error handling with clear messages

### **Transaction Details**
- **Token ID** display with copy button
- **Transaction ID** with copy functionality  
- **HashScan Links** for blockchain verification
- Success/error status indicators

### **Settings Panel**
- View connected account
- Change credentials
- Clear conversation history
- Session management

## 🔒 Security

- **No server-side storage** - Credentials stay in your browser
- **HTTPS ready** - Secure communication with backend
- **Input validation** - Prevents malformed requests
- **Error boundaries** - Graceful error handling

## 📱 Responsive Design

- **Mobile-first** approach
- **Tablet optimized** layout
- **Desktop enhanced** experience
- **Accessibility** features included

## 🌐 API Integration

The frontend communicates with the Express backend through:

- `POST /api/agent/chat` - Send messages to agent
- `DELETE /api/agent/session/:id` - Clear session memory
- `DELETE /api/agent/sessions` - Clear all sessions

## 🎯 Example Interactions

### Create a Token
```
User: "Create a fungible token called TestToken with symbol TST"
Agent: "Token created successfully: https://hashscan.io/testnet/account/0.0.5298898/operations"
```

### Check Balance
```
User: "What's my HBAR balance?"
Agent: "Your current HBAR balance is 1,000.50 HBAR"
```

### Transfer HBAR
```
User: "Transfer 5 HBAR to 0.0.1234567"
Agent: "Successfully transferred 5 HBAR. Transaction: 0.0.4808440@1729860479.834850000"
```

## 🚀 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📦 Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **Axios** - HTTP client for API communication

## 🤝 Contributing

See the main [CONTRIBUTING.md](../../../CONTRIBUTING.md) for guidelines.