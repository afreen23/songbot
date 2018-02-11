from src import app
from flask import jsonify,request
from watson_developer_cloud import ConversationV1
from bs4 import BeautifulSoup
import youtube_dl
import ssl
import re
import os
import requests
from urllib.request import Request,urlopen
import json
import urllib.request, urllib.parse,urllib.error

def controller(text):
    songname1=''
    conversation = ConversationV1(

        username='32bd799a-2d8b-4251-99c8-d1d57b4f5dfb',
        password="AuRjEkVRr1oK",
        url='https://gateway.watsonplatform.net/conversation/api',
        version='2017-04-21')

    workspace_id="ddab1874-15b1-4c06-9b1a-5083e6c364cd"
    context={}

    response = conversation.message(workspace_id=workspace_id, input={
        'text': text},context=context)

    #response = conversation.get_dialog_node(
    #    workspace_id = workspace_id,
    #    dialog_node = 'node_4_1517233973256'
    #)

    #Hi!!You look great!! What Music do you want me to play for you? Any Charts Anywhere Simply name!! :-)
    #Holla Whassup wat-music here!!:-)


    #
    #/gaana/bollywood-top-50#default / weekly correct
    #/gaana/international
    #/gaana/trending
    #/gaana/bollywood-weekly-hot-20
    #
    #/american-top-40/top-40
    #/american-top-40/hot-ac
    #
    #/spotify/global_daily_viral
    #/spotify/global_weekly_viral
    #/spotify/global_top_daily
    #/spotify/global_top_daily


    spotify_endpoints={}
    spotify_endpoints["daily viral"]="https://spotifycharts.com/viral/"
    spotify_endpoints["weekly viral"]="https://spotifycharts.com/viral/global/weekly/latest"
    spotify_endpoints["top daily"]="https://spotifycharts.com/regional/"
    spotify_endpoints["top weekly"]="https://spotifycharts.com/regional/global/weekly/latest"

    at40={}
    at40["top"]="https://www.at40.com/charts/top-40-238/latest/"
    at40["hot"]="https://www.at40.com/charts/hot-ac-243/latest/"
    ignore=["Buy Song","Song saved to My Music"]

    gaana={}
    gaana["bollywood top"]="https://gaana.com/playlist/gaana-dj-bollywood-top-50-1"
    gaana["international"]="https://gaana.com/playlist/gaana-dj-gaana-international-top-50"
    gaana["trending"]="https://gaana.com/songs"
    gaana["bollywood weekly hot"]="https://gaana.com/playlist/gaana-dj-bollywood-weekly-hot-20"


    def gaana_name(name):
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        try:
            url=gaana[name]
        except:
            return "Invalid Endpoint",404
        html = urllib.request.urlopen(url, context=ctx).read()
        temp=html.decode()
        soup=BeautifulSoup(temp,"html.parser")
        a=soup.find_all("a",class_="sng_c")
        res=""
        for link in a:
            temp=link["href"]
            if('song' in temp.split('/')):
                temp1=temp.split('/')
                tk=temp1[-1]
                tk=tk.replace('-',' ')
                cleaned = re.sub(r'\d+$', '', tk)
                res+=cleaned.capitalize()+"<br/>"
        return res


    def albumart(songname):
        spotifyfinal=""
        itunesfinal=""
        spotifyalbumart=""
        finalurl=""
        try:
            songname2=songname+" official itunes  "
            url="https://www.google.co.in/search?q="+urllib.request.quote(songname2)+"&source=lnms&tbm=isch"
            r=requests.get(url)
            fhand=r.text
            soup = BeautifulSoup(fhand,'html.parser')
            l=soup.find_all('a')
            for i in l:
                temp=i['href'].split('?')
                if(temp[0]=='/url' and 'itunes.apple.com' in i['href']):
                    itunesfinal=temp[1][2:]
                    break
            print("itunes",itunesfinal)
            if(itunesfinal==''):
                songname2=songname+" spotify "
                url="https://www.google.co.in/search?q="+urllib.request.quote(songname2)+"&source=lnms&tbm=isch"
                r=requests.get(url)
                fhand=r.text

                soup = BeautifulSoup(fhand,'html.parser')
                l=soup.find_all('a')
                spotifyfinal=''
                for i in l:
                    temp=i['href'].split('?')
                    if(temp[0]=='/url' and 'spotify' in i['href']):
                        temp1=temp[1][2:]
                        spotifyfinal=temp1.split('&')[0]
                        break
            print(spotifyfinal)
            if(itunesfinal!=''):
                fhand=urlopen(itunesfinal).read()
                soup = BeautifulSoup(fhand,'html.parser')
                l=soup.find_all('source')
                for i in l:
                    finalurl=i['srcset'].split(',')[-1]
                    finalurl=finalurl.split(' ')[0]
                    break

            if(spotifyfinal!=''):
                fhand=urlopen(spotifyfinal).read()
                soup=BeautifulSoup(fhand,'html.parser')
                l=soup.findAll("div")
                temp=re.findall('background-image:url\(.*?\)',str(l))
                spotifyalbumart=temp[0].split('(')[1][:-1]

            if(spotifyfinal!=''):
                return spotifyalbumart
            else:
                return finalurl
        except Exception as e:
            raise e

    def at_40(choice):
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        try:
            url=at40[choice]
        except :
            return 'Invalid url',404
        html=urllib.request.urlopen(url).read()
        temp=html.decode()
        soup=BeautifulSoup(temp,"html.parser")
        a=soup.find_all("a",target="_blank")
        res=""
        j=0
        for i in a:
            try:
                if('songs' in i['href'] and len(i.contents)==1 and i.contents[0] not in ignore):
                    songname=i.contents[0]
                    j+=1
                    if(j%2==0):
                        res+=(songname+"'\n'")
                    else:
                        res+=(songname+" - ")
            except:
                pass
        return res

    def getspotify(name):
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        try:
            url=spotify_endpoints[name]
        except :
            return "Invalid Endpoint",404
        url="https://spotifycharts.com/viral/"
        html=urllib.request.urlopen(url).read()
        temp=html.decode()
        soup=BeautifulSoup(temp,"html.parser")
        songslist=soup.find_all("strong")
        artistlist=soup.find_all("span")
        temp=[]
        for i in artistlist:
            if(len(i.contents)==1):
                temp.append(i.contents[0])
        res=""
        if(len(songslist)!=len(temp)):
            return "Some Error Occured Please give us time to fix it",404
        for i in range(len(songslist)):
            res+=(songslist[i].contents[0]+" "+temp[i]+"\n")
        return res


    def stream(song):
        song=song+" official music video "
        songss=song.split()
        print(songss)
        base_url="https://www.youtube.com/results?search_query="+'+'.join(songss)
        print(base_url)
        url="https://www.youtube.com"
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        html=urllib.request.urlopen(base_url).read()
        temp=html.decode()
        soup=BeautifulSoup(temp,"html.parser")
        list1=soup.find_all('a')
        for i in list1:
            temp=i["href"]
            temp1=temp.split('?')
            if("/watch" in temp1[0]):
                url=url+temp
                break
        baseurl="https://www.youtube.com/embed/"
        view=url.split('=')[-1]
        baseurl=baseurl+view
        ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
                            'key': 'FFmpegExtractAudio',
                            'preferredcodec': 'mp3',
                            'preferredquality': '192',
                            }],
                            'quiet': True,
                            'restrictfilenames': True,
                            'prefer_insecure':True
                            }

        ydl = youtube_dl.YoutubeDL(ydl_opts)

        temp=ydl.extract_info(url,download=False)
        return [baseurl,temp['title']]


    def play(songnme,ren=" Official Audio "):
        songnme=songnme+ren
        songss=songnme.split()
        base_url="https://www.youtube.com/results?search_query="+'+'.join(songss)
        url="https://www.youtube.com"
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        html=urllib.request.urlopen(base_url).read()
        temp=html.decode()
        soup=BeautifulSoup(temp,"html.parser")
        list1=soup.find_all('a')
        j=0
        urllist=[]
        for i in list1:
            temp=i["href"]
            temp1=temp.split('?')
            if("/watch" in temp1[0]):
                newurl=url+temp
                ydl_opts = {
                'format': 'bestaudio/best',
                'postprocessors': [{
                                    'key': 'FFmpegExtractAudio',
                                    'preferredcodec': 'mp3',
                                    'preferredquality': '192',
                                    }],
                                    'quiet': True,
                                    'restrictfilenames': True,
                                    'prefer_insecure':True
                                    }

                ydl = youtube_dl.YoutubeDL(ydl_opts)

                temp=ydl.extract_info(newurl,download=False)
                try:
                    fh=urlopen(temp["url"])
                    break
                except Exception as e:
                    pass
        return [temp["url"],temp['title']]


    entities=response["entities"]
    intents=response["intents"]
    jsoncontent={"response":"","charts":{"name":"","type":"","list":""},"watch":"","audiosrc":"","albumart":"","name":""}
    respnce=""
    def setjson(response,chartname,charttype,list1,watch,audiosrc,albumart1,name):
        jsoncontent["response"]=response
        jsoncontent["charts"]["name"]=chartname
        jsoncontent["charts"]["type"]=charttype
        jsoncontent["charts"]["list"]=list1
        jsoncontent["embed"]=watch
        jsoncontent["audiosrc"]=audiosrc
        jsoncontent["albumart"]=albumart1
        jsoncontent["name"]=name
        return
    try:
        if('spotify' in intents[0]['intent'].lower()):
            responce=response["output"]['text'][0]+'\n'
            #types-top,viral
            entitylist=[]
            type1=""
            for i in entities:
                entitylist.append(i['entity'].lower())
            if('daily' and 'viral' in entitylist):
                respnce+=getspotify('daily viral')
                type1="daily viral"
            elif('daily' and 'top' in entitylist):
                respnce+=getspotify('daily top')
                type1="daily top"
            elif('top' in entitylist):
                respnce+=getspotify('top weekly')
                type1="top weekly"
            elif('viral' in entitylist):
                respnce+=getspotify('top viral')
                type1="top viral"
            else:
                pass
            setjson(responce,"spotify",type1,respnce,"","","","")

        elif('gaana' in intents[0]['intent'].lower()):
            entitylist=[]
            type1=""
            responce=response["output"]['text'][0]+'\n'
            for i in entities:
                entitylist.append(i['entity'].lower())

            if('top' and 'bollywood' in entitylist):
                respnce+=gaana_name('bollywood top')
                type1="bollywood top"
            elif('top' in entitylist or 'hot' and 'bollywood' in entitylist or 'hot' in entitylist):
                respnce+=gaana_name('hot bollywood')
                type1="hot bollywood"
            elif('trending' in entitylist):
                respnce+=gaana_name('trending')
                type1="trending"
            elif('international' in entitylist):
               respnce+= gaana_name('international')
               type1="international"
            else:
                pass
            setjson(responce,"gaana",type1,respnce,"","","","")

        elif('at40' in intents[0]['intent'].lower()):
            entitylist=[]
            type1=""
            responce=response["output"]['text'][0]+'\n'
            for i in entities:
                entitylist.append(i['entity'].lower())

            if('hot' in entitylist):
               respnce+= at_40('hot')
               type1="hot"
            elif('top' in entitylist):
               respnce+= at_40('top')
               type1="hot"
            else:
                pass
            setjson(responce,"at40",type1,respnce,"","","","")
        elif('stream' in intents[0]['intent'].lower()):
            responce=response["output"]['text'][0]+'\n'
            res=stream(response["input"]["text"])
            songname1=res[0]
            names=res[1]
            setjson(responce,"","","",songname1,"","",names)
        elif('play-song' in intents[0]['intent'].lower()):
            respnce=response["output"]['text'][0]+'\n'
            res=play(response["input"]["text"])
            songname1=res[0]
            names=res[1]
            albumart1=albumart(names)
            setjson(respnce,"","","","",songname1,albumart1,names)
        else:
            setjson(response["output"]['text'][0]+'\n',"","","","","","","")
    except Exception as e:
        respnce=response["output"]['text'][0]+'\n'
        setjson(respnce,"","","","","","","")
    return jsoncontent

@app.route('/')
def home():
    return "Hello world"

@app.route('/input',methods=['POST'])
def mainconversation():
    actual_text=request.get_json()
    jsoncontent=controller(actual_text["input"])
    return jsonify(jsoncontent)
