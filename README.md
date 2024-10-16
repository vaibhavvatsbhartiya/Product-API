# Product API

A simple Node.js and MongoDB-based API for managing product data, including searching, filtering, sorting, field selection, and pagination.

## Features

- **Filter by Company**: Filter products by their associated company.
- **Search by Product Name**: Search products using a partial name match (case-insensitive).
- **Sort Results**: Sort products based on fields such as `price`, `name`, etc.
- **Field Selection**: Choose specific fields to include in the response (e.g., `name`, `price`, `ratings`).
- **Pagination**: Paginate results to retrieve a limited number of products per page.

## Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ORM
- **Package Manager**: npm
- **API Testing Tool**: Postman or any REST client

## Setup and Installation

### Prerequisites

- Node.js installed on your machine.
- MongoDB installed or using MongoDB Atlas for cloud hosting.
- Postman (optional, for testing the API).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/vaibhavvatsbhartiya/product-api.git
   cd product-api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=your_mongo_db_connection_string
   PORT=8080
   ```

4. **Run the application**:
   ```bash
   npm start
   ```

5. **Test the API**:
   You can test the API endpoints using Postman or a browser.

## API Endpoints

### GET /api/products

Retrieve all products or filter, sort, select fields, and paginate the results.

#### Query Parameters

- `company`: Filter products by company name (e.g., `apple`, `dell`, `samsung`).
- `name`: Search for products by name (case-insensitive, partial matches allowed).
- `sort`: Sort the results by field(s). Use comma-separated values to sort by multiple fields. (e.g., `price,name`).
- `fields`: Select specific fields to include in the response (e.g., `name,price`).
- `page`: Page number for pagination (default is `1`).
- `limit`: Number of products per page (default is `10`).

#### Example Request

```
GET http://localhost:8080/api/products?company=apple&name=iPhone&sort=price&fields=name,price&limit=5&page=2
```

#### Example Response

```json
{
  "myProductData": [
    {
      "name": "iPhone 12",
      "price": 999
    },
    {
      "name": "iPhone 13",
      "price": 1099
    }
  ],
  "nbHits": 2
}
```

### Example Use Cases

1. **Search by Company**: 
   ```http
   GET /api/products?company=apple
   ```

2. **Search by Name**:
   ```http
   GET /api/products?name=iphone
   ```

3. **Sort Products**:
   ```http
   GET /api/products?sort=price
   ```

4. **Field Selection**:
   ```http
   GET /api/products?fields=name,price
   ```

5. **Pagination**:
   ```http
   GET /api/products?page=2&limit=5
   ```

## Product Schema

The products are stored in a MongoDB database and follow this schema:

```js
const productSchema = new mongoose.Schema({ 
  name: {
    type: String,
    required: [true, "you need to enter the name of product"],
  },
  price: {
    type: Number,
    required: [true, "you need to enter the amount of product"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  ratings: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  company: {
    type: String,
    enum: {
      values: ['apple', 'samsung', 'dell', 'mi', 'hp'],
      message: `{VALUE} is not supported by this api.`,
    }
  }
});
```

## Future Enhancements

- **Product Reviews**: Add a review system for products.
- **Advanced Filters**: Implement advanced filtering options like company, name etc.
