# ZOOM IT Backend API

Node.js, Express, এবং Mongoose দিয়ে তৈরি RESTful API server।

## 🚀 Features

- TypeScript-based backend
- Express.js framework
- MongoDB with Mongoose
- JWT authentication
- File upload with Cloudinary
- Email service integration
- SSLCommerz payment integration
- Action logging system
- Comprehensive error handling

## 📋 Prerequisites

- Node.js (v18.x or higher)
- Yarn package manager
- MongoDB database
- TypeScript

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/ibnabdullah1/zoomit-beckend.git
cd zoomit-beckend
```

2. Install dependencies:
```bash
yarn install
```

3. Setup environment variables:
```bash
# Copy the example env file
cp env.example .env

# Edit .env file with your actual values
```

4. Build the project:
```bash
yarn build
```

5. Start the server:
```bash
# Development mode
yarn dev

# Production mode
yarn start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── config/          # Configuration files
│   ├── DB/             # Database seed files
│   ├── errors/         # Error handling
│   ├── helpers/        # Helper functions
│   ├── interface/      # TypeScript interfaces
│   ├── middleware/     # Express middlewares
│   ├── modules/        # Feature modules
│   ├── routes/         # Route definitions
│   └── utils/          # Utility functions
├── scripts/            # Utility scripts
└── templates/          # Email templates
```

## 🔧 Available Scripts

- `yarn dev` - Start development server with hot reload
- `yarn build` - Build TypeScript to JavaScript
- `yarn start` - Start production server
- `yarn create-module` - Create a new module using the generator

## 🌐 API Endpoints

Base URL: `http://localhost:3000/api`

### Main Modules:
- `/api/auth` - Authentication endpoints
- `/api/users` - User management
- `/api/blogs` - Blog posts
- `/api/projects` - Project management
- `/api/services` - Service management
- `/api/inquiries` - Inquiry management
- And more...

## 🔐 Environment Variables

See `env.example` for all required environment variables.

Key variables:
- `PORT` - Server port (default: 3000)
- `DB_URL` - MongoDB connection string
- `JWT_ACCESS_SECRET` - JWT access token secret
- `JWT_REFRESH_SECRET` - JWT refresh token secret
- `CLOUDINARY_*` - Cloudinary configuration
- And more...

## 🚢 Deployment

### CI/CD Setup

This project includes GitHub Actions workflows for automatic deployment.

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.**

### Quick Deployment Steps:

1. **Setup GitHub Secrets:**
   - Go to Repository Settings → Secrets and variables → Actions
   - Add the following secrets:
     - `FTP_HOST` = `103.29.180.47` (or `thezoomit.com`)
     - `FTP_USERNAME` = `thezoomit`
     - `FTP_PASSWORD` = `FA]uoi1842XlZ-erw`

2. **Automatic Deployment:**
   - Push to `main` or `master` branch → Auto deploy to production
   - Push to `develop` or `dev` branch → Auto deploy to development

3. **Manual Deployment:**
   - Use the deployment scripts in `scripts/` folder
   - Or manually upload via FTP

## 📝 Server Information

- **Webuzo Control Panel:** https://meghna.hostseba.com:2003/
- **FTP Host:** 103.29.180.47 (or thezoomit.com)
- **Domain:** https://www.thezoomit.com

## 🧪 Development

### Creating a New Module

Use the built-in module generator:

```bash
yarn create-module
```

Follow the prompts to create a new module with:
- Controller
- Service
- Routes
- Model
- Validation
- Interface

## 📦 Dependencies

### Main Dependencies:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcrypt` - Password hashing
- `cloudinary` - Image upload service
- `zod` - Schema validation
- `nodemailer` - Email service

See `package.json` for complete list.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

MIT License

## 👥 Authors

Zoom IT Development Team

## 📧 Contact

- Email: info@thezoomit.com
- Website: https://thezoomit.com

---

**Note:** Make sure to set up all environment variables before running the application. See `env.example` for reference.

