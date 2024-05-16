from flask import render_template
from flask import Flask, request, jsonify
import random

def index():
    return render_template('index.html')