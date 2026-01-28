# Task List Frontend

React frontend for the Spring Boot Task List API.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Spring Boot backend running on `http://localhost:8080`

### Installation

1. **Clone and install dependencies**
```bash
npm install
```

2. **Configure environment**
```bash
cp .env.example .env
```

Edit `.env` if your Spring Boot API is on a different URL:
```env
VITE_API_URL=http://localhost:8080/api
```

3. **Start development server**
```bash
npm run dev
```

The app will run on `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── StatusBadge.tsx      # Task status display component
│   └── TaskList.tsx          # Main task list component
├── services/
│   └── api.ts                # API client for Spring Boot backend
├── types/
│   ├── Task.ts               # Task types and enums
│   ├── User.ts               # User types
│   └── AuditLog.ts           # Audit log types
└── App.tsx                   # Main application component
```

## 🔧 Spring Boot Backend Setup

Your Spring Boot API must allow CORS requests. See [CORS_SETUP.md](./CORS_SETUP.md) for configuration instructions.

## 📊 Type Definitions

All TypeScript types match your Spring Boot models exactly:

### TaskStatus Enum
- `PENDING` - Task is pending
- `IN_PROGRESS` - Task is in progress  
- `COMPLETED` - Task is completed
- `CANCELLED` - Task is cancelled

### Task Interface
```typescript
interface Task {
  id: number;
  title: string;
  description: string | null;
  dueDate: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  lastModifiedBy: string;
}
```

## 🔌 API Endpoints Used

The frontend connects to these Spring Boot endpoints:

**Tasks:**
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/{id}` - Get task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task
- `GET /api/tasks/status/{status}` - Get tasks by status
- `GET /api/tasks/overdue` - Get overdue tasks

**Authentication:**
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/users/me` - Get current user

**Audit Logs:**
- `GET /api/audit` - Get all audit logs
- `GET /api/audit/task/{taskId}` - Get logs for specific task
- `GET /api/audit/user/{username}` - Get logs by user

## 🎨 Components

### StatusBadge
Displays task status with color-coded badges:
```tsx
import StatusBadge from './components/StatusBadge';
import { TaskStatus } from './types/Task';

<StatusBadge status={TaskStatus.IN_PROGRESS} />
```

### TaskList
Main component that displays all tasks with their details:
```tsx
import TaskList from './components/TaskList';

<TaskList />
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Authentication

The API client automatically includes authentication tokens in requests. Store the token after login:

```typescript
import { authApi } from './services/api';

const handleLogin = async (username: string, password: string) => {
  const response = await authApi.login({ username, password });
  localStorage.setItem('authToken', response.token);
};
```

## 📝 Next Steps

1. ✅ Set up CORS in Spring Boot (see CORS_SETUP.md)
2. ✅ Start your Spring Boot backend
3. ✅ Start this frontend
4. 🎯 Add more components (CreateTask, EditTask, etc.)
5. 🎯 Implement authentication UI
6. 🎯 Add task filtering and sorting
7. 🎯 Create audit log viewer

## 🐛 Troubleshooting

**CORS Error:**
- Make sure CORS is configured in Spring Boot
- Verify the frontend URL matches the `allowedOrigins` in Spring Boot

**API Connection Failed:**
- Check if Spring Boot is running on `http://localhost:8080`
- Verify `.env` file has correct `VITE_API_URL`

**Module not found errors:**
- Run `npm install` to ensure all dependencies are installed
- Check that all import paths are correct

## 📦 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling (optional, used in components)

## 🤝 Contributing

This frontend is designed to work with the Spring Boot Task List API. Ensure type definitions stay in sync with backend models.