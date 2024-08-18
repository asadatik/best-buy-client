
import {  Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Swal from 'sweetalert2';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiosPublic from '../../Hook/AxiosPublic/useAxiosPublic';
import { Helmet } from 'react-helmet-async';



const Login = () => {
    const{ login,googleLogin } = useContext(AuthContext);
    const location = useLocation();
         const Navigate =  useNavigate();
   const AxiosPublic =  useAxiosPublic()
   const from = location.state?.from?.pathname || "/";


 // Email+Pass
    const handleSignIn=(e)=>{
      e.preventDefault()
      const Form = new FormData(e.currentTarget);
      const email = Form.get('email')  ;
      const password = Form.get('password')  ; 
      console.log(email,password) 
      login(email,password)
      .then( Result=>{
            console.log(Result.user) 
            Swal.fire({
              position: "center",
              icon: "success",
              title: "User Login Successfully",
              showConfirmButton: false,
              timer: 2500
            });
            Navigate(from, { replace: true });

      
    }     )
    .catch(error=>{
     console.error(error.message)  
      Swal.fire({
      icon: "error",
      title: "Oops...",
       text: "Something Wrong .Please try again!",
  
});          
    })

     


    }  
    
    // goggle
    const LoginWithGoogle=()=>{        
        googleLogin()
        .then(result =>  {
          console.log(result.user)
      // Extra Work (   user Info    ) 
          const userInfo = {
           name: result.user?.displayName,
           email: result.user?.email,
           role: 'user'
          } 
           AxiosPublic.post('/users', userInfo)
           .then(res =>{
            Swal.fire({
              position: "center",
              icon: "success",
              title: "User Login Successfully",
              showConfirmButton: false,
              timer: 2500
            });
               console.log(res.data);
               Navigate(from, { replace: true });
           })
      
       } )
         
   


        }
 
      
          
    return (
    
        <div className="flex items-center  lg:min-h-screen  rounded-b-3xl  "  > 
                  <Helmet><title>login page</title></Helmet>
            <div className="lg:flex justify-center gap-10   ">
                      <div className='lg:w-2/5'>
                    <img src={`https://i.ibb.co/YpgX7Xt/log-concept-landing-page-52683-22136-1.jpg`} alt="" />
                     </div>
                 <div>
                 <div className=' px-6 py-4 lg:w-[550px] h-full  bg-slate-100  md:px-8'>
                  
          <p className='mt-3  border-b-4  border-cyan-700  lg:tracking-[.25em] text-black  text-3xl font-bold uppercase text-center  '>
             Login  Here!
          </p>

        
          <span className='w-1/5 border-b  md:w-1/4'></span>


          <form onSubmit={handleSignIn}>
            <div className='mt-4'>
              <label
                className='block mb-2 text-xl font-medium text-gray-600 '
                htmlFor='LoggingEmailAddress'
              >
                Email Address
              </label>
              <input
                id='LoggingEmailAddress'
                autoComplete='email'
                placeholder='enter your email'
                name='email'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                type='email'
              />
            </div>

            <div className='mt-4'>
              <div className='flex justify-between'>
                <label
                  className='block mb-2 text-xl font-medium text-gray-600 '
                  htmlFor='loggingPassword'
                >
                  Password
                </label>
              </div>

              <input
                id='loggingPassword'
                autoComplete='current-password'
                placeholder='password'
                name='password'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                type='password'
              />
            </div>
            <div className='mt-6'>
              <button
                type='submit'
                className='w-full px-6 py-3 text-xl font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
              >
                Sign In
              </button>
            </div>
          </form>
          <p className="mt-6 text-xl text-center text-gray-600">Don`t have an account yet?<Link to='/joinUs' > <a  className="text-blue-500  focus:outline-none focus:underline hover:underline">Sign up</a></Link>.</p>
          <div className='mt-4 flex justify-center'   >
 <button onClick={LoginWithGoogle}    className="btn lg:text-xl  btn-outline  btn-secondary  " > <FcGoogle />  Continue with  Google </button> 

 </div>
                     </div>


                 </div>           
            </div>
           
        </div>
      
    );
};

export default Login;

