import json

class AuthResponse:
    def __init__(self, data: dict = None):
        if data is not None and isinstance(data, dict):
            for key, value in data.items():
                setattr(self, key, value)  # Set attributes dynamically
            self.error = None
        else:
            self.error = "No data provided"

    def is_successful(self):
        # Assuming the presence of 'access_token' indicates success
        return getattr(self, 'access_token', None) is not None and self.error is None
    
    def json(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
    
    def __repr__(self):
        return f"AuthResponse({self.__dict__})"  # Show all attributes


    