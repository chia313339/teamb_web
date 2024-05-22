from flask import Flask
from app.route import *
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.jinja_env.variable_start_string = '[['
    app.jinja_env.variable_end_string = ']]'
    app.add_url_rule('/', 'index', index, methods=['GET', 'POST'])
    app.add_url_rule('/api/customer-info', '/api/customer-info', get_customer_info, methods=['GET'])
    return app