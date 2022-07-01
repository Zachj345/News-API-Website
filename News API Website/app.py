import requests
from flask import Flask
from flask import render_template, request, flash, jsonify, redirect, url_for
from datetime import date, timedelta

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'secret key'


API_KEY = 'e02c1949039b4ac5aaf9314b00675b47'


@app.route('/', methods=['GET', 'POST'])
@app.route('/home', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        search = request.form.get('search')
        print(search, type(search))
        if not search:
            flash('Must enter some characters to query The News.', category='error')

        return jsonify({'success': 'facts'})

    elif request.method == 'GET':
        endpoint = 'https://newsapi.org/v2/top-headlines'
        params = {'apiKey': API_KEY, 'country': 'us'}

        response = requests.get(endpoint, params=params)
        print(response.reason)
        info = response.json()
        print('GET')

        return render_template('index.html', info=info)


@app.route('/about-us', methods=['GET'])
def about():
    return render_template('about.html')


if __name__ == '__main__':
    app.run(debug=True)
