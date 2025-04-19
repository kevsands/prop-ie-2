# Prop.ie Technical Documentation

## Architecture Overview

The Prop.ie platform is built using a modern web application architecture with the following components:

### Frontend
- **Framework**: Next.js with TypeScript
- **UI Library**: React with Tailwind CSS
- **State Management**: Context API and React Query
- **Form Handling**: Formik with Yup validation

### Backend
- **Framework**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication
- **API**: RESTful API endpoints

### Infrastructure
- **Containerization**: Docker with Docker Compose
- **CI/CD**: GitHub Actions
- **Deployment**: Automated deployment pipeline

## Component Structure

### Frontend Components

#### Layout Components
- `Header.tsx`: Main navigation header
- `Footer.tsx`: Site footer
- `Layout.tsx`: Page layout wrapper
- `AppWrapper.tsx`: Application wrapper with context providers

#### Authentication Components
- `LoginForm.tsx`: User login form
- `RegisterForm.tsx`: User registration form
- `ProtectedRoute.tsx`: Route protection for authenticated users

#### First-Time Buyer Components
- `HTBClaimForm.tsx`: Help-to-Buy claim code submission form
- `PropertyReservationForm.tsx`: Legal property reservation system
- `EnhancedTransaction.tsx`: Step-by-step transaction flow

#### Developer Dashboard Components
- `ContractorManagement.tsx`: Contractor appointment management
- `DevelopmentAppraisal.tsx`: Development project appraisal
- `ConstructionTracking.tsx`: Construction appointment tracking
- `SalesFunnelAnalytics.tsx`: Sales funnel visualization
- `InventoryManagement.tsx`: Property inventory management

#### Property Customization Components
- `Visualization3D.tsx`: 3D property visualization tool
- `FurnitureMarketplace.tsx`: Furniture and fittings marketplace
- `UpgradeManagement.tsx`: Property upgrade management system
- `SupplierIntegration.tsx`: Supplier directory and integration

### Backend Components

#### Models
- `User.ts`: User data model
- `Property.ts`: Property data model
- `Project.ts`: Development project model
- `Purchase.ts`: Property purchase transaction model
- `Document.ts`: Document upload and management model
- `Financial.ts`: Financial data model

#### Controllers
- `authController.ts`: Authentication logic
- `propertyController.ts`: Property management logic
- `purchaseController.ts`: Purchase transaction logic

#### Routes
- `authRoutes.ts`: Authentication endpoints
- `propertyRoutes.ts`: Property management endpoints
- `purchaseRoutes.ts`: Purchase transaction endpoints

#### Middleware
- `auth.ts`: Authentication middleware

## Database Schema

### Users Collection
```
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  role: String (enum: buyer, developer, admin, solicitor),
  isFirstTimeBuyer: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Properties Collection
```
{
  _id: ObjectId,
  name: String,
  location: String,
  price: Number,
  bedrooms: Number,
  bathrooms: Number,
  area: Number,
  status: String (enum: available, reserved, sold),
  type: String (enum: apartment, house, duplex),
  developmentId: ObjectId (ref: Project),
  createdAt: Date,
  updatedAt: Date
}
```

### Projects Collection
```
{
  _id: ObjectId,
  name: String,
  location: String,
  totalUnits: Number,
  startDate: Date,
  completionDate: Date,
  status: String (enum: planning, construction, selling, completed),
  createdAt: Date,
  updatedAt: Date
}
```

### Purchases Collection
```
{
  _id: ObjectId,
  propertyId: ObjectId (ref: Property),
  buyerId: ObjectId (ref: User),
  status: String (enum: reserved, contract, completed),
  reservationDate: Date,
  depositAmount: Number,
  htbClaimCode: String,
  customizations: Object,
  documents: Array,
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: User login
- `GET /api/auth/me`: Get current user

### Properties
- `GET /api/properties`: Get all properties
- `GET /api/properties/:id`: Get property by ID
- `POST /api/properties`: Create new property (admin/developer only)
- `PUT /api/properties/:id`: Update property (admin/developer only)
- `DELETE /api/properties/:id`: Delete property (admin/developer only)

### Purchases
- `POST /api/purchases/reserve`: Reserve a property
- `GET /api/purchases/user`: Get user's purchases
- `GET /api/purchases/:id`: Get purchase details
- `PUT /api/purchases/:id/htb`: Submit HTB claim code
- `PUT /api/purchases/:id/customizations`: Save property customizations
- `POST /api/purchases/:id/documents`: Upload documents

## Deployment

The application is containerized using Docker and can be deployed using the provided deployment script or through the CI/CD pipeline. See the deployment guide for detailed instructions.

## Testing

The application includes comprehensive testing at unit, integration, and end-to-end levels. See the testing plan for detailed information on test coverage and procedures.

## Security Considerations

- Authentication uses JWT with secure storage
- Password hashing with bcrypt
- HTTPS enforced in production
- Input validation on all forms
- MongoDB security best practices implemented
- Regular security audits recommended

## Performance Optimization

- Server-side rendering for initial page load
- Static generation for marketing pages
- Code splitting for optimized bundle sizes
- Image optimization
- Caching strategies implemented
- Database indexing for common queries
