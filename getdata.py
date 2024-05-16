import requests
import json

url = "https://aad7esqtuc.execute-api.ap-southeast-1.amazonaws.com/test?user=Ub359275e3d0e0a2425adf876a5f5bcac"

response = requests.get(url, timeout=30)

if response.status_code == 200:
    data = response.json()
    # 使用json.dumps确保中文字符正确显示
    formatted_data = json.loads(data)
    print(formatted_data)
else:
    print(f"請求失敗，狀態碼：{response.status_code}")
