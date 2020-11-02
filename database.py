from dotenv import load_dotenv
from starter_app.models import User, Question, Answer, Comment, Vote, favorites
from starter_app import app, db
from datetime import date

load_dotenv()


with app.app_context():
    db.drop_all()
    db.create_all()
    ian = User(user_name='Ian', email='ian@aa.io', tags='python',
               city='Philadelphia', state="PA",
               member_since=date(2020, 6, 28),
               last_seen=date(2020, 9, 8), password='password', points=300)
    javier = User(user_name='Javier', email='javier@aa.io',
                  tags='javascript',
                  city='Las Vegas', state="NV",
                  member_since=date(2017, 2, 28),
                  last_seen=date(2019, 6, 28), password='password', points=400)
    dean = User(user_name='Dean', email='dean@aa.io',
                tags='binary_search',
                city='Baltimore', state="MD",
                member_since=date(2010, 1, 28),
                last_seen=date(2020, 6, 28), password='password', points=500)
    angela = User(user_name='Angela', email='angela@aa.io',
                  tags='data_structure',
                  city='Birmingham', state="AL",
                  member_since=date(1998, 5, 28),
                  last_seen=date(2020, 2, 18), password='password', points=800)
    soonmi = User(user_name='Soon-Mi', email='soonmi@aa.io',
                  tags='sqlAlchemy',
                  city='Houston', state="TX",
                  member_since=date(2014, 10, 28),
                  last_seen=date(2018, 8, 22), password='password', points=500)
    alissa = User(user_name='Alissa', email='alissa@aa.io',
                  tags='postgresql',
                  city='New York', state="NY",
                  member_since=date(2000, 6, 28),
                  last_seen=date(2010, 6, 28), password='password', points=600)
    demo = User(user_name='demo', email='demo@example.com',
                tags='redux',
                city='Boise', state="ID",
                member_since=date(2001, 12, 28),
                last_seen=date(2013, 6, 20), password='password', points=745)

    db.session.add(ian)
    db.session.add(javier)
    db.session.add(dean)
    db.session.add(angela)
    db.session.add(soonmi)
    db.session.add(alissa)
    db.session.add(demo)

    db.session.commit()
