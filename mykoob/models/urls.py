from enum import StrEnum

class Url(StrEnum):
    AUTHORIZATION = 'https://www.mykoob.lv/?oauth2/authorizeDevice'
    RESOURCES = 'https://www.mykoob.lv/?api/resource'