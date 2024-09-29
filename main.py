from secret.secret import EMAIL, PASSWORD, DATE_FROM, DATE_TO
from mykoob.auth import Session
from mykoob.api import MyKoob

import json
from mykoob.utils import convert_lessons_to_json

if __name__ == '__main__':
    session = Session(email=EMAIL, password=PASSWORD)
    mykoob = MyKoob(session=session)
    
    auth_response = mykoob.authorize()
    
    
    
    
    # with open('secret/activities.json', 'w') as activities_file:
    #     json.dump(mykoob.send_post_timetable(api="user_activities", date_from=DATE_FROM, date_to=DATE_TO), activities_file, indent=4)
    
    # print(session)
    
    # lessons = mykoob.get_lessons_plan(DATE_FROM, DATE_TO)
