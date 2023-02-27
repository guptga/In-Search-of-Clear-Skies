#################################################
# Database Setup - Dependencies
#################################################
from flask import Flask, jsonify
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
import pandas as pd

#################################################
# Database Setup
#################################################

# create engine
engine = create_engine("postgresql://postgres:postgres@localhost/aqi_db")
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Readings = Base.classes.readings

#################################################
# Flask Setup
#################################################
# 1. import Flask

# 2. Create an app, being sure to pass __name__
app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

#################################################
# Flask Routes
#################################################


@app.route('/')
def home():
    """List all available api routes."""
    return (
        f"Welcome to our AQI site!<br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/aqi/<br/>"
        f"/api/v1.0/particulates/<br/>"
    )


@app.route('/api/v1.0/aqi/')
def aqi():
    session = Session(engine)

    """Return a list of all aqi data"""
    # Query all stations and aqis
    results = session.query(Readings.station, Readings.aqi,
                            Readings.co, Readings.no2, Readings.o3, Readings.pm25).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_aqi = []
    for station, aqi, co, no2, o3, pm25 in results:
        aqi_dict = {}
        aqi_dict["station_name"] = station
        aqi_dict["aqi"] = aqi
        aqi_dict["co"] = co
        aqi_dict["no2"] = no2
        aqi_dict["o3"] = o3
        aqi_dict["pm25"] = pm25
        all_aqi.append(aqi_dict)

    return jsonify(all_aqi)


if __name__ == "__main__":
    app.run(debug=True)
