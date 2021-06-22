from django.db import models
from profiles.models import UserInfo


class SingleWordQuiz(models.Model):
    """
    Model for Matching 1,2,3 with Image or Question
    """
    ques_text = models.CharField(max_length=512,null=True,blank=True)
    ques_image = models.URLField(null=True,blank=True)
    answer = models.IntegerField(default=0) # Primary - 1, Secondary - 2, Tertiary - 3
    explanation = models.CharField(max_length=512)

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
    ques_text = models.CharField(max_length=512)
    option1 = models.CharField(max_length=512)
    option2 = models.CharField(max_length=512)
    option3 = models.CharField(max_length=512)
    option4 = models.CharField(max_length=512)
    answer = models.IntegerField(default=0)
    explanation = models.CharField(max_length=512)

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
    quote = models.CharField(max_length=512)

    def __str__(self):
        quote = self.quote[:30]
        return f"{quote}"


class IdleClickerIndustry(models.Model):
    """
    Model for IdleClicker Industry
    """
    industry = models.CharField(max_length=56)
    sector = models.IntegerField(default=0)
    image = models.URLField()
    unit_industry_income = models.IntegerField(default=0)
    industry_number = models.IntegerField(default=0)
    manager_name = models.CharField(max_length=56)
    manager_cost = models.IntegerField()

    def __str__(self):
        return f"{self.industry}"[:20]


class IdleClickerParameter(models.Model):
    """
    Model for the IdleClicker User
    """
    user = models.ForeignKey(UserInfo,on_delete=models.CASCADE)
    industry = models.ForeignKey(IdleClickerIndustry,on_delete=models.CASCADE)
    unlocked = models.BooleanField(default=False) # Industry 1 is always Unlocked, Rest are Locked
    current_quantity = models.IntegerField(default=0) # Industry 1, default is 1
    last_buy_time = models.DateTimeField(auto_now=True)
    quantity_bought = models.IntegerField(default=0)
    industry_income = models.BigIntegerField(default=0)
    managed = models.BooleanField(default=False) # Buy Manager to Unlock
    next_one_buy = models.BigIntegerField(default=0)
    next_ten_buy = models.BigIntegerField(default=0)
    next_hundred_buy = models.BigIntegerField(default=0)

    def __str__(self):
        return f"User:{self.user},Industry:{self.industry}"


class SpecialModeIndustry(models.Model):
    """
    Model for Special Mode Industry
    """
    name = models.CharField(max_length=56)
    sector = models.IntegerField(default=0)
    weightage = models.DecimalField(decimal_places=2,max_digits=2)
    front_end_id = models.IntegerField(default=0)
    alert = models.CharField(max_length=56,null=True,blank=True)

    def __str__(self):
        return f"{self.name}"


class SpecialModeParameter(models.Model):
    """
    Model for Special Mode Parameters
    """
    user = models.ForeignKey(UserInfo,on_delete=models.CASCADE)
    industry = models.ForeignKey(SpecialModeIndustry,on_delete=models.CASCADE,related_name='params')
    slider1 = models.IntegerField(default=1)
    slider2 = models.IntegerField(default=1)
    slider3 = models.IntegerField(default=1)
    slider4 = models.IntegerField(default=1)

    def __str__(self):
        return f"User:{self.user},Industry:{self.industry}"
    



