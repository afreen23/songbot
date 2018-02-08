from src import app
from flask import jsonify,request
from watson_developer_cloud import ConversationV1


@app.route('/')
def home():
    return "Hello world"

@app.route('/input',methods=['POST'])
def conversation1():
    actual_text=request.get_json()

    conversation = ConversationV1(
        username='32bd799a-2d8b-4251-99c8-d1d57b4f5dfb',
        password="AuRjEkVRr1oK",
        url='https://gateway.watsonplatform.net/conversation/api',
        version='2017-04-21')

    workspace_id="ddab1874-15b1-4c06-9b1a-5083e6c364cd"
    context={}

    response = conversation.message(workspace_id=workspace_id, input={
        'text': actual_text["input"]},context=context)
    return jsonify(response)
