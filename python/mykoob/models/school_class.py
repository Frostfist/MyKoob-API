class SchoolClass:
    def __init__(self, data: dict):
        self.id = data['school_classes_id']
        self.name = data['class_name']
        self.students_id = data['school_classes_students_id']

    def __repr__(self) -> str:
        return f"Class(name={self.name}, id={self.id}, students_id={self.students_id})"
