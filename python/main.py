# from secret.secret import EMAIL, PASSWORD, DATE_FROM, DATE_TO
from mykoob.auth import Session
from mykoob.api import MyKoob

import json
from mykoob.utils import convert_lessons_to_json

if __name__ == '__main__':
    session = Session(email="ademidovs4@edu.riga.lv", password="Skola2020")
    mykoob = MyKoob(session=session)
    
    auth_response = mykoob.authorize()
    for day in mykoob.get_lessons_plan("2024-10-03", "2024-10-03"):
        for lesson in day:
            print(lesson)
