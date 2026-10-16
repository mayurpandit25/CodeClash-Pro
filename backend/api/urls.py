from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, csrf_view, login_view, logout_view, me_view, QuestionViewSet, TerminalChallengeViewSet, answer_question, submit_lab, analytics_view, health_view
router = DefaultRouter()
router.register("questions", QuestionViewSet, basename="question")
router.register("terminal-challenges", TerminalChallengeViewSet, basename="terminal-challenge")
urlpatterns = [
    path("health/", health_view),
    path("auth/register/", RegisterView.as_view()),
    path("auth/csrf/", csrf_view),
    path("auth/login/", login_view),
    path("auth/logout/", logout_view),
    path("auth/me/", me_view),
    path("quiz/answer/", answer_question),
    path("terminal/submit/", submit_lab),
    path("analytics/", analytics_view),
    path("", include(router.urls)),
]
