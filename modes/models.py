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


class IdleClickerIndustry(models.Model):
    industry = models.CharField(max_length=56)
    sector = models.IntegerField(default=0)
    image = models.URLField()
    industry_number = models.IntegerField(default=0)
    manager_name = models.CharField(max_length=56)
    manager_cost = models.IntegerField()


class IdleClickerParameter(models.Model):
    user = models.ForeignKey(UserInfo,on_delete=models.CASCADE)
    industry = models.ForeignKey(IdleClickerIndustry,on_delete=models.CASCADE)
    unlocked = models.BooleanField(default=False) # Industry 1 is always Unlocked, Rest are Locked
    current_quantity = models.IntegerField(default=0) # Industry 1, default is 1
    last_buy_time = models.DateTimeField()
    quantity_bought = models.IntegerField()
    industry_income = models.BigIntegerField()
    managed = models.BooleanField(default=False) # Buy Manager to Unlock
    next_one_buy = models.BigIntegerField()
    next_ten_buy = models.BigIntegerField()
    next_hundred_buy = models.BigIntegerField()




