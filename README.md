# songbot

## About
A bot built with **[Watson Conversation Api](https://www.ibm.com/watson/developercloud/conversation/api/v1/?cm_mc_uid=24808535902515066792134&cm_mc_sid_50200000=1512714807)** backend in **python** and frontend in **react js**.

## Features

* Play songs as audio
* Watch video of songs 
* Lists top charts 

## Usage Examples

* Type ```play songname``` for listening any song
* Type ```watch songname``` for watching youtube video for the song
* Type charts name for displaying charts 
  #### Example
  ``` top bollywood charts``` for displaying bollywood charts

## Getting started

### Prerequisites

- [Hasura CLI](https://docs.hasura.io/0.15/manual/install-hasura-cli.html)
- [Git](https://git-scm.com)
- [Python 3](https://www.python.org/downloads/) and [pip](https://pip.pypa.io/en/stable/installing/) (required only for local development)
- [npm](https://www.npmjs.com/get-npm) (required only for local development)

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

# git add, commit and push to deploy
$ git add . && git commit -m "First commit"
$ git push hasura master
```

Once the git push goes through, Flask microservice (called `app`) and ReactJs microservice will be available at a URL

```bash
# Open the ReactJs app url in browser
$ hasura microservice open app
```

If the browser shows this page, everything is working as expected.
If it doesn't, go through the previous steps and see if you missed anything.
![Gif HomePage](https://github.com/afreen23/musicbot/blob/master/readme-assets/bot.gif)

## Edit and deploy code

### Directory structure

The flask and reactjs microservice is located in `microservices/` directory in your Hasura project with the following structure:

```bash
.
├── hasura.yaml
├── clusters.yaml
├── conf
│   ├── authorized-keys.yaml
│   ├── auth.yaml
│   ├── ci.yaml
│   ├── domains.yaml
│   ├── filestore.yaml
│   ├── gateway.yaml
│   ├── http-directives.conf
│   ├── notify.yaml
│   ├── postgres.yaml
│   ├── routes.yaml
│   └── session-store.yaml
├── migrations
│   ├── 1504788327_create_table_userprofile.down.yaml
│   ├── 1504788327_create_table_userprofile.down.sql
│   ├── 1504788327_create_table_userprofile.up.yaml
│   └── 1504788327_create_table_userprofile.up.sql
└── microservices 
    ├── ui
         └── app
            ├── package.json                    # file holding dependencies for project
            ├── public/                         # index.html
            ├── src/                            # main ReactJs app is defined here
                ├── index.js                    # entry point of react app
                ├── App.js                      # contains main functionality of app
                ├── index.css                   # defines css for index.js
                ├── registerserviceworker.js    # to serve assets from local cache
                └── components/                 # contains react components for ui 
         ├── k8s.yaml
         └── Dockerfile
    └── app
        ├── Dockerfile                   # instructions to build the image
        ├── k8s.yaml                     # defines how the app is deployed
        ├── conf
        │   └── gunicorn_config.py       # configuration for the web server
        └── src
            ├── config.py                # some utilities to configure URLs etc
            ├── hasura.py                # hasura API examples
            ├── __init__.py              # main Flask app is defined here
            ├── requirements.txt         # python dependency requirements
            └── server.py                # main Flask server code
```

### Edit

`microservices/app/src/server.py` is where the main app is present. 
`microservices/app/ui/app/` is where the ui of code resides .
[More on Reactjs](https://github.com/afreen23/musicbot/blob/master/README-React.js.md)
You can edit these files and deploy the changes.

### Deploy

Save the file, git add, commit and push to deploy the changes:

```bash
# git add, commit and push to deploy
$ git add src/server.py
$ git commit -m "add new url /json"
$ git push hasura master
```

### Verify

To checkout the new URL, open the microservice URL in a browser :

```bash
# open the url in browser
$ hasura microservice open ui

# add /json at the end of the url
```

### Debug

If the push fails with an error `Updating deployment failed`, or the URL is showing `502 Bad Gateway`/`504 Gateway Timeout`,
follow the instruction on the page and checkout the logs to see what is going wrong with the microservice:

```bash
# see status of microservice app
$ hasura microservice list

# get logs for app
$ hasura microservice logs app
```

You can deploy further changes by going through `Edit -> Deploy -> Verify -> Debug` cycle again and again.


### Local deployment

1. Download or clone the repo
2. ```cd microservices/ui/app```
3. Run ```npm install```
4. Run ```npm start```

Your app will be live on `localhost`


Boilerplate Hasura project with [Flask](http://flask.pocoo.org/) microservice.

