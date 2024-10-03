class Lesson:
    def __init__(self, data: dict):
        self.number = data.get("lesson_number", None)
        self.timetable_id = data.get("timetableid", None)
        self.time_from = data.get("time_from", None)
        self.time_to = data.get("time_to", None)
        self.discipline = data.get("discipline", None)
        self.teacher = data.get("teacher", None)
        self.notes = data.get("notes", None)
        self.theme = self.theme = None if data.get("theme", None) == "" else data.get("theme", None)
        self.last_changes: str = data.get("last_changes", None)
        self.classroom = data.get("classroom", None)

    def __repr__(self):
        return (f"Lesson(number={self.number}, discipline={self.discipline}, teacher={self.teacher}, classroom={self.classroom}), theme={self.theme}, last_changes={self.last_changes})")
