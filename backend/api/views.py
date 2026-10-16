from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import get_user_model
from django.db.models import Count, Avg
from rest_framework import generics, permissions, status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from .models import Question, TerminalChallenge, StudentProfile, QuizAttempt, LabSubmission
from .serializers import RegisterSerializer, QuestionSerializer, TerminalChallengeSerializer, ProfileSerializer, QuizAnswerSerializer, LabSubmitSerializer
from .validation import validate_submission
User = get_user_model()

def ensure_profile(user):
    profile, _ = StudentProfile.objects.get_or_create(user=user, defaults={"display_name": user.username})
    return profile

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

@api_view(["GET"])
@permission_classes([permissions.AllowAny])
@ensure_csrf_cookie
def csrf_view(request):
    return Response({"detail": "CSRF cookie set."})

@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def login_view(request):
    username = request.data.get("username", "").strip()
    password = request.data.get("password", "")
    user = authenticate(request, username=username, password=password)
    if not user and "@" in username:
        matched_user = User.objects.filter(email__iexact=username).first()
        if matched_user:
            user = authenticate(request, username=matched_user.username, password=password)
    if not user:
        return Response({"detail": "Invalid username or password."}, status=status.HTTP_400_BAD_REQUEST)
    login(request, user)
    ensure_profile(user)
    return Response({"username": user.username, "detail": "Logged in. Session cookie authentication is active."})

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout_view(request):
    logout(request)
    return Response({"detail": "Logged out."})

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me_view(request):
    profile = ensure_profile(request.user)
    return Response(ProfileSerializer(profile).data)

class QuestionViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = QuestionSerializer
    permission_classes = [permissions.AllowAny]
    def get_queryset(self):
        qs = Question.objects.filter(active=True)
        tech = self.request.query_params.get("technology")
        tier = self.request.query_params.get("tier")
        if tech: qs = qs.filter(technology__iexact=tech)
        if tier: qs = qs.filter(tier__iexact=tier)
        return qs

class TerminalChallengeViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TerminalChallengeSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"
    def get_queryset(self):
        qs = TerminalChallenge.objects.filter(active=True)
        tech = self.request.query_params.get("technology")
        level = self.request.query_params.get("level")
        if tech: qs = qs.filter(technology__icontains=tech)
        if level: qs = qs.filter(level__iexact=level)
        return qs

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def answer_question(request):
    serializer = QuizAnswerSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    question = generics.get_object_or_404(Question, pk=serializer.validated_data["question_id"], active=True)
    selected = serializer.validated_data["selected_answer"]
    correct = selected.strip().casefold() == question.answer.strip().casefold()
    xp = 100 if correct else 0
    QuizAttempt.objects.create(user=request.user, question=question, selected_answer=selected, is_correct=correct, xp_awarded=xp)
    profile = ensure_profile(request.user)
    profile.questions_answered += 1
    if correct:
        profile.correct_answers += 1
        profile.xp += xp
    profile.save()
    return Response({"correct": correct, "correct_answer": question.answer, "explanation": question.explanation, "xp_awarded": xp, "profile": ProfileSerializer(profile).data})

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def submit_lab(request):
    serializer = LabSubmitSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    challenge = generics.get_object_or_404(TerminalChallenge, pk=serializer.validated_data["challenge_id"], active=True)
    code = serializer.validated_data["code"]
    result = validate_submission(challenge, code)
    xp = challenge.xp if result["passed"] else 0
    LabSubmission.objects.create(user=request.user, challenge=challenge, submitted_code=code, passed=result["passed"], score=result["score"], feedback=result)
    profile = ensure_profile(request.user)
    if result["passed"]:
        profile.xp += xp
        profile.challenges_completed += 1
        profile.save()
    result["xp_awarded"] = xp
    result["profile"] = ProfileSerializer(profile).data
    return Response(result)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def analytics_view(request):
    profile = ensure_profile(request.user)
    attempts = QuizAttempt.objects.filter(user=request.user)
    per_tech = []
    for tech in ("Linux", "AWS", "Docker", "Kubernetes"):
        items = attempts.filter(question__technology=tech)
        total = items.count()
        correct = items.filter(is_correct=True).count()
        per_tech.append({"technology": tech, "attempts": total, "correct": correct,
                         "accuracy": round(correct/total*100, 1) if total else 0})
    recent = list(QuizAttempt.objects.filter(user=request.user).select_related("question")[:10].values(
        "question__technology", "question__tier", "is_correct", "xp_awarded", "created_at"))
    labs = LabSubmission.objects.filter(user=request.user)
    return Response({
        "profile": ProfileSerializer(profile).data,
        "technology_breakdown": per_tech,
        "quiz_attempts": attempts.count(),
        "quiz_accuracy": round(attempts.filter(is_correct=True).count()/attempts.count()*100, 1) if attempts.exists() else 0,
        "lab_submissions": labs.count(),
        "labs_passed": labs.filter(passed=True).count(),
        "recent_attempts": recent,
    })

@api_view(["GET"])
def health_view(request):
    return Response({"status": "ok", "service": "CodeClash API", "database": "configured"})
