# Wedding Site

A modern, performant wedding website built with React, Vite, Tailwind CSS, and Framer Motion.

## Features

- ⚡ **Vite** - Lightning-fast build tool
- ⚛️ **React 18** - Latest React features
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- ✨ **Framer Motion** - Production-ready animation library
- 📱 **Responsive Design** - Mobile-first approach
- ♿ **Accessibility** - Respects `prefers-reduced-motion`
- 💅 **ESLint + Prettier** - Code quality and formatting

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Production Preview

```bash
npm start
```

### Lint

```bash
npm run lint
```

## Project Structure

```
wedding-site/
├── src/
│   ├── App.jsx        # Main app component
│   ├── main.jsx       # React entry point
│   └── index.css      # Global styles with CSS variables
├── public/            # Static assets
├── index.html         # HTML template
├── vite.config.js     # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration
└── package.json       # Dependencies and scripts
```

## CSS Variables

The project uses CSS variables for theming (defined in `src/index.css`):

- `--color-primary`
- `--color-secondary`
- `--color-accent`
- `--color-background`
- `--color-foreground`
- `--color-muted`

## Performance Optimizations

- Vite's lightning-fast HMR
- ESBuild minification
- Reduced motion support
- CSS minification
- Tree-shaking and code splitting

## Customization

1. Update colors in [src/index.css](src/index.css)
2. Modify Tailwind config in [tailwind.config.js](tailwind.config.js)
3. Create components in `src/components/` folder
4. Add routes using React Router (if needed)

## License

MIT
