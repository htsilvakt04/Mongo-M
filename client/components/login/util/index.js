export const constructScript = (facebookSDK) => {
    facebookSDK.src = "https://connect.facebook.net/en_US/sdk.js";
    facebookSDK.crossorigin  = true;
    facebookSDK.async = true;
    facebookSDK.id = "facebookSDK";
}