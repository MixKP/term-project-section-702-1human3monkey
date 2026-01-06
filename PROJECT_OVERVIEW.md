# Project Overview: Dazzle E-Commerce Platform

## Project Summary

**Dazzle** is a full-stack e-commerce web application developed as a term project for Section 702. This platform provides a complete online shopping experience with user authentication, product browsing, shopping cart functionality, and an administrative backoffice for managing products and categories.

## Team Members

This project was developed by the **1human3monkey** team:

1. **Xiaoyou Fung** - Student ID: 652115059
2. **Mixkupp (Peeranat Thiwongsa)** - Student ID: 662115034
3. **RinZ5 (Supawit Promma)** - Student ID: 662115049
4. **Arwynhwyl (Sattaya Mingsathia)** - Student ID: 662115050

## Technology Stack

### Backend
- **Runtime**: Node.js 18
- **Framework**: Express.js
- **Template Engine**: EJS (Embedded JavaScript Templates)
- **Database**: MySQL (latest)
- **Session Management**: express-session with MySQL session store
- **Authentication**: bcryptjs for password hashing
- **File Upload**: Multer for handling image uploads

### Frontend
- **Styling**: Bootstrap (responsive design)
- **Template Engine**: EJS for server-side rendering
- **Static Assets**: CSS, JavaScript, Images

### DevOps & Infrastructure
- **Containerization**: Docker & Docker Compose
- **Development**: Nodemon for auto-reloading
- **Port**: Application runs on port 3000

## Key Features

### User-Facing Features
1. **User Authentication**
   - Registration with email and password
   - Secure login with bcrypt password hashing
   - Session-based authentication
   - Role-based access control (user/admin)

2. **Product Browsing**
   - Homepage with highlighted products carousel
   - Discounted products showcase
   - Product search functionality
   - Category-based product filtering
   - Detailed product pages with images and descriptions

3. **Shopping Cart**
   - Add/remove products from cart
   - Quantity management
   - Persistent cart data (MySQL-backed)

4. **Checkout Process**
   - Address management
   - Credit card information handling
   - Order history tracking

5. **Contact Page**
   - Business information
   - Contact details
   - Google Maps integration
   - Social media links

### Administrative Features (Backoffice)
1. **Product Management**
   - Add new products
   - Edit existing products
   - Product attributes (color, size, quantity)
   - Image upload support
   - Pricing and discount management

2. **Category Management**
   - Create categories
   - Edit categories
   - Category image management
   - Carousel image configuration

3. **Order History**
   - View all customer orders
   - Order status tracking
   - Sales analytics

## Project Structure

```
├── controllers/          # Business logic controllers
│   ├── authController.js
│   ├── productController.js
│   ├── cartController.js
│   ├── categoryController.js
│   ├── backofficeProductController.js
│   └── backofficeCategoryController.js
├── models/              # Database models
│   ├── userModel.js
│   ├── productModel.js
│   ├── cartModel.js
│   ├── categoryModel.js
│   ├── addressModel.js
│   ├── creditCardModel.js
│   └── historyModel.js
├── routes/              # API routes
│   ├── auth.js
│   ├── productRoute.js
│   ├── categoryRoute.js
│   ├── cart.js
│   ├── checkout.js
│   ├── historyRoute.js
│   └── backoffice routes
├── views/               # EJS templates
│   ├── pages/           # Page templates
│   └── partials/        # Reusable components
├── services/            # Database and utility services
│   ├── db.js
│   ├── database.js
│   └── testDatabaseConnection.js
├── middleware/          # Express middleware
│   └── categoryMiddleware.js
├── public/              # Static assets
│   ├── css/
│   ├── js/
│   ├── images/
│   └── uploads/         # User-uploaded images
├── server.js            # Application entry point
├── Dockerfile           # Docker configuration
└── docker-compose-*.yml # Docker Compose configurations
```

## Database Schema

The application uses MySQL with the following main tables:
- **Category**: Product categories with images
- **Product**: Product information with pricing and discounts
- **ProductAttribute**: Product variants (color, size, quantity)
- **User**: User accounts with authentication
- **Cart**: Shopping cart items
- **Address**: User shipping addresses
- **CreditCard**: Payment information
- **OrderHistory**: Purchase records

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js 18 (if running locally)
- MySQL (if running locally)

### Running with Docker (Recommended)

1. Set up environment variables in `.env` file
2. Run development environment:
   ```bash
   docker-compose -f docker-compose-dev.yml up
   ```

3. Access the application at `http://localhost:3000`

### Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure database connection in `.env`

3. Start the server:
   ```bash
   npm start
   ```

## Environment Variables

The application requires the following environment variables:
- `MYSQL_ROOT_PASSWORD`: MySQL root password
- `MYSQL_DATABASE`: Database name
- `MYSQL_USER`: Database user
- `MYSQL_PASSWORD`: Database password
- `ADMIN_EMAIL`: Default admin email
- `ADMIN_PASSWORD`: Default admin password

## Design & Documentation

- **UI/UX Design**: [Figma Design](https://www.figma.com/design/qTdQm42Gcuc8QkYXhz8dLK/Frontend-Project?node-id=2-2&t=liKnoWEs2ok8ZnnT-1)
- **Report & Demo**: [Google Drive](https://drive.google.com/drive/folders/1mWetv3An4f4BFyXkSo1c1nGljS2amD7B)

## Architecture Pattern

The application follows the **MVC (Model-View-Controller)** pattern:
- **Models**: Handle database operations and data logic
- **Views**: EJS templates for rendering HTML
- **Controllers**: Process requests and coordinate between models and views
- **Routes**: Define API endpoints and route handlers

## Security Features

- Password hashing with bcryptjs
- Session-based authentication
- HTTP-only cookies
- Environment variable configuration for sensitive data
- MySQL session store for secure session management

## Future Enhancements

Potential areas for expansion:
- Payment gateway integration
- Email notifications
- Product reviews and ratings
- Wishlist functionality
- Advanced search and filtering
- Admin analytics dashboard
- Multi-language support

---

*This is an academic project developed for educational purposes.*
