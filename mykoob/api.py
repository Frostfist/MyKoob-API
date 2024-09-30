from mykoob.auth import Session
from .models import Url, User, Lesson, Attendance, Homework
from . import responses, exceptions
from .utils import show, token_required

import requests


class MyKoob:
    """Class that represents a MyKoob API."""

    def __init__(self, session: Session) -> None:
        self.session = session
        

    @token_required
    def _get(self, url: Url):
        data = {
            'access_token': self.session.token,
        }

        return requests.get(url=url, data=data).content
    
    @token_required
    def _post(self, api: str) -> dict:
        data = {
            'api': api,
            'access_token': self.session.token
        }

        return requests.post(Url.RESOURCE, data=data, timeout=10).json()

    @token_required
    def _post_timetable(self, api: str, date_from: str, date_to: str) -> dict:
        """
        :param date_from: start date in YYYY-MM-DD format 
        :param date_to:  end date in YYYY-MM-DD format
        :return: 
        """
        data = {
            'api': api,
            'access_token': self.session.token,
            'date_from': date_from,
            'date_to': date_to,
            'school_classes_id': 106578,
            'school_user_id': 965417
        }

        return requests.post(Url.RESOURCE, data=data, timeout=10).json()

    @token_required
    def get_user_data(self) -> User:
        data = {
            'api': 'user_data',
            'access_token': self.session.token
        }
        
        response = requests.post(Url.RESOURCE, data=data, timeout=10)
        
        
        
        return User(data=response.json().get("user_data"))

    @token_required
    def get_lessons_plan(self, date_from: str, date_to: str) -> list[Lesson]:
        """
        :param date_from: start date in YYYY-MM-DD format 
        :param date_to:  end date in YYYY-MM-DD format
        :return: 
        """
        try:
            response = requests.post(Url.RESOURCE, data={
                'api': 'user_lessonsplan',
                'access_token': self.session.token,
                'date_from': date_from,
                'date_to': date_to,
                'school_classes_id': 106578,
                'school_user_id': 965417,
            }, timeout=10)

            lessons: list[Lesson] = []

            for date in response.json().get('lessonsplan', {}).get('dates', []):
                for lesson in date.get('lessons', []):
                    lessons.append(Lesson(data=lesson))

            show("Lessons plan is got successfully fetched from MyKoob API")

            return lessons

        except exceptions.NotAuthenticatedError:
            raise exceptions.NotAuthenticatedError("You are not authenticated.")

    @token_required
    def get_attendance(self, date_from: str, date_to: str) -> Attendance:
        ...  # TODO: Make attendance list from date to date.

    @token_required
    def get_homework(self, date_from: str, date_to: str) -> list[Homework]:
        ...  # TODO: Make homework list from date to date.

    @token_required
    def get_users_count(self) -> bytes:
        return self._get(Url.USERS_ONLINE)

    def authorize(self) -> responses.AuthResponse:
        response = requests.post(Url.AUTHORIZATION, data={
            'use_oauth_proxy': 1,
            'client': 'MykoobMobile',
            'username': self.session.email,
            'password': self.session.password,
        }, timeout=10)

        try:
            self.session._access_token = response.json()['access_token']

            show("Authorization successful")
            

        except KeyError:
            self.session._access_token = None
            raise exceptions.NotAuthenticatedError("Maybe, yours credentials are wrong. Check your username and password.")

        self.session.user = self.get_user_data()

        response = responses.AuthResponse(data=response.json())
        
        return response