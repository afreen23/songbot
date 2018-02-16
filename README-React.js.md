# ReactJs --- Web Version of musicbot

This project contains the UI for the songBot made in [ReactJs](https://reactjs.org/) and [material-ui](https://github.com/mui-org/material-ui).React is a javascript library for building user interfaces and Material UI is a CSS Framework and a set of React Components that implement Google’s Material Design.

## Design and Edit

* The ui contains a single page for chat window 
  
  `microservices/ui/app/App.js` 
* All the messages are displayed inside chat window 
  
  `microservices/ui/app/components/chatbotmessage && microservices/ui/app/components/usermessage`
* [react-custom-scrollbars](https://github.com/malte-wessel/react-custom-scrollbars) are used for adding clean and elegant       scrollbars 
  
  `microservices/ui/app/components/coloredscrollbar.js`
* There are various components for playing audio , watching video , etc. 

  `microservices/ui/app/components`

## Local Deployment

1. Download or clone the repo
2. ```cd microservices/ui/app```
3. Run ```npm install```
4. Run ```npm start``` 

## Hasura deployment

### Prerequisites

- [Hasura CLI](https://docs.hasura.io/0.15/manual/install-hasura-cli.html)
- [Git](https://git-scm.com)


### Quickstart

```bash
# Quickstart from this boilerplate 
$ hasura quickstart intern/musicbot
```

The `quickstart` command does the following:

1. Creates a new directory `musicbot` in the current working directory
2. Creates a free Hasura cluster and sets it as the default for this project
3. Sets up `musicbot` as a git repository and adds `hasura` remote to push code
4. Adds your SSH public key to the cluster so that you can push to it

### Deploy

```bash
# Navigate to the project directory
$ cd musicbot

# Open App.js
$ cd microservices/ui/app/src/
$ gedit App.js

# Replace `dispirited72` with your cluster name at these two places

1. componentDidMount () {
    fetch('https://app.dispirited72.hasura-app.io/input', {
    method: 'POST',....}

2. handleSubmit (e) {
    ...............
    fetch('https://app.dispirited72.hasura-app.io/input', {
    method: 'POST',.... }


# git add, commit and push to deploy
$ git add . && git commit -m "First commit"
$ git push hasura master
```
Once the git push goes through, Flask microservice (called `app`) and ReactJs microservice (called `ui`) will be available at a URL

```bash
# Open the ReactJs app url in browser
$ hasura microservice open ui
```




