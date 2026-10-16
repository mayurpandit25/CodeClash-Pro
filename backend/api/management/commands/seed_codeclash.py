import json
from pathlib import Path
from django.core.management.base import BaseCommand
from api.models import Question, TerminalChallenge

class Command(BaseCommand):
    help = "Import the 400 frontend questions and 44 Terminal Lab challenges."
    def handle(self, *args, **options):
        data_path = Path(__file__).resolve().parents[3] / "seed_data.json"
        data = json.loads(data_path.read_text(encoding="utf-8"))
        q_created = 0
        for technology, tiers in data["questionBank"].items():
            for tier, questions in tiers.items():
                for idx, q in enumerate(questions, start=1):
                    obj, created = Question.objects.update_or_create(
                        technology=technology, tier=tier, source_index=idx,
                        defaults={"prompt": q["prompt"], "answer": q["answer"],
                                  "options": q["options"], "explanation": q.get("explanation", ""), "active": True})
                    q_created += int(created)
        c_created = 0
        for c in data["terminalChallenges"]:
            slug = c["id"]
            requirements = c.get("requirements", [])
            obj, created = TerminalChallenge.objects.update_or_create(
                slug=slug,
                defaults={"technology": c.get("tech", "General"), "level": c.get("level", "Beginner"),
                          "title": c["title"], "xp": c.get("xp", 100), "filename": c.get("file", ""),
                          "language": c.get("language", "text"), "prompt": c.get("prompt", ""),
                          "requirements": requirements, "starter_code": c.get("starter", ""),
                          "hint": c.get("hint", ""), "solution": c.get("solution", ""),
                          "explanation": c.get("explanation", ""), "active": True})
            c_created += int(created)
        self.stdout.write(self.style.SUCCESS(
            f"Seed complete. New questions: {q_created}; new labs: {c_created}. Existing rows were updated where keys matched."))
