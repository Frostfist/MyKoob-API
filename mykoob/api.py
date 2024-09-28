from mykoob.auth import Session
from .models import responses, Url
import mykoob.exceptions as exceptions
import json
import requests

class MyKoob:
    """Class that represents a MyKoob API."""
    

    def __init__(self, session: Session):
        self.session = session
        
    def get_user_data(self) -> dict:
        data = {
            'api': 'user_data',
            'access_token': self.session.access_token
        }

        response = requests.post(Url.RESOURCES, data=data, timeout=10)

        return response.json()['user_data']
    
    def get_lessons_plan(self, date_from, date_to) -> dict:
        """
        
        :param date_from: start date in YYYY-MM-DD format 
        :param date_to:  end date in YYYY-MM-DD format
        :return: 
        """
        data = {
            'api': 'user_lessonsplan',
            'access_token': self.session.access_token,
            'date_from': date_from,
            'date_to': date_to,
            'school_classes_id': 106578,
            'school_user_id': 965417,
        }

        response = requests.post(Url.RESOURCES, data=data, timeout=10)

        return response.json()['lessonsplan']


    def authorize(self) -> responses.AuthResponse:
            response = requests.post(Url.AUTHORIZATION, data={
                'use_oauth_proxy': 1,
                'client': 'MykoobMobile',
                'username': self.session.email,
                'password': self.session.password,
            }, timeout=10)
    
            try:
                self.session.access_token = response.json()['access_token']
    
            except KeyError:
                self.session.access_token = None
    
            self.session.user = self.get_user_data()
    
            return responses.AuthResponse(data=response.json())
        

