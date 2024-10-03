from .school_class import SchoolClass
from python.mykoob.utils import show

class School:
    def __init__(self, data: dict):
        self._local_data = data
        self.region = data['region']
        self.country_code = data['country_code']
        self.id = data['school_id']
        self.name = data['name']
        self.user_id = data['school_user_id']
        self.gate_enabled = data['school_gate_enabled']
        self.school_classes: list[SchoolClass] = [SchoolClass(school_class) for school_class in data['class']]
        
        show("School was initialized successfully")
    
    def json(self) -> dict:
        return self._local_data
    
    def __repr__(self) -> str:
        return f"School(id={self.id} name={self.name})"
