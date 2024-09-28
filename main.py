from mykoob.api import Session


if __name__ == '__main__':
    session = Session(email='<EMAIL>', password='<PASSWORD>')
    session.authorize()
    
    