from src import app
from flask import jsonify,request,Response,Flask
from watson_developer_cloud import ConversationV1
from bs4 import BeautifulSoup
import youtube_dl
import ssl
import re
import os
import sys
import requests
from urllib.request import Request,urlopen
import json
import urllib.request, urllib.parse,urllib.error



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


class Song(object):
    """docstring for ."""
    def __init__(self):
        self.id=""
        self.ytd=""
        self.title=""
        self.chartname=""
        self.charttype=""
        self.chartlist=""
        self.albumart=""
        self.audiosrc=""
        self.response=""
        self.view=""
        self.downloadable=""

    def getYoutube(self,song):
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
        self.title=temp["title"]
        self.ytd=baseurl
        self.view=view
        self.getDownloads(temp["title"],True)
        self.audiosrc=self.downloadable
        self.downloadable=""
        return

    def Response(self,text):
        self.response=response
    def getspotify(self,name):
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        print(name,file=sys.stderr)

        try:
            url=spotify_endpoints[name]
        except :
            return "Invalid Endpoint",404
        html=urllib.request.urlopen(url).read()
        temp=html.decode()
        soup=BeautifulSoup(temp,"html.parser")
        songslist=soup.find_all("strong")
        artistlist=soup.find_all("span")
        temp=[]
        print(name,file=sys.stderr)

        for i in artistlist:
            if(len(i.contents)==1):
                temp.append(i.contents[0])
        res=""
        if(len(songslist)!=len(temp)):
            return "Some Error Occured Please give us time to fix it",404
        for i in range(len(songslist)):
            res+=(songslist[i].contents[0]+" "+temp[i]+"<br/>")

        self.chartname="Spotify"
        self.charttype=name
        self.chartlist=res
        return

    def getAt40(self,choice):
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        try:
            url=at40[choice]
        except Exception as e:
            raise e

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
                        res+=(songname+"<br/>")
                    else:
                        res+=(songname+" - ")
            except:
                pass
        self.chartlist=res
        self.chartname="At-40"
        self.chartname=choice
        return
    def gaana_name(self,name):
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
        self.chartname="Gaana"
        self.chartlist=res
        self.charttype=name
        return
    def Albumart(self,songname):
        spotifyfinal=""
        itunesfinal=""
        spotifyalbumart=""
        finalurl=""
        print(songname,file=sys.stderr)
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
                self.albumart= spotifyalbumart
                return
            else:
                self.albumart=finalurl
                return
        except Exception as e:
            raise e
    def getDownloads(self,text,parsed=False):
        downloadwords=["download","save","offline"]

        temp=text.split(' ')
        parse=""
        for i in temp:
            if(i in downloadwords):
                continue
            parse+=i+" "
        print(parse,file=sys.stderr)
        if(not parsed):
            self.getYoutube(parse)
            self.ytd=""

        self.audiosrc=""
        url='https://t1.youtube7.download/check.php?callback=jQuery111204704801896818165_1519396305950&v='+self.view+'&f=mp3&_=1519396305951'
        fhand=requests.get(url)
        temp=fhand.text
        q=re.findall('\{.*?\}',temp)

        s=json.loads(q[0])
        sd = "t1.youtube7.download"

        NewUrlMp3 = 'https://' + sd + '/' + s["sid"] + '/' + s["hash"] + '/' + self.view
        self.downloadable=NewUrlMp3
        print(NewUrlMp3,file=sys.stderr)
        return

    def stream(self,song):
        self.getYoutube(song)
        self.audiosrc=""

    def getJSON(self):
        result={"response":self.response,
        "charts":{"name":self.chartname,"type":self.charttype,"list":self.chartlist},
        "watch":self.ytd,
        "audiosrc":self.audiosrc,
        "albumart":self.albumart,
        "name":self.title,
        "download":self.downloadable,
        "view":self.view
        }
        return result

songmetadata=Song()

def controller(text):
    songname1=''
    conversation = ConversationV1(

        username='32bd799a-2d8b-4251-99c8-d1d57b4f5dfb',
        password="AuRjEkVRr1oK",
        url='https://gateway.watsonplatform.net/conversation/api',
        version='2017-04-21')

    workspace_id="ddab1874-15b1-4c06-9b1a-5083e6c364cd"


    response = conversation.message(workspace_id=workspace_id, input={
        'text': text})
    entities=response["entities"]
    intents=response["intents"]

    if('spotify' in intents[0]['intent'].lower()):
        songmetadata.response=response["output"]['text'][0]+'\n'
        #types-top,viral
        entitylist=[]
        type1=""
        for i in entities:
            entitylist.append(i['entity'].lower())
        if('daily' in entitylist and 'viral' in entitylist):
            songmetadata.getspotify('daily viral')
        elif('daily' in entitylist and 'top' in entitylist):
            songmetadata.getspotify('top daily')
        elif('top' in entitylist):
            songmetadata.getspotify('top weekly')
        elif('viral' in entitylist):
            songmetadata.getspotify("top viral")
        else:

            pass

    elif('gaana' in intents[0]['intent'].lower()):
        entitylist=[]
        type1=""
        songmetadata.response=response["output"]['text'][0]+'\n'
        for i in entities:
            entitylist.append(i['entity'].lower())

        if('top' in entitylist and 'bollywood' in entitylist):
            songmetadata.gaana_name('bollywood top')
        elif('top' in entitylist or 'hot' and 'bollywood' in entitylist or 'hot' in entitylist):
            songmetadata.gaana_name('hot bollywood')
        elif('trending' in entitylist):
            songmetadata.gaana_name('trending')
        elif('international' in entitylist):
            songmetadata.gaana_name('international')
        else:
            pass

    elif('at40' in intents[0]['intent'].lower()):
        entitylist=[]
        type1=""
        songmetadata.response=response["output"]['text'][0]+'\n'
        for i in entities:
            entitylist.append(i['entity'].lower())

        if('hot' in entitylist):
            songmetadata.getAt40('hot')
        elif('top' in entitylist):
            songmetadata.getAt40('top')
        else:
            pass
    elif('stream' in intents[0]['intent'].lower()):
        print("stream",file=sys.stderr)
        songmetadata.response=response["output"]['text'][0]+'\n'
        songmetadata.stream(response["input"]["text"])
    elif('play-song' in intents[0]['intent'].lower()):

        songmetadata.response=response["output"]['text'][0]+'\n'
        songmetadata.getYoutube(response["input"]["text"])
        print(songmetadata.title,file=sys.stderr)
        songmetadata.Albumart(songmetadata.title)
        songmetadata.ytd=""

    elif('download' in intents[0]['intent'].lower()):
        songmetadata.response=response["output"]['text'][0]+'\n'
        songmetadata.getDownloads(response["input"]["text"])
        songmetadata.ytd=""
        songmetadata.audiosrc=""

    else:
        songmetadata.response=response["output"]['text'][0]+'\n'

    return songmetadata.getJSON()



@app.route('/')
def home():
    return "Hello world"

@app.route('/input',methods=['POST'])
def mainconversation():
    songmetadata.__init__()
    actual_text=request.get_json()
    jsoncontent=controller(actual_text["input"])
    return jsonify(jsoncontent)

@app.route('/stream',methods=['POST'])
def audiostreamer():
    jason=request.get_json()
    url=jason["src"]
    fhand=urlopen(url)
    def generate():
        for data in fhand:
            yield data
    return Response(generate(), mimetype="audio/x-wav")
