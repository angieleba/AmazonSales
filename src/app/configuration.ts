import { Configuration } from 'msal';
import { MsalAngularConfiguration } from '@azure/msal-angular';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

export const apiConfig = {
  b2cScopes: [
    "https://amazonsalestest.onmicrosoft.com/api/Files.read",
    "https://amazonsalestest.onmicrosoft.com/api/Files.write",
  ],
  productListApi: "https://localhost:44380/api/product",
};

export const b2cPolicies = {
  names: {
    signUpSignIn: "B2C_1_SignIn",
    forgotPassword: "B2C_1_ForgotPassw",
  },
  authorities: {
    signUpSignIn: {
      authority:
        "https://amazonsalestest.b2clogin.com/amazonsalestest.onmicrosoft.com/B2C_1_SignIn",
    },
    forgotPassword: {
      authority:
        "https://amazonsalestest.b2clogin.com/amazonsalestest.onmicrosoft.com/B2C_1_ForgotPassw",
    },
  },
};

export const msalConfig : Configuration = {
  auth: {
    clientId: "d3f9fbb2-45ee-47cd-a0b9-b4f71d577985",
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    validateAuthority: false,
    redirectUri: "https://localhost:8101/home",
    postLogoutRedirectUri: "https://localhost:8101/home",
    //navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: "localStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" to save cache in cookies to address trusted zones limitations in IE (see: https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/Known-issues-on-IE-and-Edge-Browser)
  },
};

/**
 * Scopes you enter here will be consented once you authenticate. For a full list of available authentication parameters,
 * visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_authenticationparameters_.html
 */
export const loginRequest : MsalAngularConfiguration = {
    consentScopes: ["openid", "profile"],
    popUp: !isIE
};

// Add here scopes for access token to be used at the API endpoints.
export const tokenRequest = {
  scopes: apiConfig.b2cScopes, // e.g. ["https://fabrikamb2c.onmicrosoft.com/helloapi/demo.read"]
};
