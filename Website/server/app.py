from flask import Flask
from flask import request
from flask import jsonify
#from dummydb import DummyDB
from db import DB

app = Flask(__name__)

@app.route("/messages/<int:id>", methods = ["OPTIONS"])
def do_preflight(id):
    return '',204,{"Access-Control-Allow-Origin": "*",
                   "Access-Control-Allow-Methods":"PUT, DELETE",
                   "Access-Control-Allow-Headers":"Content-Type"}



@app.route("/messages", methods=["GET"])
def get_acounts(): #give back trails with correct CORS (all of em right now)
    db = DB("messages.db")
    trails = db.readAllRecords()
    return trails, {"Access-Control-Allow-Origin": "*"}

@app.route("/messages/<int:id>", methods=["GET"])
def get_acount(id): #give back trails with correct CORS (one of em right now)
    db = DB("messages.db")
    message = db.readSingleRecord(id)
    
    if (message):

        return message, {"Access-Control-Allow-Origin": "*"}

    else:
        return "Could not find id {id}", 404,{"Access-Control-Allow-Origin": "*"}

@app.route("/messages/<int:id>", methods=["PUT"])
def edit_acount(id):
    db = DB("messages.db")
    d = {"username":request.form['username'],
         "password":request.form['password']}
    message = db.readSingleRecord(id)
    if (message):
        db.editRecord(id,d)
        return "Edited", 200, {"Access-Control-Allow-Origin": "*"}
    else:
        return "Could not find id {id} to edit", 404,{"Access-Control-Allow-Origin": "*"}
    
@app.route("/messages/<int:id>", methods=["DELETE"])
def delete_acount(id):
    print("removing id: ", id)
    db = DB("messages.db")
    message = db.readSingleRecord(id)
    
    if (message):

        db.deleteRecord(id)
        return "Deleted id {id}", 200,{"Access-Control-Allow-Origin": "*"}

    else:
        return "Could not delete id {id}", 404,{"Access-Control-Allow-Origin": "*"}

    
@app.route("/messages", methods=["POST"])
def create_new():
    db = DB("messages.db")
    print(request.form)
    d = {"username":request.form['username'],
         "password":request.form['password']}
    db.saveRecord(d)
    return "Created", 201, {"Access-Control-Allow-Origin": "*"}

@app.errorhandler(404)
def invalid(e):
    return "{e.description}", 404,{"Access-Control-Allow-Origin": "*"}

@app.route("/home")
def hello_home():
    return "<p>Hello Home!<p>"
def main():
    app.run(host='0.0.0.0')

main()