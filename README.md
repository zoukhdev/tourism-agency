# Al-Hijrah Tourism Website

A professional and user-friendly React and Tailwind CSS website for a tourism agency specializing in Hajj, Umrah, and global tourism services.

## Features

### Pages
1. **Homepage** - Introduces the agency, highlights services, and showcases special offers
2. **Hajj & Umrah Programs** - Details various Hajj and Umrah packages with filtering options
3. **Global Tourism Packages** - Presents diverse tourism packages with destination and interest-based filtering
4. **Package Details** - Provides in-depth information about selected packages including itinerary, inclusions, and pricing
5. **Booking Form** - Comprehensive multi-step form for service selection, personal information, travel details, and payment
6. **Contact Us** - Contact form, office information, and FAQ section

### Key Features
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Interactive Filtering** - Advanced filtering options for packages
- **Multi-step Booking** - User-friendly booking process with validation
- **SEO Optimized** - Proper meta tags and semantic HTML
- **Accessibility** - ARIA labels and keyboard navigation support

## Technology Stack

- **React 18** - Frontend framework
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project files**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the website

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   ├── Header.js          # Navigation header component
│   └── Footer.js          # Footer component
├── pages/
│   ├── Homepage.js        # Landing page
│   ├── HajjUmrah.js       # Hajj & Umrah packages page
│   ├── GlobalTourism.js   # Global tourism packages page
│   ├── PackageDetails.js  # Individual package details
│   ├── BookingForm.js     # Multi-step booking form
│   └── ContactUs.js       # Contact page with form
├── App.js                 # Main app component with routing
├── index.js               # App entry point
└── index.css              # Global styles and Tailwind imports
```

## Customization

### Colors
The website uses a custom color palette defined in `tailwind.config.js`:
- **Primary**: Blue tones for main branding
- **Secondary**: Yellow/gold tones for accents

### Content
- Update package information in the respective page components
- Modify contact information in `Footer.js` and `ContactUs.js`
- Customize the agency name and branding throughout the components

### Images
Replace placeholder images with your own:
- Update image URLs in the components
- Ensure images are optimized for web (WebP format recommended)
- Maintain consistent aspect ratios

## Deployment

### Build for Production
```bash
npm run build
```

This creates a `build` folder with optimized production files.

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

The website is optimized for performance with:
- Lazy loading for images
- Optimized bundle size
- Efficient CSS with Tailwind's purging
- Responsive images

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact:
- Email: info@alhijrahtourism.com
- Phone: +1 (555) 123-4567

## Future Enhancements

- User authentication and accounts
- Online payment integration
- Real-time chat support
- Multi-language support
- Advanced search functionality
- Customer reviews and ratings
- Blog/news section
- Newsletter subscription
