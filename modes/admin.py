from django.contrib import admin

from .models import SingleWordQuiz,SingleWordQuizAnswer,MultipleQuiz,MultipleQuizAnswer,ChanBot,IdleClickerIndustry,IdleClickerParameter,SpecialModeIndustry,SpecialModeParameter

admin.site.register(SingleWordQuiz)
admin.site.register(SingleWordQuizAnswer)

admin.site.register(MultipleQuiz)
admin.site.register(MultipleQuizAnswer)

admin.site.register(ChanBot)

admin.site.register(IdleClickerIndustry)
admin.site.register(IdleClickerParameter)

admin.site.register(SpecialModeIndustry)
admin.site.register(SpecialModeParameter)
