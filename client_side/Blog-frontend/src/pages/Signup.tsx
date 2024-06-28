import Auth from "../components/Auth";
import Quote from "../components/Quote";


const Signup = () => {
    return (
     
      <div className="grid lg:grid-cols-2 justify-center ">
        <div className="bg-zinc-100">
         <Auth/>
        </div>

        <div className="lg:block hidden">
         <Quote/>

        </div>

      </div>
    
    )
} 

export default Signup;