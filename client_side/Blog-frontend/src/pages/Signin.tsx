import Auth from "../components/Auth";
import Quote from "../components/Quote";

const Signin = () => {
    return (
        <div className="grid lg:grid-cols-2 ">
        <div className="">

         <Auth/>
        </div>
        <div className="md:visible invisible">
            <Quote/>
        </div>
        </div>
    )
}

export default Signin;