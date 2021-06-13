from django.db import models
from profiles.models import UserInfo


class SingleWordQuiz(models.Model):
    """
    Model for Matching 1,2,3 with Image or Question
    """
    ques_text = models.CharField(max_length=128,null=True,blank=True)
    ques_image = models.URLField(null=True,blank=True)
    answer = models.IntegerField(default=0) # Primary - 1, Secondary - 2, Tertiary - 3
    explanation = models.CharField(max_length=128)

    def __str__(self):
        return f"Answer:{self.answer}, ID:{self.id}"


class SingleWordQuizAnswer(models.Model):
    """
    Model for Storing Answers
    """
    user = models.ForeignKey(UserInfo,on_delete=models.CASCADE)
    quiz_ques = models.ForeignKey(SingleWordQuiz,on_delete=models.CASCADE)
    selected_answer = models.IntegerField(default=0)

    def __str__(self):
        return f"User:{self.user}, Answer:{self.selected_answer}"
