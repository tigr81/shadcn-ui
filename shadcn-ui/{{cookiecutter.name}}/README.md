# SHADCN-UI TEMPLATE

A comprehensive, production-ready React template built with shadcn/ui, TypeScript, Vite, and modern development tools. This template provides a solid foundation for building beautiful, accessible web applications.

## Features

- 🎨 **shadcn/ui Components** - Complete set of accessible, customizable UI components
- ⚡ **Vite** - Lightning-fast build tool and dev server
- 🔷 **TypeScript** - Full type safety throughout the application
- 🎯 **React Router** - Client-side routing with authentication guards
- 🗄️ **Redux Toolkit** - State management with persistence
- 🔄 **React Query** - Powerful data fetching and caching
- 🌓 **Dark Mode** - Built-in theme switching with customization
- 📱 **Responsive** - Mobile-first design approach
- ♿ **Accessible** - WCAG compliant components
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧪 **Form Validation** - React Hook Form + Zod integration
- 🎭 **Command Palette** - Global command palette (Cmd+K)

## Tech Stack

### Core
- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool and dev server
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Node.js](https://nodejs.org/en/) - Runtime (v20.9.0+)

### UI & Styling
- [shadcn/ui](https://ui.shadcn.com/docs) - Component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Lucide React](https://lucide.dev/) - Icon library

### State & Data
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [React Query](https://tanstack.com/query) - Data fetching
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - Schema validation

### Development Tools
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting
- [Yarn](https://yarnpkg.com/) - Package manager

## Getting Started

### Prerequisites

- Node.js v20.9.0 or higher
- Yarn package manager
- (Optional) nvm for Node version management

### Installation

1. **Install dependencies:**

```bash
yarn install
```

2. **Set up environment variables:**

Copy `.env.example` to `.env` and configure your environment variables:

```bash
cp .env.example .env
```

Edit `.env` and set your API base URL:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

3. **Start the development server:**

```bash
yarn dev
```

The application will be available at `http://localhost:3000`.

### Build for Production

```bash
yarn build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
yarn preview
```

## Project Structure

```
src/
├── api/              # API client and configuration
├── components/       # React components
│   ├── app/         # Application-specific components
│   ├── forms/       # Form components and utilities
│   ├── layouts/     # Layout components (sidebar, breadcrumbs)
│   ├── theme/       # Theme customization components
│   └── ui/          # shadcn/ui components
├── config/          # Configuration files (routes, etc.)
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── pages/            # Page components
├── store/            # Redux store and slices
└── Routers.tsx       # Router configuration
```

## Available Components

This template includes a comprehensive set of shadcn/ui components:

### Form Components
- Input, Textarea, Select, Checkbox, Radio Group, Switch, Slider

### UI Components
- Button, Badge, Avatar, Card, Separator, Skeleton, Progress

### Overlay Components
- Dialog, Alert Dialog, Popover, Tooltip, Hover Card, Command Palette

### Navigation
- Tabs, Accordion, Sidebar, Breadcrumbs, Navigation Menu

### Data Display
- Table, Calendar, Chart (Recharts integration)

### Layout
- Scroll Area, Resizable Panels

View all components with live examples on the `/components` page.

## Usage Examples

### Adding a New Route

1. Create your page component in `src/pages/`:

```tsx
// src/pages/MyPage.tsx
import { Typography } from '@/components/ui-system';

export default function MyPage() {
  return (
    <div>
      <Typography variant="h1">My Page</Typography>
    </div>
  );
}
```

2. Add the route to `src/config/routes.ts`:

```tsx
{
  id: 'MY_PAGE',
  path: '/my-page',
  component: MyPage,
  title: 'My Page',
  icon: MyIcon,
  showInNav: true,
  requiresAuth: true,
  requiresOnboarding: true,
}
```

### Using Form Components

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Input {...form.register('email')} />
      <Input type="password" {...form.register('password')} />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### Using Custom Hooks

```tsx
import { useDebounce } from '@/hooks/use-debounce';
import { useLocalStorage } from '@/hooks/use-local-storage';

function MyComponent() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  // Use debouncedSearch for API calls
}
```

### Using Utility Functions

```tsx
import { formatDate, formatCurrency } from '@/lib/format';
import { getApiErrorMessage } from '@/lib/api-helpers';

const date = formatDate(new Date(), 'PP');
const price = formatCurrency(1234.56, 'USD');
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api

# Application Configuration
VITE_APP_NAME=My Application
VITE_ENV=development
```

## Development Workflow

### Code Formatting

Format code with Prettier:

```bash
yarn format
```

### Linting

Lint code with ESLint:

```bash
yarn lint
```

Fix linting issues automatically:

```bash
yarn lint:fix
```

### Type Checking

Check TypeScript types:

```bash
yarn typecheck
```

### Pre-commit Hook

Before committing, run:

```bash
yarn precommit
```

This will format and lint your code automatically.

## Command Palette

Press `Cmd+K` (or `Ctrl+K` on Windows/Linux) to open the global command palette. Use it to:
- Navigate to any page
- Access quick actions
- Search for routes

## Theme Customization

The template includes a theme customization system. Users can:
- Switch between light and dark modes
- Customize colors
- Adjust border radius
- Save preferences

Access theme settings from the Settings page or use the theme switcher in the header.

## API Integration

The template includes:
- OpenAPI client generation support
- Axios interceptors for error handling
- React Query for data fetching
- Type-safe API calls

Generate API client from OpenAPI spec:

```bash
yarn generate-client
```

## Deployment

### Build

```bash
yarn build
```

### Environment Variables

Make sure to set all required environment variables in your deployment platform.

### Static Hosting

The build output in `dist/` can be deployed to any static hosting service:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

## Contributing

1. Make your changes
2. Run `yarn precommit` to format and lint
3. Test your changes
4. Submit a pull request

## Additional Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/docs)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
