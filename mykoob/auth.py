from .models import Email, Password



class Session:
    """Session class for MyKoob API"""
    def __init__(self, email: Email, password: Password):
        """
        Session constructor
        :param email: User's email'
        :param password: User's password'
        """
        self.email = email
        self.password = password
        self.access_token = None
        self.user = None

        self._request_data: dict = {
            'use_oauth_proxy': 1,
            'client': 'MykoobMobile',
            'username': email,
            'password': password,
        }