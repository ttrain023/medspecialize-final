NOTE: I just used these dependencies from a tutorial made by Traversy Media from youtube. (link: https://youtube.com/playlist?list=PLillGF-RfqbZMNtaOXJQiDebNXjVapWPZ)
Most of the way I setup my project was through following his tutorial. The dependencies he mentioned were outdated already so I just googled the latest versions of each dependencies.

The first thing I did was setup my MongoDB account and downloaded the necessary installer from mongodb.com
From there I just signed up for a free account and made 1 cluster(AWS).

Then I made my root folder in my documents and typed in the console under the root folder directory "npm init".
From there, changed the "main" entry point into "app.js" and added "start": "node app" under the "scripts" in the package.json file.

Proceeded to install these dependencies:
>express
>mongoose
>bcryptjs
>cors
>jsonwebtoken
>body-parser
>passport
>passport-jwt

Then went to console from the root folder and typed "npm install".
Afterwhich I just made the app.js file in the root folder and added in all the modules.
Assigned my port to port 3000
Also installed nodemon for convenience.

Forgive me if this isnt too much of an instruction. I just followed almost everything in the youtube link I gave above to setup everything
