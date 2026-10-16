from django.conf import settings
from django.db import models

class Question(models.Model):
    TECHNOLOGIES = [(x, x) for x in ("Linux", "AWS", "Docker", "Kubernetes")]
    TIERS = [(x, x) for x in ("Beginner", "Intermediate", "Advanced")]
    technology = models.CharField(max_length=30, choices=TECHNOLOGIES, db_index=True)
    tier = models.CharField(max_length=20, choices=TIERS, db_index=True)
    prompt = models.TextField()
    answer = models.TextField()
    options = models.JSONField(default=list)
    explanation = models.TextField(blank=True)
    source_index = models.PositiveIntegerField(default=0)
    active = models.BooleanField(default=True)
    class Meta:
        ordering = ["technology", "tier", "source_index"]
    def __str__(self):
        return f"{self.technology}/{self.tier}: {self.prompt[:60]}"

class TerminalChallenge(models.Model):
    technology = models.CharField(max_length=50, db_index=True)
    level = models.CharField(max_length=20, default="Beginner", db_index=True)
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=100, unique=True)
    xp = models.PositiveIntegerField(default=100)
    filename = models.CharField(max_length=100, blank=True)
    language = models.CharField(max_length=30, default="text")
    prompt = models.TextField()
    requirements = models.JSONField(default=list)
    starter_code = models.TextField(blank=True)
    hint = models.TextField(blank=True)
    solution = models.TextField()
    explanation = models.TextField(blank=True)
    active = models.BooleanField(default=True)
    def __str__(self):
        return self.title

class StudentProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="codeclash_profile")
    display_name = models.CharField(max_length=100, blank=True)
    xp = models.PositiveIntegerField(default=0)
    streak_days = models.PositiveIntegerField(default=0)
    challenges_completed = models.PositiveIntegerField(default=0)
    questions_answered = models.PositiveIntegerField(default=0)
    correct_answers = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    @property
    def level(self):
        return max(1, self.xp // 500 + 1)

class QuizAttempt(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="quiz_attempts")
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    selected_answer = models.TextField()
    is_correct = models.BooleanField()
    xp_awarded = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ["-created_at"]

class LabSubmission(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="lab_submissions")
    challenge = models.ForeignKey(TerminalChallenge, on_delete=models.CASCADE)
    submitted_code = models.TextField()
    passed = models.BooleanField(default=False)
    score = models.PositiveIntegerField(default=0)
    feedback = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ["-created_at"]
