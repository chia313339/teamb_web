from flask import render_template
from flask import Flask, request, jsonify
import requests
import random

def index():
    return render_template('index.html')

def get_customer_info():
    user_id = request.args.get('user')
    print(user_id)
    # 模擬從數據庫或其他服務獲取的數據
    external_api_url = f"https://y5x6w1m9vi.execute-api.ap-southeast-1.amazonaws.com/default/teamb-web-demo?user={user_id}"
    # 發送請求到外部API
    try:
        response = requests.get(external_api_url)
        response.raise_for_status()  # 如果返回的狀態碼不是200，這行會引發一個HTTPError
    except requests.RequestException as e:
        return jsonify({'error': str(e)}), 500
    # 獲取並處理外部API的JSON回應
    customer_info = response.json()

    # 將處理後的結果返回給前端
    return jsonify(customer_info)