# 🎓 AP Computer Science A Interactive Learning Platform

An interactive web-based learning platform for AP Computer Science A students, featuring hands-on coding exercises, automatic grading, progress tracking, and achievement badges.

![Deploy Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🌐 Live Demo

- **Website**: https://mengqiyang77.github.io/ap-csa-learning/
- **Backend API**: Deployed on Vercel

## ✨ Features

### 📚 Comprehensive Curriculum
- **Chapter 9: Arrays** - 1D arrays, 2D arrays, algorithms (search, sort)
- **Chapter 10: Encapsulation** - Private fields, getters/setters, information hiding
- **Chapter 11: ArrayList** - Dynamic arrays, generics, common methods

### 💻 Interactive Code Editor
- Monaco Editor with Java syntax highlighting
- Real-time code submission and storage
- Automatic code grading with instant feedback
- Test case validation with hints

### 📊 Student Dashboard
- Overall progress visualization
- Chapter-specific progress bars
- Recent code submissions timeline
- Recommended next topics

### 🏆 Achievement System
- 13 unique badges across 4 categories
- Automatic badge unlocking
- Rarity system (Common/Rare/Epic/Legendary)
- Toast notifications for new achievements

### 📝 Code History
- Complete submission history
- Version tracking per exercise
- Side-by-side code comparison (diff viewer)
- Filter by chapter and exercise

### 👨‍🏫 Admin Dashboard
- View all student submissions
- Track student progress
- Export data to CSV
- Role-based access control

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS 4** for styling
- **shadcn/ui** component library
- **Monaco Editor** for code editing
- **Wouter** for routing
- **tRPC** for type-safe API calls

### Backend
- **Node.js** with Express
- **tRPC** for API layer
- **Drizzle ORM** for database
- **MySQL** (PlanetScale)
- **JWT** authentication

## 🚀 Deployment

This project uses a hybrid deployment strategy:
- **Frontend**: GitHub Pages (static hosting)
- **Backend**: Vercel (serverless functions)
- **Database**: PlanetScale (MySQL)

**📖 See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.**

## 📦 Installation (Local Development)

```bash
# Clone the repository
git clone https://github.com/MengqiYang77/ap-csa-learning.git
cd ap-csa-learning

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
pnpm db:push

# Start development server
pnpm dev
```

Visit `http://localhost:3000`

## 🔧 Environment Variables

### Backend (.env)
```
DATABASE_URL=mysql://...
JWT_SECRET=your-secret-key
NODE_ENV=development
```

### Frontend (client/.env.production)
```
VITE_API_URL=https://your-backend.vercel.app
```

## 📁 Project Structure

```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── pages/       # Page components
│   │   ├── components/  # Reusable UI components
│   │   └── App.tsx      # Main app component
├── server/              # Backend Express + tRPC
│   ├── routers.ts      # API routes
│   └── db.ts           # Database connection
├── shared/             # Shared types and utilities
│   ├── badges.ts       # Badge definitions
│   └── codeGrader.ts   # Code grading logic
├── drizzle/            # Database schema
│   └── schema.ts       # Database tables
└── .github/
    └── workflows/      # GitHub Actions
```

## 🎯 Key Features

### Automatic Code Grading
Pattern-matching and static analysis provide immediate feedback:
- Checks for required imports
- Validates variable declarations
- Verifies method calls
- Provides specific hints

### Badge System
Students earn badges by:
- Submitting code exercises
- Completing chapters
- Achieving perfect scores
- Unlocking special achievements

### Progress Tracking
- Real-time progress updates
- Per-chapter completion tracking
- Submission history
- Personalized recommendations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for educational purposes.

## 👨‍💻 Author

**Mengqi Yang**
- GitHub: [@MengqiYang77](https://github.com/MengqiYang77)

## 🙏 Acknowledgments

- Built with [Manus](https://manus.im)
- Curriculum based on "Java Methods 4th Edition"
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Lucide](https://lucide.dev/) for icons

---

**Built with ❤️ for AP CSA students**
