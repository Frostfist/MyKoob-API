from .models.lesson import Lesson
from .exceptions import NoTokenError
from functools import wraps

def convert_lessons_to_json(lessons: list[Lesson]) -> dict:
    lessons_json = [lesson.__dict__ for lesson in lessons]
    return {"lessons": lessons_json}
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
