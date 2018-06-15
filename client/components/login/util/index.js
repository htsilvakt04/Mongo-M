export const constructScript = () => {
    const facebookSDK = document.createElement("script");
    facebookSDK.src = "https://connect.facebook.net/en_US/sdk.js";
    facebookSDK.crossorigin  = 'anonymous';
    facebookSDK.async = true;
    facebookSDK.id = "facebookSDK";

    facebookSDK.onload =  function() {
        const facebookSDKINIT = document.createElement("script");
        // todo: move app id to config ---> App variable above already inported
        facebookSDKINIT.text = "FB.init({appId: '1877035595944613', cookie: true, status: true, xfbml: true, state: 'silva', version : 'v2.9'})";
        document.body.appendChild(facebookSDKINIT);
    }
    return facebookSDK;
}