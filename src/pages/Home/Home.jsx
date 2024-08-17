

import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import HomeCard from './HomeCard';
import useAxiosPublic from '../../Hook/AxiosPublic/useAxiosPublic';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(useLoaderData());
    const axiosPublic = useAxiosPublic(); // Your custom axios hook

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle search operation
    const handleSearch = async () => {
        if (!searchTerm) {
            setFilteredData(useLoaderData()); // Reset to initial data if search term is empty
            return;
        }

        try {
            const response = await axiosPublic.get(`/search?q=${searchTerm}`);
            setFilteredData(response.data); // Update filtered data with search results
        } catch (error) {
            console.error('Error searching for products', error);
        }
    };

    return (
        <div className='mx-auto container mt-20'>
            <h1>Home Ground</h1>

            {/* Search bar */}
            <div className="my-5">
                <input
                    type="text"
                    placeholder="Search for products"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="p-2 border border-gray-300 rounded"
                />
                <button
                    onClick={handleSearch}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Search
                </button>
            </div>

            {/* Display cards */}
            <div className="grid p-2 mt-10 lg:grid-cols-3 container mx-auto gap-10">
                {filteredData.map(singleData => (
                    <HomeCard key={singleData._id} card={singleData} />
                ))}
            </div>
        </div>
    );
};

export default Home;
