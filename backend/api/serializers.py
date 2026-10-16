from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Question, TerminalChallenge, StudentProfile, QuizAttempt, LabSubmission
User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    display_name = serializers.CharField(write_only=True, required=False, allow_blank=True)
    class Meta:
        model = User
        fields = ("username", "email", "password", "display_name")
    def create(self, validated_data):
        display_name = validated_data.pop("display_name", "")
        password = validated_data.pop("password")
        user = User.objects.create_user(password=password, **validated_data)
        StudentProfile.objects.create(user=user, display_name=display_name or user.username)
        return user

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ("id", "technology", "tier", "prompt", "options", "explanation", "source_index")

class TerminalChallengeSerializer(serializers.ModelSerializer):
    file = serializers.CharField(source="filename")
    tech = serializers.CharField(source="technology")
    starter = serializers.CharField(source="starter_code")
    class Meta:
        model = TerminalChallenge
        fields = ("id", "slug", "tech", "level", "title", "xp", "file", "language", "prompt", "requirements", "starter", "hint", "solution", "explanation")

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    level = serializers.IntegerField(read_only=True)
    accuracy = serializers.SerializerMethodField()
    class Meta:
        model = StudentProfile
        fields = ("username", "display_name", "xp", "level", "streak_days", "challenges_completed", "questions_answered", "correct_answers", "accuracy")
    def get_accuracy(self, obj):
        return round(obj.correct_answers / obj.questions_answered * 100, 1) if obj.questions_answered else 0

class QuizAnswerSerializer(serializers.Serializer):
    question_id = serializers.IntegerField()
    selected_answer = serializers.CharField()

class LabSubmitSerializer(serializers.Serializer):
    challenge_id = serializers.IntegerField()
    code = serializers.CharField(allow_blank=True)
