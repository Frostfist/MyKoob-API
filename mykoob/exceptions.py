
class BadCredentialsException(Exception):
    """Exception raised when a user is not authenticated."""

    def __init__(self, message="Credentials invalid."):
        self.message = message
        super().__init__(self.message)
    
    def __str__(self):
        return f"BadCredentialsException: {self.message}"
    
class NotAuthenticatedError(Exception):
    """Exception raised when a user is not authenticated."""

    def __init__(self, message="User is not authenticated"):
        self.message = message
        super().__init__(self.message)

    def __str__(self):
        return f"NotAuthenticatedError: {self.message}"

class NoAccessTokenError(Exception):
    """Exception raised when no access token is available."""
    
    def __init__(self, message="No access token available"):
        self.message = message
        super().__init__(self.message)
        
    def __str__(self):
        return f"NoAccessTokenError: {self.message}"


class NoUserError(Exception):
    """Exception raised when no user is available."""
    def __init__(self, message="No user available"):
        self.message = message
        super().__init__(self.message)
        
    def __str__(self):
        return f"NoUserError: {self.message}"