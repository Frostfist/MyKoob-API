from .auth import Session
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
    def get_user_data(self) -> User:
        data = {
            'api': 'user_data',
            'access_token': self.session.token
        }

        response = requests.post(Url.RESOURCE, data=data, timeout=10)

        return User(data=response.json().get("user_data"))

    @token_required
    def get_lessons_plan(self, date_from: str, date_to: str) -> list[list[Lesson]]:
        """
        Fetch lessons plan for all classes within the given date range.

        :param date_from: start date in YYYY-MM-DD format
        :param date_to:  end date in YYYY-MM-DD format
        :return: List of lessons for each class.
        """
        output: list[list[Lesson]] = []

        for school_class in self.session.user.school.school_classes:
            show(f"Working with {school_class.name}")
            lessons = self._fetch_lessons_plan(date_from, date_to, school_class.id)
            output.append(lessons)

        return output

    @token_required
    def get_lessons_plan_in_class(self, date_from: str, date_to: str, class_name: str) -> list[Lesson]:
        """
        Fetch lessons plan for a specific class within the given date range.

        :param date_from: start date in YYYY-MM-DD format
        :param date_to:  end date in YYYY-MM-DD format
        :param class_name: The name of the class for which the lessons plan is fetched.
        :return: List of lessons for the specific class.
        """
        # Find the class by name
        school_class = next((cls for cls in self.session.user.school.school_classes if cls.name == class_name), None)

        if not school_class:
            raise exceptions.ClassNotFoundError(f"Class '{class_name}' not found.")

        return self._fetch_lessons_plan(date_from, date_to, school_class.id)

    def _fetch_lessons_plan(self, date_from: str, date_to: str, class_id: int) -> list[Lesson]:
        """
        Private method to handle the API request and lesson fetching logic.

        :param date_from: start date in YYYY-MM-DD format
        :param date_to: end date in YYYY-MM-DD format
        :param class_id: The ID of the class for which the lessons plan is fetched.
        :return: List of lessons for the specific class.
        """
        try:
            response = requests.post(Url.RESOURCE, data={
                'api': 'user_lessonsplan',
                'access_token': self.session.token,
                'date_from': date_from,
                'date_to': date_to,
                'school_classes_id': class_id,
                'school_user_id': self.session.user.school.user_id,
            }, timeout=10)

            lessons: list[Lesson] = []
            modified_response = response.json().get('lessonsplan', {}).get('dates', [])

            if not modified_response:
                raise exceptions.BadResponseError("Lessons plan couldn't be caught.")

            for date in modified_response:
                for lesson in date.get('lessons', []):
                    lessons.append(Lesson(data=lesson))

            if not lessons:
                raise exceptions.NoLessonsError

            show("Lessons plan successfully fetched from MyKoob API")
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
    
        print(response.json())        

        try:
            self.session._access_token = response.json()['access_token']

            show("Authorization successful")


        except KeyError:
            self.session._access_token = None
            raise exceptions.NotAuthenticatedError(
                "Maybe, yours credentials are wrong. Check your username and password.")

        self.session.user = self.get_user_data()

        response = responses.AuthResponse(data=response.json())

        return response
