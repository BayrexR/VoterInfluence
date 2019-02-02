import numpy as np
import pandas as pd
import logging
import sqlalchemy
import datetime as dt
import sys
sys.path.append("static/assets/Resources/")
import config as c
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, MetaData
from sqlalchemy.pool import StaticPool
from flask import Flask, jsonify, render_template, request, redirect



logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.DEBUG)

#=======================
#    Database Connection
#=======================
conn_string = f"{c.username}:{c.password}@etdq12exrvdjisg6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/qlmvsrhei7a78mbk"
engine = create_engine(f'mysql://{conn_string}')


# reflect sqliteDB into a new model Base
Base = automap_base()
# reflect tables into Base
Base.prepare(engine, reflect=True)

# Assign table refference to a vars
# BowlHistory = Base.classes.flsk_bowl_history
# BowlOutcome = Base.classes.flsk_bowl_outcome
# BowlPlayers = Base.classes.flsk_bowl_players

# Create Session obj
session = Session(engine)

#========================
#    Initialize Flask app
#========================
app = Flask(__name__)


#=========================
#                Functions
#=========================
#=========================
# global varriables
#=========================



#=========================
#Create Dropdown arrays
#=========================
#Years dropdown menu
# def yearsMenu():

#     with engine.connect() as con:
#         rs = con.execute('SELECT year FROM years_vw')
#         if (len(years) < 1):
#             for row in rs:
#                 years.append(row.year)
#     return years



#========================
#          Publish Routes
#========================


#======================
#Root Get Route
#======================
@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        render_template("index.html")
    )


#=====================
#Route to Project Documentation Page
#=====================
@app.route("/documentation")
def documentation():
    
    return (
        render_template("documentation.html")
    )

#======================
#Route to Class Survey Page
#======================
@app.route("/survey")
def survey():

    return (
        render_template("survey.html")
    )

#======================
#GET Route to pull results of survey from db for plot
#======================
@app.route("/apiV1.0/get_results")
def getResults():
    surv_results = [] #obj with results data
    results = jsonify(surv_results)
    return (
        render_template("survey.html", results=results)
    )

#======================
#POST Route publish survey selection to db
#======================
@app.route("/apiV1.0/post_results/<value>", methods=["GET", "POST"])
def postResults(value):
    if request.method == "POST":
        #Code to sql insert query statement
        print(request.value)
    return (
        # print(selection)
        render_template("survey.html")
    )


#=====================
#Get route returns list of all bowl games, year, team1, team2, winner
#=====================
# @app.route("/apiV1.0/history")
# def history():

#     results = (session.query(BowlHistory.bowl, 
#                              BowlHistory.cnt_games, 
#                              BowlHistory.min_year, 
#                              BowlHistory.max_year, 
#                              BowlHistory.home_teams, 
#                              BowlHistory.away_teams)
#                 .order_by(BowlHistory.bowl)                             
#                 .all())
    
#     if (len(results) > 0):
#         return jsonify(results) 
#     else:
#         return "There is no data for " + year + "."


if __name__ == '__main__':
    app.run(debug=True)

#Start app commands
# $ python app.py
#      or
#$ export FLASK_APP=app.py
#$ flask run

#App runs on local host (http://127.0.0.1:5000/)
