# softuni-react-project
This is a single-page application made for SoftUni's React JS Course, part of the JS Web module.
You can see a live version of the site [here](https://softuni-react-spa-project.web.app/).

![home-page](https://github.com/user-attachments/assets/06a59f6a-ff86-4bd1-b2ed-0e3daf88da94)
![recent-recipes](https://github.com/user-attachments/assets/69d301f0-ed87-4e97-bd9a-9dbbfe45d7e6)

### About the project
The project is a simple site for sharing cooking recipes. It is built with React, and uses TailwindCSS for styling components. It uses Firebase's Authentication, Firestore Database and Hosting services.

*Note*: since this project is purely for educational purposes, Firebase services like email verification, password changing etc. are disabled. When registering, any made-up email address will work, as long as it is in a valid email format.


For testing purposes, three dummy users have been created:
 - dumbledore@hogwarts.edu / password: sherbetlemon
 - kvothe@waystone.inn / password: caesura
 - khriss@silverlight.edu / password: cosmere

Guests can browse the recipes, view the details page for each recipe, and access the log in and register pages. 

Once registered or logged in, users gain the ability to post recipes, edit/delete the recipes they have posted, and like the recipes posted by other users.

### Running locally
If you want to run the app locally, clone the repo, navigate to the *vite-react-project* folder and run **npm install** to get the dependencies, then **npm run dev** to start the Vite development server.
