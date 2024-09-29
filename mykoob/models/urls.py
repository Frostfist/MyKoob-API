from enum import StrEnum

class Url(StrEnum):
    AUTHORIZATION = 'https://www.mykoob.lv/?oauth2/authorizeDevice'
    RESOURCE = 'https://www.mykoob.lv/?api/resource'
    USERS_ONLINE = 'https://family.mykoob.lv/?menu/counterUsersOnline'

