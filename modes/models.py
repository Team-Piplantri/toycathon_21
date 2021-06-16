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


class MultipleQuiz(models.Model):
    """
    Model for 4 Options Quiz
    """
    ques_text = models.CharField(max_length=128)
    option1 = models.CharField(max_length=56)
    option2 = models.CharField(max_length=56)
    option3 = models.CharField(max_length=56)
    option4 = models.CharField(max_length=56)
    answer = models.IntegerField(default=0)
    explanation = models.CharField(max_length=56)

    def __str__(self):
        ques = self.ques_text[:30]
        return f"Ques:{ques}"


class MultipleQuizAnswer(models.Model):
    """
    Model For storing answers of MultipleQuiz
    """
    user = models.ForeignKey(UserInfo,on_delete=models.CASCADE)
    quiz_ques = models.ForeignKey(MultipleQuiz,on_delete=models.CASCADE)
    selected_answer = models.IntegerField(default=0)

    def __str__(self):
        return f"User:{self.user}, Answer:{self.selected_answer}"


class ChanBot(models.Model):
    """
    Model for Chanakya Non-Interactive Bot
    """
    quote = models.CharField(max_length=128)

    def __str__(self):
        quote = self.quote[:30]
        return f"{quote}"