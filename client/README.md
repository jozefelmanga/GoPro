# GoPro Frontend

This is the React frontend application for the GoPro project management platform.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm start
```
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Build for Production
```bash
npm run build
```
Builds the app for production to the `build` folder.

### Testing
```bash
npm test
```
Launches the test runner in interactive watch mode.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── admin/          # Admin-specific components
│   │   ├── AddUser.js
│   │   ├── Home.js
│   │   ├── ProfileAdmin.js
│   │   ├── UpdateUser.js
│   │   └── Users.js
│   ├── gestionnaire/   # Manager-specific components
│   │   ├── Home.js
│   │   ├── Projects.js
│   │   ├── Users.js
│   │   └── project/    # Project management components
│   │       ├── AddProject.js
│   │       ├── AddTask.js
│   │       ├── Avatars.js
│   │       ├── ConsultProject.js
│   │       ├── ConsultTask.js
│   │       ├── List.js
│   │       ├── Staff.js
│   │       └── Tasks.js
│   ├── user/          # User-specific components
│   │   ├── Avatars.js
│   │   ├── ConsultProject.js
│   │   ├── ConsultTask.js
│   │   ├── Home.js
│   │   ├── List.js
│   │   ├── Projects.js
│   │   ├── Staff.js
│   │   └── Tasks.js
│   └── Profile.js     # Shared profile component
├── guard/             # Route protection components
│   ├── ProtectedAdmin.js
│   ├── ProtectedGest.js
│   └── ProtectedUser.js
├── views/             # Main page components
│   ├── Admin.js
│   ├── Gestionnaire.js
│   ├── Login.js
│   ├── NotFound.js
│   └── User.js
├── img/              # Static assets
├── App.js            # Main application component
├── App.css           # Main application styles
├── index.js          # Application entry point
└── login.css         # Login page styles
```

## 🛠️ Key Dependencies

- **React 18** - UI framework
- **Material-UI** - Component library for consistent design
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **JWT Decode** - Token handling and authentication
- **SweetAlert2** - Beautiful notifications and alerts

## 🔐 Authentication & Routing

The application implements role-based routing with protected routes:

- **Admin Routes**: `/admin/*` - User management and system administration
- **Manager Routes**: `/gestionnaire/*` - Project and task management
- **User Routes**: `/user/*` - View assigned projects and tasks

Each route is protected by middleware that verifies user authentication and role permissions.

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Material Design**: Consistent and modern UI components
- **Role-Based Interface**: Different layouts and features based on user role
- **Real-time Notifications**: User-friendly alerts and confirmations
- **Intuitive Navigation**: Easy-to-use interface for all user types

## 🔧 Configuration

The frontend connects to the backend API running on `http://localhost:3001`. Make sure the backend server is running before starting the frontend application.

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🚀 Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to your web server

3. Ensure the backend API is accessible from your deployment environment

## 🤝 Contributing

When contributing to the frontend:

1. Follow the existing code structure and naming conventions
2. Use Material-UI components for consistency
3. Implement proper error handling for API calls
4. Add appropriate loading states for better UX
5. Test on different screen sizes for responsiveness

## 📝 Notes

- The application uses JWT tokens stored in localStorage for authentication
- API calls are made to the backend server running on port 3001
- All components are designed to be responsive and accessible
- Error boundaries and loading states are implemented for better user experience
