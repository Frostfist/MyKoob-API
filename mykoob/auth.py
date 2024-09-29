from .models import Email, Password, User
from .utils import show
from typing import Optional
from dataclasses import dataclass


@dataclass
class Session:
    """Session class for MyKoob API"""

    def __init__(self, email: Email, password: Password):
        """
        Session constructor
        :param email: User's email'
        :param password: User's password'
        """
        self.email: Email = Email(email)
        self.password: Password = Password(password)
        self._access_token = None
        self.user: Optional[User] = None

        show("Session constructed")
    
    @property
    def token(self) -> Optional[str]:
        return self._access_token