from flask import Flask
import urllib.request, urllib.parse,urllib.error
from bs4 import BeautifulSoup
import youtube_dl
import ssl
import re
import os

class Songs(object):
    """docstrSongs"""
    def __init__(self, song_name,artist):
        self.song=song_name
        self.artist=artist

    def getinfo(self):
        return self.song.capitalize()+" "+self.artist.capitalize()

    def __str__(self):
        return self.song.capitalize()+" "+self.artist.capitalize()



app=Flask(__name__)

gaana={}
gaana["bollywood-top-50"]="https://gaana.com/playlist/gaana-dj-bollywood-top-50-1"
gaana["international"]="https://gaana.com/playlist/gaana-dj-gaana-international-top-50"
gaana["trending"]="https://gaana.com/songs"
gaana["bollywood-weekly-hot-20"]="https://gaana.com/playlist/gaana-dj-bollywood-weekly-hot-20"
@app.route('/gaana/<string:name>')
def gaana_bollywood(name):
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

at40={}
at40["top-40"]="https://www.at40.com/charts/top-40-238/latest/"
at40["hot-ac"]="https://www.at40.com/charts/hot-ac-243/latest/"
ignore=["Buy Song","Song saved to My Music"]
@app.route("/american-top-40/<string:choice>")
def at_40(choice):
    songs=[]
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

spotify_endpoints={}
spotify_endpoints["global_daily_viral"]="https://spotifycharts.com/viral/"
spotify_endpoints["global_weekly_viral"]="https://spotifycharts.com/viral/global/weekly/latest"
spotify_endpoints["global_top_daily"]="https://spotifycharts.com/regional/"
spotify_endpoints["global_top_daily"]="https://spotifycharts.com/regional/global/weekly/latest"
@app.route('/spotify/<string:name>')
def getspotify(name):
    songs=[]
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

@app.route("/stream/<string:song>")
def stream(song):
    song=song+"Official Music Video"
    songss=song.split()
    base_url="https://www.youtube.com/results?search_query="+'+'.join(songss)
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
    return url



@app.route("/src/<string:songnme>")
def src(songnme):
    songnme=songnme+"Official Audio"
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
    for i in list1:
        temp=i["href"]
        temp1=temp.split('?')
        if("/watch" in temp1[0]):
            url=url+temp
            break
    ydl_opts = {
            'format': 'bestaudio/best',
            'postprocessors': [{
                                'key': 'FFmpegExtractAudio',
                                'preferredcodec': 'mp3',
                                'preferredquality': '192',
                                }],
                                'quiet': True,
                                'restrictfilenames': True,
                                'outtmpl': 'C:\\Users\\'+os.environ['USERNAME']+'\\Desktop\\%(title)s.%(ext)s'
                                }

    ydl = youtube_dl.YoutubeDL(ydl_opts)
    temp=ydl.extract_info(url,download=False)
    return temp["url"]



app.run(port=5050)
