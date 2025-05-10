# Mini Blog M2K Admin Web

A high-performance React admin interface for Mini Blog M2K, separated from the main user-facing blog application.

## Features

- ⚡️ Lightning-fast performance with Vite
- 🔄 Code splitting and lazy loading
- 📱 Responsive admin dashboard
- 🧩 Component-based architecture
- 🔍 SEO-friendly (where applicable)
- 📊 Performance monitoring with Web Vitals
- 🖼️ Optimized image loading
- 📋 Virtualized lists for handling large datasets
- 🔄 Efficient state management with Zustand
- 📡 Smart data fetching with SWR
- 📝 Markdown support for admin notes
- ➗ Mathematical equations with KaTeX (if needed)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mini-blog-m2k-web.git
   cd mini-blog-m2k-web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run analyze` - Analyze the bundle size

## Project Structure 

## Writing Posts

Posts support Markdown syntax and mathematical equations:

### Markdown Features
- GitHub Flavored Markdown (GFM)
- Tables
- Task lists
- Strikethrough
- Autolinks
- Code blocks with syntax highlighting

### Mathematical Equations
You can write mathematical equations using KaTeX syntax:

Inline equations: `$E = mc^2$`
Display equations:
```math
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
``` 

## Development

css use BEM

BEM (Block Element Modifier)

## Deployment

### Development
```bash
npm run dev
```

### Production
1. Build the application:
```bash
npm run build
```

2. Configure your web server (e.g., Nginx) with the provided configuration.

3. Deploy the built files from the `dist` directory to your web server.

### Proxy Configuration
The application uses a reverse proxy to handle API requests:

- Development: Vite's built-in proxy (configured in `vite.config.js`)
- Production: Web server proxy (e.g., Nginx configuration provided)

All API requests are proxied through `/api` to avoid CORS issues and provide better security.

## Docker Nginx Env Test

```sh
# Build the Docker image
podkman build -t mini-blog-m2k-web .

# Run the container
podman run -p 3000:3000 mini-blog-m2k-web
```