from dataclasses import dataclass

class Email(str):
    @property
    def domain(self) -> str:
        """
        The domain of the email.
        :return: str
        """
        return self.split("@")[1]
    
    def is_correct(self) -> bool:
        """
        Checks if the email is correct.
        :return: bool
        """
        return bool(self.domain)
        