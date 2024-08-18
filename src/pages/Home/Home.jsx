import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const categories = ['Laptop Accessories', 'Mobile', 'Mobile Accessories', 'Laptop'];
const brands = ['Acer', 'Samsung', 'Asus', 'Apple','Dell','Huawei','Anker'];

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        brand: '',
        minPrice: '',
        maxPrice: ''
    });
    const [sort, setSort] = useState('price');
    const [order, setOrder] = useState('asc');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const itemsPerPage = 9;

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://best-buy-seven.vercel.app/information', {
                    params: {
                        ...filters,
                        sort,
                        order,
                        page,
                        limit: itemsPerPage
                    }
                });
                setProducts(response.data.data);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [filters, sort, order, page]);

    const handleSearch = () => {
        setPage(1);
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://best-buy-seven.vercel.app/information', {
                    params: {
                        ...filters,
                        sort,
                        order,
                        page: 1,
                        limit: itemsPerPage
                    }
                });
                setProducts(response.data.data);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSortChange = (e) => {
        const [sortBy, orderBy] = e.target.value.split('-');
        setSort(sortBy);
        setOrder(orderBy);
        setPage(1);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <HelmetProvider>
            <div className="min-h-screen flex font-custom">
                {/* Sidebar for Larger Devices */}
                <aside className="bg-primary text-white p-6 w-1/5 hidden md:block">
                    <Helmet>
                        <title>Home || ShopSpot</title>
                    </Helmet>
                    {/* Search Input */}
                    <div className="flex items-center bg-white p-3 rounded-md mb-6">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={filters.search}
                            name="search"
                            onChange={handleFilterChange}
                            className="flex-1 bg-transparent border-0 outline-none text-black"
                        />
                        <button onClick={handleSearch} className="text-primary">
                            <FaSearch />
                        </button>
                    </div>

                    <h2 className="text-xl font-bold mb-6">Filters</h2>
                    <select
                        name="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                        className="w-full mb-4 p-3 rounded-md bg-white text-black"
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <select
                        name="brand"
                        value={filters.brand}
                        onChange={handleFilterChange}
                        className="w-full mb-4 p-3 rounded-md bg-white text-black"
                    >
                        <option value="">All Brands</option>
                        {brands.map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        name="minPrice"
                        placeholder="Min Price"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        className="w-full mb-4 p-3 rounded-md bg-white text-black"
                    />
                    <input
                        type="number"
                        name="maxPrice"
                        placeholder="Max Price"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        className="w-full mb-4 p-3 rounded-md bg-white text-black"
                    />
                    <select
                        onChange={handleSortChange}
                        className="w-full p-3 rounded-md bg-white text-black"
                    >
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="date-desc">Newest First</option>
                    </select>
                    <button onClick={handleSearch} className="w-full mt-6 p-3 rounded-md bg-secondary text-white font-bold">Search</button>
                </aside>

                {/* Main Content */}
                <main className="p-6 bg-gradient flex-1">
                    {/* Search Input for All Devices */}
                    <div className="md:hidden mb-6 flex items-center bg-white p-3 rounded-md w-full">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={filters.search}
                            name="search"
                            onChange={handleFilterChange}
                            className="flex-1 bg-transparent border-0 outline-none text-black"
                        />
                        <button onClick={handleSearch} className="text-primary">
                            <FaSearch />
                        </button>
                    </div>

                    {/* Filter Drawer Button for Small Devices */}
                    <button
                        onClick={toggleDrawer}
                        className="md:hidden flex items-center mb-6 bg-primary text-white p-3 rounded-md"
                    >
                        <FaFilter className="mr-2" />
                        Filters
                    </button>

                    {/* Filter Drawer */}
                    <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <div className={`fixed right-0 top-0 bg-primary text-white w-64 p-6 h-full transform transition-transform ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                            <button
                                onClick={toggleDrawer}
                                className="text-white mb-6"
                            >
                                <FaFilter className="text-2xl" />
                            </button>
                            <h2 className="text-xl font-bold mb-6">Filters</h2>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={filters.search}
                                name="search"
                                onChange={handleFilterChange}
                                className="w-full mb-4 p-3 rounded-md bg-white text-black"
                            />
                            <select
                                name="category"
                                value={filters.category}
                                onChange={handleFilterChange}
                                className="w-full mb-4 p-3 rounded-md bg-white text-black"
                            >
                                <option value="">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <select
                                name="brand"
                                value={filters.brand}
                                onChange={handleFilterChange}
                                className="w-full mb-4 p-3 rounded-md bg-white text-black"
                            >
                                <option value="">All Brands</option>
                                {brands.map(brand => (
                                    <option key={brand} value={brand}>{brand}</option>
                                ))}
                            </select>
                            <input
                                type="number"
                                name="minPrice"
                                placeholder="Min Price"
                                value={filters.minPrice}
                                onChange={handleFilterChange}
                                className="w-full mb-4 p-3 rounded-md bg-white text-black"
                            />
                            <input
                                type="number"
                                name="maxPrice"
                                placeholder="Max Price"
                                value={filters.maxPrice}
                                onChange={handleFilterChange}
                                className="w-full mb-4 p-3 rounded-md bg-white text-black"
                            />
                            <select
                                onChange={handleSortChange}
                                className="w-full p-3 rounded-md bg-white text-black"
                            >
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="date-desc">Newest First</option>
                            </select>
                            <button onClick={handleSearch} className="w-full mt-6 p-3 rounded-md bg-secondary text-white font-bold">Search</button>
                        </div>
                    </div>

                    {/* Products List */}
                    {loading ? (
                        <div className="flex justify-center mt-40   items-center">
                            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-primary" role="status">
                                <span className="visually-hidden">
                                <span className="loading loading-spinner text-warning"></span></span>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map(product => (
                                <div key={product._id} className="bg-white p-4 border border-gray-300 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-40 object-cover mb-4 rounded-md"
                                    />
                                    <h3 className="text-lg font-bold text-secondary mb-2">{product.name}</h3>
                                    <p className="text-gray-700 mb-2">{product.description}</p>
                                    <p className="text-primary font-bold mb-2">${product.price}</p>
                                    <p className="text-gray-600 mb-2">Brand: {product.brand}</p>
                                    <p className="text-gray-600 mb-2">Category: {product.category}</p>
                                    <p className="text-gray-600 mb-2">Ratings: {product.ratings}</p>
                                    <p className="text-gray-500">Created At: {new Date(product.createdAt).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {!loading && (
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 1}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md mr-2"
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2 text-gray-700">{`Page ${page} of ${totalPages}`}</span>
                            <button
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page === totalPages}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md ml-2"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </HelmetProvider>
    );
};

export default Products;
