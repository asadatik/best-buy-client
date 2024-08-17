import React from 'react';
import { useLoaderData } from 'react-router-dom';
import HomeCard from './HomeCard';
// import useAxiosPublic from '../../Hook/AxiosPublic/useAxiosPublic';
// import { useQuery } from "@tanstack/react-query";

const Home = () => {
    const data = useLoaderData()
    console.log(data)

       
       



    return (








        <div  className='mx-auto container  mt-20'  >   
            <h1>home graund</h1>
            <div  className="grid p-2 mt-10 lg:grid-cols-3 container mx-auto gap-10 "   >
               {data.map(singleData=> <HomeCard key={singleData._id}   card={singleData}   >      </HomeCard>              )         }
             </div>
             

        </div>
    );
};

export default Home;