class Activity:
    def __init__(self, data: dict) -> None:
        self.code = data.get("code", None)
        self.event_date = data.get("event_date", None)
        self.discipline_name = data.get("discipline_name", None)
        self.grade_value = data.get("grade_value", None)
        self.lesson_type = data.get("lesson_type", None)
        self.activity_id = data.get("activity_id", None)
        self.creation_date = data.get("creation_date", None)
        self.note = data.get("note", None)
        self.creator_name = data.get("creator_name", None)

    def __repr__(self) -> str:
        return f"Activity(name={self.discipline_name}, grade={self.grade_value})"
