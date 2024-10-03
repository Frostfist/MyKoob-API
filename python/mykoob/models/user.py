from .school import School
from dataclasses import dataclass


@dataclass
class User:
    def __init__(self, data: dict):
        self._json_data = data
        self.is_student: bool = data['is_student']
        self.is_parent: bool = data['is_parent']
        self.plus_active: bool = data['plus_active']
        self.age = data["own_data"]['age']
        self.gender = data["own_data"]['sex']
        self.name = data["own_data"]['user_name']
        self.surname = data["own_data"]['user_surname']
        self.phone = data["own_data"]['phone_number']
        self.id = data["own_data"]['user_id']
        self.locale = data["own_data"]['locale']
        self.school: School = School(data['user'][0]['school'][0])

    def json(self) -> dict:
        return self._json_data

    def __repr__(self) -> str:
        return f"User(id={self.id})"
