import SignUp from "../components/signup/signup";
import LoginUseform from "../components/login/loginUseform";
import ForgotPass from "../components/passwordReset/forgotPass";
import ResetPass from "../components/passwordReset/resetPass";
import Home from "../components/home/home";
import ViewCart from "../components/cart/view";
import ViewWishlist from "../components/wishlist/view";
import ViewOne from "../components/food/viewOne";

export const NonPrivateRoutes = [
  { path: "/signup", component: SignUp },
  { path: "/", component: LoginUseform },
  { path: "/forgotPassword", component: ForgotPass },
  { path: "/resetpassword", component: ResetPass },
];

export const Privateroutes = [
  { path: "/", component: Home },
  { path: "/cart", component: ViewCart },
  { path: "/wishlist", component: ViewWishlist },
  { path: "/food/:id", component: ViewOne },
];
