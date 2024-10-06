import requests

url = 'https://www.mykoob.lv/?oauth2/authorizeDevice'

data = {
    'use_oauth_proxy': 1,
    'client': 'MykoobMobile',
    'username': 'dpolizhai@edu.riga.lv',
    'password': 'dfqyth49!',
}

response = requests.post(url, data=data, timeout=10)

# 
# url = 'https://www.mykoob.lv/?oauth2/authorizeDevice'
# payload = {
#     'use_oauth_token': 1,
#     'client': 'MykoobMobile',
#     'username': 'dpolizhai@edu.riga.lv',
#     'password': 'dfqyth49!',
# }
# response = requests.post(url, data=payload)

print(response.json())
