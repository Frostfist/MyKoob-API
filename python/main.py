from secret.secret import EMAIL, PASSWORD, DATE_FROM, DATE_TO
from mykoob.auth import Session
from mykoob.api import MyKoob

import json
from mykoob.utils import convert_lessons_to_json, remove_empty_lessons

if __name__ == '__main__':
    session = Session(email=EMAIL, password=PASSWORD)
    mykoob = MyKoob(session=session)
    
    auth_response = mykoob.authorize()
    
    lessons_plan = mykoob.get_lessons_plan_in_class("2024-10-03", "2024-10-03", class_name="9.cl")
    
    corrected_lessons_plan = remove_empty_lessons(lessons_plan)    
                
    for i in corrected_lessons_plan:
        print(i)
        