### Getting the Hasura project

```sh
$ hasura quickstart jaison/fb-bot
$ cd fb-bot
# Add FACEBOOK_VERIFY_TOKEN to secrets. This is any pass phrase that you decide on, keep a note on what you are choosing as your verify token, we will be using it later while setting things up for your bot on the facebook developer page.
$ hasura secrets update bot.fb_verify_token.key <YOUR-VERIFY-TOKEN>
# Add FACEBOOK_PAGE_ACCESS_TOKEN to secrets
$ hasura secrets update bot.fb_page_token.key <YOUR-FB-PAGE-ACCESS-TOKEN>
# Add Movie db api token to secrets
$ hasura secrets update bot.movie_db_token.key <YOUR-MOVIEDB-API-TOKEN>
# Deploy
$ git add . && git commit -m "Deployment commit"
$ git push hasura master
```

After the `git push` completes:

```sh
$ hasura microservice list
```

You will get an output like so:

```sh
INFO Getting microservices...                     
INFO Custom microservices:                        
NAME   STATUS    INTERNAL-URL(tcp,http)   EXTERNAL-URL
bot    Running   bot.default              https://bot.apology69.hasura-app.io

INFO Hasura microservices:                        
NAME            STATUS    INTERNAL-URL(tcp,http)   EXTERNAL-URL
auth            Running   auth.hasura              https://auth.apology69.hasura-app.io
data            Running   data.hasura              https://data.apology69.hasura-app.io
filestore       Running   filestore.hasura         https://filestore.apology69.hasura-app.io
gateway         Running   gateway.hasura           
le-agent        Running   le-agent.hasura          
notify          Running   notify.hasura            https://notify.apology69.hasura-app.io
platform-sync   Running   platform-sync.hasura     
