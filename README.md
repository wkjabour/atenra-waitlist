# Atenra Waitlist

A modern, responsive waitlist application for Atenra - Your Personal & Business Assistant, On Demand.

## Overview

This application provides a beautiful, mobile-optimized waitlist signup form for both clients and business partners. Form submissions are sent directly to `contact@atenra.com` via mailto links, enabling easy integration with any email provider.

## Features

- **Dual User Types**: Separate signup paths for clients and business partners
- **Mobile Optimized**: Fully responsive design that works on all devices
- **No Backend Required**: All form submissions use mailto links
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Dark/Light Theme**: Automatic theme detection with manual toggle
- **Responsive Typography**: Adaptive text sizes for mobile and desktop

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Top navigation with logo and theme toggle
│   ├── WaitlistForm.tsx    # Main form component
│   ├── UserTypeSelector.tsx # Client/Business toggle
│   └── ui/                 # shadcn/ui components
├── pages/
│   ├── Index.tsx           # Main landing page
│   └── NotFound.tsx        # 404 page
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities
└── App.tsx                 # Root component
```

## Setup

### Prerequisites

- Node.js >= 18
- npm or bun package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd atenra-waitlist

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

The application will be available at `http://localhost:8080`

### Build

```bash
npm run build
# or
bun run build
```

## Deployment

### Cloudflare Workers

This application is optimized for deployment to Cloudflare Workers using Wrangler.

#### Setup Steps:

1. **Install Wrangler CLI**:
   ```bash
   npm install -g wrangler
   ```

2. **Create `wrangler.toml`** (at project root):
   ```toml
   name = "atenra-waitlist"
   type = "javascript"
   main = "build/index.js"
   
   [env.production]
   route = "atenra.com/*"
   zone_id = "YOUR_ZONE_ID"
   ```

3. **Build and Deploy**:
   ```bash
   npm run build
   wrangler deploy
   ```

#### Alternative: Direct Upload

The built files in the `dist/` directory can also be deployed to Cloudflare Pages:

1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### Other Hosting Options

The built `dist/` folder can be deployed to any static hosting provider:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop the `dist` folder
- **AWS S3**: Upload files to S3 bucket
- **GitHub Pages**: Push to `gh-pages` branch

## Form Submission

All form data is sent via mailto links directly to `contact@atenra.com`. The form automatically formats:

- **Subject**: Identifies signup type (Client/Business Partner)
- **Body**: Includes all submitted information in a readable format

Users can submit using:
1. The "Join the Waitlist" button - sends form data via email
2. The "Email Us Directly" button - opens their default email client

## Development

### Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
```

### Adding New Components

Use the shadcn/ui CLI to add components:

```bash
npx shadcn-ui@latest add button
```

### Styling

- **Framework**: Tailwind CSS
- **Component Library**: shadcn/ui
- **Theme**: Dark by default, with light mode toggle
- **Animations**: Custom keyframes in `src/App.css`

## Mobile Optimization

The application uses responsive breakpoints:

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)

Key mobile optimizations:
- Reduced padding and spacing
- Adaptive font sizes
- Touch-friendly button sizes (44px+ minimum)
- Full-width form inputs
- Optimized logo sizing for small screens

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Environment Variables

Currently, no environment variables are required. The application uses hardcoded email: `contact@atenra.com`

## License

MIT

## Support

For questions or issues, please email `contact@atenra.com`
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

See the **Deployment** section above for Cloudflare Workers, Pages, or other hosting options.
