
export const FacebookSDK = "https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v3.1&appId=2205143559520263&autoLogAppEvents=1";

export const getFbAvatar = (id) => {
    return `https://graph.facebook.com/v3.1/${id}/picture`
};