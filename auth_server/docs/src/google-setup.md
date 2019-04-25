---
name: Google Project Setup
route: /googlesetup
---

# Google Project Setup

How to set up Google Authentication

1. Visit the [Google Developers' Console](https://console.developers.google.com/) and create a new project
2. Select the project and navigate to credentials. Set up the OAuth consent tab:
3. Make sure you give your project a name and a support email. Check that its scope includes access to emails.
   <img src={require('./Scope.png')} width="500"/>
4. Under authorized domains, add the URL of your application. If your link changes (i.e. if you deploy with now),
   you will have to add the new URL each time.
5. Under the credentials tab, create a new client ID:
6. Add the respective paths of your application into the authorized URIs (this should match the URLs that you
   specified in the authorized domains)
7. Copy the clientID into the config file. This will be used with the frontend Google button to log in and should
   end with apps.googleusercontent.com.
