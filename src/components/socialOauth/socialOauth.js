import React from 'react'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'



const SocialOauth = () => {
    const responseGoogle = (res) => {
        console.log(res)
    }
    const responseFacebook = (response) => {
        console.log(response);
    }
    return (
        <div>
            <GoogleLogin
                clientId="378355966103-3dmnr1k78h0sgm22jtud44dch1uan6id.apps.googleusercontent.com"
                render={renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled}>Login with Google</button>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            <FacebookLogin
                appId="1088597931155576"
                autoLoad
                callback={responseFacebook}
                render={renderProps => (
                    <button onClick={renderProps.onClick}>Login with Facebook</button>
                )}
            />
        </div>
    )
}

export default SocialOauth