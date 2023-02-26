from flask import Flask, render_template, url_for
from data import aqis

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/aqis/')
def aqi_s():
    return render_template('aqis.html', aqis=aqis)


if __name__ == "__main__":
    app.run(debug=True)
