from mykoob.auth import Session
from mykoob.api import MyKoob
from secret.secret import EMAIL, PASSWORD

if __name__ == '__main__':
    session = Session(email=EMAIL, password=PASSWORD)
    api = MyKoob(session=session)
    
    api.authorize()
    
    lessons_plan = api.get_lessons_plan("2024-09-23", "2024-09-23")
    
    
    
    
