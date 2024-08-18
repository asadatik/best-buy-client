
#ShopSort

Search Craft is a frontend web application developed with React.js that provides users with the ability to search, filter, sort, and paginate through a comprehensive list of technical products. The app seamlessly interacts with a backend API to fetch and display product data.

## Features

- **Search Products:** Easily search for products by name using a dynamic search bar.
- **Filter Products:** Refine your search with filters for category, brand, and price range.
- **Sort Products:** Organize products by price (ascending/descending) or by the newest arrivals.
- **Pagination:** Navigate through multiple pages of products smoothly.

## Project Setup

### Prerequisites

- Node.js (v14.x or higher)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/asadatik/best-buy-client
   cd best-buy-client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

   The application should now be running on [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create a `.env` file in the root directory with the following:

   ```
   REACT_APP_API_URL=http://localhost:9000
   ```

This variable points to your backend API, ensuring the frontend can make requests to it.

