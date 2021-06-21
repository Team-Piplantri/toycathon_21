from django.contrib import admin

from .models import SingleWordQuiz,SingleWordQuizAnswer,MultipleQuiz,MultipleQuizAnswer,ChanBot,IdleClickerIndustry,IdleClickerParameter

admin.site.register(SingleWordQuiz)
admin.site.register(SingleWordQuizAnswer)

admin.site.register(MultipleQuiz)
admin.site.register(MultipleQuizAnswer)

admin.site.register(ChanBot)

admin.site.register(IdleClickerIndustry)
admin.site.register(IdleClickerParameter)

