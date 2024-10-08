import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <section className="bg-gray-900 ">
        <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
            <div className="wf-ull lg:w-1/2">
                <p className="text-4xl font-bold font-nothing text-red-500">404 error</p>
                <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">Page not found</h1>
                <p className="mt-4 text-gray-500 dark:text-gray-400">Sorry, the page you are looking for doesn`t exist.Here are some helpful links:</p>
    
                <div className="flex items-center mt-6 gap-x-3">
    
                    <button className="w-1/2 px-5 py-2 text-xl font-semibold rounded-full tracking-wide text-white bg-green-700 hover:bg-purple-400  ">
                       <Link to='/' > Take me home</Link>
                    </button>
                </div>
            </div>
    
            <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
                <img className="w-full max-w-lg lg:mx-auto" src='https://i.ibb.co/M7nCRrB/404-error-web-template-with-funny-monster-23-2147788951-1.jpg' alt=""/>
            </div>
        </div>
    </section>
    );
};

export default ErrorPage;