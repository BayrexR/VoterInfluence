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
# StatesIndex = Base.classes.states_i_vw
# PropertyIndex = Base.classes.props_i_vw
# StatesView = Base.classes.states_vw
# Survey = Base.classes.class_survey

# Create Session obj
session = Session(engine)

#========================
#    Initialize Flask app
#========================
app = Flask(__name__)


#========================
#          Publish Routes
#========================


#======================
#Root Get Route
#======================
@app.route("/")
def welcome():
    with engine.connect() as con:
        rsState = con.execute('SELECT state_id, state, geojson, population / 1000000 as population, influence_index, influence_index_er, swing_state, voting_pop_elig, voter_turnout, electoral FROM states_i_vw')
        rsProp = con.execute('SELECT prop_return, prop_display FROM props_i_vw')    
        rsSwingState = con.execute("SELECT case when swing_state = 1 then 'High' when swing_state = .5 then 'Moderate' when swing_state = 0 then 'Never' end as label, count(1) as value from   states_i_vw group by swing_state")
        rsSwingElectoral = con.execute("SELECT case when swing_state = 1 then 'High' when swing_state = .5 then 'Moderate' when swing_state = 0 then 'Never' end as label, sum(electoral) as value from   states_i_vw group by swing_state")
        rsSwingTurnout = con.execute("SELECT case when swing_state = 1 then 'High' when swing_state = .5 then 'Moderate' when swing_state = 0 then 'Never' end as label, avg(voter_turnout) as value from   states_i_vw group by swing_state")
        rsSwingPopulation = con.execute("SELECT case when swing_state = 1 then 'High' when swing_state = .5 then 'Moderate' when swing_state = 0 then 'Never' end as label, sum(population) as value from   states_i_vw group by swing_state")

    return (
       render_template("index.html", rsState=rsState, rsProp=rsProp, rsSwingState=rsSwingState, rsSwingElectoral=rsSwingElectoral, rsSwingTurnout=rsSwingTurnout, rsSwingPopulation=rsSwingPopulation)
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
    print(value)
    if request.method == "GET":
        #Code to sql insert query statement
        if value == "yes":
            #instert a record with a yes value of 1
            with engine.connect() as con:
                print(value)
                con.execute('INSERT INTO class_survey (YES) VALUES (1);')
        elif value == "no":
            #insert a rocord with a no value of 1
            with engine.connect() as con:
                print(value)
                con.execute('INSERT INTO class_survey (NO) VALUES (1);')
        elif value == "idk":
            #insert a rocord with a idk value of 1
            with engine.connect() as con:
                print(value)
                con.execute('INSERT INTO class_survey (IDK) VALUES (1);')
    rvalue = request.method
    return (
        render_template("survey.html")        
    )


if __name__ == '__main__':
    app.run(debug=True)

#Start app commands
# $ python app.py
#      or
#$ export FLASK_APP=app.py
#$ flask run

#App runs on local host (http://127.0.0.1:5000/)
