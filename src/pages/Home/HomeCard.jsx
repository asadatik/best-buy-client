import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaStar } from "react-icons/fa";
AOS.init();

const HomeCard = ({ product }) => {

    const { name, image, description, price, category,  ratings, createdAt, _id } = product;
    return (

        <div data-aos="zoom-in-down "    >
            <div className=" h-96 lg:h-72 p-4  mt-8 bg-gradient-to-r from-sky-700 to-indigo-500 rounded-lg shadow-xl">
                <div className="flex justify-center -mt-16 md:justify-end">
                    <img className="object-cover w-40 h-40 border-2 border-blue-500 rounded-full dark:border-blue-400" alt="Testimonial avatar" src={image} />
                </div>

                <div className="flex justify-evenly mt-2 "  >
                    <h2 className="mt-2 text-2xl  font-cinzel text-gray-800 dark:text-white md:mt-0">{name}  </h2>
                    <p  className="text-lg gap-2" >  <FaStar  className="text-pink-500"/> <span className="text-yellow-50"  > {ratings} </span> </p>
                </div>          <div className="text-center" >
                    <p className=" mt-1 text-black md:mt-0"> Category : <span className=" text-white  " >{category}</span> </p>
                    <p className=" mt-1  text-black md:mt-0">  Launch Date  : <span className=" text-white " >{new Date(createdAt).toLocaleDateString()}</span>                                  </p>
                    <p className=" mt-1 text-black md:mt-0">price  :<span className=" text-white  " > $ {price}</span>                                  </p>
                   
                </div>
                {/* <div className="mt-2 flex justify-end  "   > <Link to={`/post/${_id}`} > <button className="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... text-white text-lg  " > View Details </button>  </Link> </div> */}

            </div>
        </div>
    );
};

export default HomeCard;