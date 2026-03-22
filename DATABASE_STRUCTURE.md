# Database Structure & Connection Details

This document outlines the database structure, logic, and connection configuration used for the **Accsysindia** application.

## Database Platform

- **Database**: MongoDB
- **ODM (Object Data Modeling)**: Mongoose

## Connection Logic

The connection file is located at `src/lib/mongodb.ts`. The application uses a global cached connection mechanism to ensure performance across hot reloads and serverless environments.

**Connection URI**: 
It relies on the environment variable `MONGODB_URI`. If not provided, it falls back to: 
`mongodb://localhost:27017/accsysindia`

```typescript
// src/lib/mongodb.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/accsysindia";
```

## Schema Definitions

The structure relies on three core entities defined as Mongoose models.

### 1. User Model (`src/models/User.ts`)
Handles user accounts, membership details, wallet balance, and referral references.

| Field Name | Type | Options / Default | Description |
|---|---|---|---|
| `name` | `String` | `required: true` | The display name of the user |
| `email` | `String` | `required: true, unique: true` | Email address used for login |
| `password` | `String` | - | Hashed password |
| `role` | `String` | `enum: ["user", "admin"], default: "user"` | User role for permission checks |
| `referrer` | `ObjectId` | `ref: "User", default: null` | The user who referred this account |
| `referredUsers` | `[ObjectId]` | `ref: "User"` | Array of users referred by this account |
| `walletBalance` | `Number` | `default: 0` | Digital currency wallet balance |
| `activePlan` | `ObjectId` | `ref: "Plan", default: null` | The current membership plan active |
| `timestamps` | `Date` | Managed by Mongoose | `createdAt` and `updatedAt` |

### 2. Plan Model (`src/models/Plan.ts`)
Handles the membership subscription plans available in the system.

| Field Name | Type | Options / Default | Description |
|---|---|---|---|
| `name` | `String` | `required: true` | Membership plan title |
| `price` | `Number` | `required: true` | Cost of membership plan |
| `description` | `String` | `required: true` | Plan detailed breakdown |
| `benefits` | `[String]` | - | Array of text benefits |
| `pv` | `Number` | `required: true` | Point Value assigned on plan purchase |
| `image` | `String` | - | Plan visual graphic reference |
| `timestamps` | `Date` | Managed by Mongoose | `createdAt` and `updatedAt` |

### 3. Product Model (`src/models/Product.ts`)
Handles individual e-commerce items available on the platform.

| Field Name | Type | Options / Default | Description |
|---|---|---|---|
| `name` | `String` | `required: true` | Product title |
| `description` | `String` | `required: true` | Detailed item description |
| `price` | `Number` | `required: true` | Product cost in native currency |
| `category` | `String` | `required: true` | Product categorization group |
| `image` | `String` | `required: true` | Product main visual graphic |
| `stock` | `Number` | `default: 0` | Number of units currently available |
| `pv` | `Number` | `default: 0` | Point Value allocated per item purchase |
| `timestamps` | `Date` | Managed by Mongoose | `createdAt` and `updatedAt` |
