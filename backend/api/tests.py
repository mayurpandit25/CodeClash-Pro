from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from .models import Question, TerminalChallenge, StudentProfile
from .validation import validate_submission

class CodeClashApiTests(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(username="student", password="StrongPassword123!")
        StudentProfile.objects.create(user=self.user, display_name="Student")
        self.client = APIClient()
        self.client.force_authenticate(self.user)
        self.question = Question.objects.create(technology="Linux", tier="Beginner", prompt="pwd?", answer="pwd", options=["pwd","ls","cd","cat"], explanation="pwd prints current directory.")
        self.challenge = TerminalChallenge.objects.create(
            technology="Kubernetes manifests", level="Beginner", title="Tiny deployment", slug="tiny-deployment",
            prompt="Create deployment", requirements=["replicas set to 3"], solution="replicas: 3", starter_code="")
    def test_question_list_filter(self):
        response = self.client.get("/api/questions/?technology=Linux&tier=Beginner")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["count"], 1)
    def test_correct_answer_awards_xp(self):
        response = self.client.post("/api/quiz/answer/", {"question_id": self.question.id, "selected_answer": "pwd"}, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data["correct"])
        self.assertEqual(response.data["xp_awarded"], 100)
    def test_lab_submission_is_not_executed(self):
        result = validate_submission(self.challenge, "replicas: 3")
        self.assertFalse(result["code_executed"])
        self.assertTrue(result["passed"])
