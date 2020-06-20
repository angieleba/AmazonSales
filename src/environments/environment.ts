// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlAPI : "http://localhost:3000"
};

// const msalConfig = {
//   auth: {
//     clientId: "b45c5952-b0ce-475e-b2d3-528cc8cb0be3",
//     authority: "https://login.microsoftonline.com/common",
//     redirectUri: "http://localhost:8100/home",
//   },
//   cache: {
//     cacheLocation: "sessionStorage", // This configures where your cache will be stored
//     storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
//   }
// };  
  
// // Add here scopes for id token to be used at MS Identity Platform endpoints.
// const loginRequest = {
//   scopes: ["openid", "profile", "User.Read"]
// };

// // Add here scopes for access token to be used at MS Graph API endpoints.
// const tokenRequest = {
//   scopes: ["Mail.Read"]
// };


export const B2CConfig = {
  B2CTodoAccessTokenKey : "b2c.access.token",
  tenantConfig : {
      tenant: "amazonsalestest.onmicrosoft.com",
      // Replace this with your client id 
      clientID: 'b45c5952-b0ce-475e-b2d3-528cc8cb0be3',
      signInPolicy: "B2C_1_SignUpIn",
      signUpPolicy: "B2C_1_SignUpIn",
      redirectUri:"http://localhost:8100/home",
      b2cScopes:["https://amazonsalestest.onmicrosoft.com/login"]
  }
};

export const B2CAuthority = `https://amazonsalestest.b2clogin.com/${B2CConfig.tenantConfig.tenant}/${B2CConfig.tenantConfig.signInPolicy}/`;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
