from .models.lesson import Lesson
from .exceptions import NoTokenError
from functools import wraps

def convert_lessons_to_json(lessons: list[Lesson]) -> dict:
    try:
        lessons_json = [lesson.__dict__ for lesson in lessons]
        return {"lessons": lessons_json}
    except TypeError:
        print("list of lessons, not a single one")

def remove_empty_lessons(lessons: list[Lesson]) -> list[Lesson]:
    new_lessons = []
    
    for i in lessons:
        if not i.discipline:
            continue
        
        new_lessons.append(i)
        
    return new_lessons

def show(info) -> None:
    print(f"[+] {info} \n")

def warn(info) -> None:
    print(f"[!] {info} \n")


def token_required(func):
    @wraps(func)
    def wrapper(self, *args, **kwargs):
        if not self.session.token:
            raise NoTokenError("Access token is missing or None.")

        return func(self, *args, **kwargs)

    return wrapper
