## A digital interactive web app for participation in toycathon'21

**Local Setup**
---
*Requirements:- Python 3.8+ and npm*<br>
1) `git clone https://github.com/Team-Piplantri/toycathon-2021`
(For Contrituber: Use your Forked URL) 
2) `cd toycathon-2021`
3) `python -m venv env`
4) `source env/bin/activate` (Mac/Linux)<br>
   `env/Scripts/activate.ps1` (Windows-Powershell)
5) `pip install -r requirements.txt`
6) `cd react-client`
7) `npm install`
8) `npm build`

Start Development Server<br>
---
Running Django Server (With React-Client)
1) `source env/bin/activate` (Mac/Linux)<br>
   `env/Scripts/activate.ps1` (Windows-Powershell)
2) `python manage.py runserver`

Running Only React-Client<br>
---
1) `cd react-client`
2) `npm start`


#### Development Commits Must be made in Development Branch

