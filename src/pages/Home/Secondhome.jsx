import {  useEffect, useState } from "react";

import { MdFilterAlt } from "react-icons/md";
import HomeCard from "./HomeCard";


const Secondhome = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState([]);
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState([]);
  const [priceSelected, setPriceSelected] = useState([]);
  const [category, setCategory] = useState([]);
  const [products, setproducts] = useState([]);
  const [sortPrice, setSortPrice] = useState([]);
  const [dateSort, setDateSort] = useState(false);
  const [totalClass, setTotalClass] = useState(0);

  const pages = [...Array(Math.ceil(parseInt(totalClass) / 6)).keys()];
 console.log(products)
  const testData = {
    search,
    brand,
    category,
    priceSelected,
    sortPrice,
    dateSort,
    pages,
  };

  
  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    setSearch(search);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/products?page=${currentPage - 1}&search=${search}&testData=${JSON.stringify(testData)}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setproducts(data?.result);
        setTotalClass(data?.totalClasses);
      });
  }, [
    search, brand,category,priceSelected,sortPrice,dateSort,currentPage,
  ]);
    
  // Getting Brands Name

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/filter`)
      .then((res) => res.json())
      .then((data) => {
        setBrands(data);
      });
  }, []);

  // Getting Categories Name

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/filter2`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  // Getting Price Data

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/filter3`)
      .then((res) => res.json())
      .then((data) => {
        setPrice(data);
      });
  }, []);

 
  return (
    <div className="mb-40">
      <div className="z-100  container sticky top-0 mx-auto mb-10">
     

        
        <div className="container mx-auto mt-6 flex items-center justify-center gap-1">
          {/* Search  */}

          <form
            onSubmit={handleSearch}
            className="my-3  flex  items-center justify-center"
          >
            <label className="input input-bordered flex w-full items-center gap-2">
              <input
                type="search"
                name="search"
                className="w-full grow"
                placeholder="Search product name"
              />
              <button
                type="submit"
                className="rounded-full text-black bg-cyan-400 px-3 py-2"
              >
                Search
              </button>
            </label>
          </form>
          {/* Filter Button */}
          <div className="z-50  w-10  ">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label
                htmlFor="my-drawer-4"
                className="btn drawer-button whitespace-nowrap rounded-full bg-lime-300 px-1 text-sm font-medium tracking-wide text-black transition duration-300 hover:bg-blue-600 focus:bg-blue-700 md:px-5"
              >
                <span className="flex items-center justify-center gap-1">
                  Filter <MdFilterAlt />
                </span>
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu min-h-full w-60 bg-base-200 p-4 text-base-content md:w-80">
                {/* Brands Name */}
                <div className="mb-5">
                  <p className="mb-3 border-b text-lg font-medium">Brand</p>
                  <div>
                    {brands &&
                      brands.map((singleBrand) => (
                        <div
                          key={singleBrand._id}
                          className="mb-1 flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            className="checkbox"
                            onChange={(e) =>
                              e.target.checked
                                ? setBrand([...brand, singleBrand?._id])
                                : setBrand(
                                    brand.filter((r) => r !== singleBrand?._id),
                                  )
                            }
                          />
                          <span>{singleBrand._id}</span>
                        </div>
                      ))}
                  </div>
                </div>
                {/* Category Name */}
                <div className="mb-5">
                  <p className="mb-3 border-b text-lg font-medium">Category</p>
                  <div>
                    {categories &&
                      categories.map((singleCategory) => (
                        <div
                          key={singleCategory._id}
                          className="mb-1 flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            className="checkbox"
                            onChange={(e) =>
                              e.target.checked
                                ? setCategory([
                                    ...category,
                                    singleCategory?._id,
                                  ])
                                : setCategory(
                                    category.filter(
                                      (r) => r !== singleCategory?._id,
                                    ),
                                  )
                            }
                          />
                          <span>{singleCategory._id}</span>
                        </div>
                      ))}
                  </div>
                </div>
                {/* Price Range */}
                <div className="mb-5">
                  <p className="mb-3 border-b text-lg font-medium">
                    Price Range
                  </p>
                  <div>
                    {price.map((singlePrice) => (
                      <div
                        key={singlePrice._id}
                        className="mb-1 flex items-center gap-2"
                      >
                        <input
                          type="radio"
                          name="radio-1"
                          className="radio"
                          onChange={(e) =>
                            e.target.checked
                              ? setPriceSelected(singlePrice._id.split("-"))
                              : setPriceSelected("")
                          }
                        />{" "}
                        <span>{singlePrice._id}</span>
                      </div>
                    ))}
                    <div className="mb-1 flex items-center gap-2">
                      <input
                        type="radio"
                        name="radio-1"
                        className="radio"
                        onChange={(e) =>
                          e.target.checked
                            ? setPriceSelected([])
                            : setPriceSelected([])
                        }
                      />{" "}
                      <span>None</span>
                    </div>
                  </div>
                </div>
                {/* Price Sort */}
                <div className="mb-5">
                  <p className="mb-3 border-b text-lg font-medium">
                    Price Sorting
                  </p>
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <input
                        type="radio"
                        className="radio"
                        name="radio-1"
                        onChange={(e) =>
                          e.target.checked
                            ? setSortPrice("low")
                            : setSortPrice("")
                        }
                      />{" "}
                      <span>{"Low to High"}</span>
                    </div>
                    <div className="mb-1 flex items-center gap-2">
                      <input
                        type="radio"
                        className="radio"
                        name="radio-1"
                        onChange={(e) =>
                          e.target.checked
                            ? setSortPrice("high")
                            : setSortPrice("")
                        }
                      />{" "}
                      <span>{"High to Low"}</span>
                    </div>
                    <div className="mb-1 flex items-center gap-2">
                      <input
                        type="radio"
                        className="radio"
                        name="radio-1"
                        onChange={(e) =>
                          e.target.checked ? setSortPrice("") : setSortPrice("")
                        }
                      />{" "}
                      <span>{"None"}</span>
                    </div>
                  </div>
                </div>
                {/* Date Sort */}
                <div className="mb-5">
                  <p className="mb-3 border-b text-lg font-medium">
                    Date Sorting
                  </p>
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="checkbox"
                        onChange={(e) =>
                          e.target.checked
                            ? setDateSort(true)
                            : setDateSort(false)
                        }
                      />{" "}
                      <span>{"Newest first"}</span>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Products Section */}
      <div className="container mx-auto">
        {/* Card */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {products.length > 0 ? (
            products.map((gadget) => (
              <HomeCard key={gadget._id} product={gadget}></HomeCard>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-4">
              <h3 className="flex h-[50vh] items-center justify-center text-center text-3xl font-semibold">
                Nothing Found!
              </h3>
            </div>
          )}
        </div>
        {/* pagination */}
        <div className="mt-8 flex justify-center">
          <ul className="flex space-x-2">
            <li>
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className={`${
                  currentPage === 1
                    ? "cursor-not-allowed bg-gray-300 text-gray-700"
                    : "bg-gray-300 text-gray-700 hover:bg-opacity-80"
                } rounded-l-lg px-4 py-2 focus:outline-none`}
                disabled={currentPage === 1}
              >
                Prev
              </button>
            </li>
            {pages.map((page) => (
              <li key={page}>
                <button
                  onClick={() => setCurrentPage(page + 1)}
                  className={`${
                    currentPage === page + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-opacity-80"
                  } px-4 py-2 focus:outline-none`}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className={`${
                  currentPage === pages.length
                    ? "cursor-not-allowed bg-gray-300 text-gray-700"
                    : "bg-gray-300 text-gray-700 hover:bg-opacity-80"
                } rounded-r-lg px-4 py-2 focus:outline-none`}
                disabled={currentPage === pages.length}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
   
  );
};

export default Secondhome;
