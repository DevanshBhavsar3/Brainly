# Brainly - Your second brain

Your personal digital sanctuary for links and knowledge. Save, organize, and access your important URLs instantly, making bookmark hunting a thing of the past. Share your curated collections effortlessly with friends and colleagues.

Key Features:

- 🔍 Quick Access to Saved Links
- 📂 Smart Organization
- 🔗 Effortless Link Management
- 🤝 Effortless Sharing
- 🌐 Access Anywhere

## Tech Stack

### Frontend

- React with TypeScript
- Recoil for state management
- Axios for API calls
- Vite as build tool
- TailwindCSS for styling

### Backend

- Node.js with Express
- MongoDB for database
- JWT for authentication
- Zod for validation
- TypeScript

## System Architecture

![system-arch](https://github.com/user-attachments/assets/4da5eeab-4e98-4ee5-9946-8f7e94aa8281)

## Local Setup

### Prerequisites

- Node.js (v16+)
- MongoDB
- Git

### Installation Steps

1. Clone the repository

```bash
git clone https://github.com/DevanshBhavsar3/Brainly
cd Brainly
```

2. Setup Backend

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

3. Setup Frontend

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

4. Configure Environment Variables

Backend (.env):

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/brainly
JWT_SECRET=your_jwt_secret
```

Frontend (.env):

```
VITE_BACKEND_URL=http://localhost:3000
```

5. Access the Application

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/improvement`)
5. Create a Pull Request
