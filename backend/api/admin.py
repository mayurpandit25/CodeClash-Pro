from django.contrib import admin
from .models import Question, TerminalChallenge, StudentProfile, QuizAttempt, LabSubmission
@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ("technology", "tier", "prompt", "active")
    list_filter = ("technology", "tier", "active")
    search_fields = ("prompt", "answer")
@admin.register(TerminalChallenge)
class TerminalChallengeAdmin(admin.ModelAdmin):
    list_display = ("title", "technology", "level", "xp", "active")
    list_filter = ("technology", "level", "active")
    search_fields = ("title", "prompt")
admin.site.register(StudentProfile)
admin.site.register(QuizAttempt)
admin.site.register(LabSubmission)
