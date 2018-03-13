import os
import time
import webbrowser

print("Beginning set-up")
os.system("pip3 install -r requirements.txt")
print("Step1-> setting clustername")
os.system("python3 settings.py")
print("Step2-> adding the git repository")
os.system("git add .")
print("Step 3->commit and pushing to hasura cluster")
os.system("git commit -m'Initial Commit'")
os.system("git push hasura master")

if(x!=0):
    print("Remote server :EROR Redeploying it may take seconds...")
while(x!=0):
    
    x=os.system("git push hasura master")


print("Deployement succesfull!!")
time.sleep(2)
print("Trying to open the url..")

with open("temp.txt",'r') as fh:
    cluster=fh.read()
try:
    webbrowser.open("https://ui."+cluster+".hasura-app.io/")
except:
    print("Opening failed.Try opening manually..")
