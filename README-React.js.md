# ReactJs Web Version of SongBot

This project contains the UI for the songBot made in [ReactJs](https://reactjs.org/) and [material-ui](https://github.com/mui-org/material-ui).React is a javascript library for building user interfaces and material-ui uses react components to implement Google's Material Design.

## Local Deployment

1. Download or clone the repo
2. ```cd microservices/ui/app```
3. Run ```npm install```
4. Run ```npm start``` 

## Hasura deployment

1. Create a reactjs template and add that as your microservice
2. Replace the directories in your ```microservices/your_microservice_name``` with the contents of ```microservices/ui/app```
3. ```git add .``` &  ```git commit ```
4. ```git push hasura master ```
