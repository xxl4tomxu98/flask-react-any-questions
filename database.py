from dotenv import load_dotenv
from starter_app.models import User, Question, Answer, Comment, Vote, Tag
from starter_app import app, db
from datetime import date

load_dotenv()


with app.app_context():
    db.drop_all()
    db.create_all()

    ian = User(user_name='Ian', email='ian@aa.io',
               tags=['python', 'javascript'],
               city='Philadelphia', state="PA",
               member_since=date(2020, 6, 28),
               last_seen=date(2020, 9, 8),
               password='password', reputation=300)
    javier = User(user_name='Javier', email='javier@aa.io',
                  tags=['javascript', 'html', 'css'],
                  city='Las Vegas', state="NV",
                  member_since=date(2017, 2, 28),
                  last_seen=date(2019, 6, 28),
                  password='password', reputation=400)
    dean = User(user_name='Dean', email='dean@aa.io',
                tags=['binary-search'],
                city='Baltimore', state="MD",
                member_since=date(2010, 1, 28),
                last_seen=date(2020, 6, 28),
                password='password', reputation=500)
    angela = User(user_name='Angela', email='angela@aa.io',
                  tags=['data-structure', 'algorithm'],
                  city='Birmingham', state="AL",
                  member_since=date(1998, 5, 28),
                  last_seen=date(2020, 2, 18),
                  password='password', reputation=800)
    soonmi = User(user_name='Soon-Mi', email='soonmi@aa.io',
                  tags=['sqlAlchemy'],
                  city='Houston', state="TX",
                  member_since=date(2014, 10, 28),
                  last_seen=date(2018, 8, 22),
                  password='password', reputation=500)
    alissa = User(user_name='Alissa', email='alissa@aa.io',
                  tags=['postgresql', 'express', 'sequelize'],
                  city='New York', state="NY",
                  member_since=date(2000, 6, 28),
                  last_seen=date(2010, 6, 28),
                  password='password', reputation=600)
    julie = User(user_name='Julie', email='julie@aa.io',
                 tags=['javascript', 'heroku', 'rail'],
                 city='Santa Babara', state="CA",
                 member_since=date(2018, 1, 18),
                 last_seen=date(2019, 6, 28),
                 password='password', reputation=1200)
    demo = User(user_name='demo', email='demo@example.com',
                tags=['redux', 'react', 'hooks', 'bootstrap'],
                city='Boise', state="ID",
                member_since=date(2001, 12, 28),
                last_seen=date(2013, 6, 20),
                password='password', reputation=745)

    db.session.add(ian)
    db.session.add(javier)
    db.session.add(dean)
    db.session.add(angela)
    db.session.add(soonmi)
    db.session.add(alissa)
    db.session.add(julie)
    db.session.add(demo)
    db.session.commit()

    demo.follow(alissa)
    alissa.follow(angela)
    demo.follow(angela)
    javier.follow(soonmi)
    soonmi.follow(dean)
    soonmi.follow(ian)
    ian.follow(julie)
    julie.follow(javier)

    q1 = Question(title='want_to_ask_you', tags=['linear-algebra'],
                  user_id=1, ask_time=date(2019, 7, 20), body='balabala',
                  accepted_answer_id=0, username="ian",
                  upvote_count=0, downvote_count=0)

    q2 = Question(title='do_you_know_how', tags=['sequelize', "express"],
                  user_id=6, ask_time=date(2011, 7, 20), body='balabala',
                  accepted_answer_id=0, username="alissa",
                  upvote_count=0, downvote_count=0)

    db.session.add(q1)
    db.session.add(q2)
    alissa.bookmarked_questions.append(q1)
    angela.bookmarked_questions.append(q2)
    db.session.add(alissa)
    db.session.add(angela)

    t1 = Tag(tagname='javascript', created_at=date(2012, 8, 20),
             description='For questions regarding programming in ECMAScript (JavaScript/JS) and its various dialects/implementations (excluding ActionScript). This tag is rarely used alone but is most often associated with the tags [node.js], [jquery],[json], and [html].'
            )

    t2 = Tag(tagname='sequelize', created_at=date(2012, 1, 2),
             description='The Sequelize library provides an ORM (Object-Relational-Mapper) for Node.js, written entirely in JavaScript. Provides easy mapping for MySQL, MariaDB, SQLite, PostgreSQL and SQL Server.'
            )

    t3 = Tag(tagname='redux', created_at=date(2002, 3, 20),
             description='Redux is a predictable state container for JavaScript applications based on the Flux design pattern.'
            )

    t4 = Tag(tagname='react', created_at=date(2002, 3, 20),
             description='React is a JavaScript library for building user interfaces. It uses a declarative, component-based paradigm and aims to be both efficient and flexible.'
            )

    t5 = Tag(tagname='hooks', created_at=date(2001, 3, 15),
             description='Hooks is a new feature that allows developers to use state(s) and other React features without writing a class.'
            )

    t6 = Tag(tagname='python', created_at=date(1992, 7, 15),
             description='Python is a multi-paradigm, dynamically typed, multipurpose programming language. It is designed to be quick to learn, understand, and use, and enforce a clean and uniform syntax. Please note that Python 2 is officially out of support as of 01-01-2020. Still, for version-specific Python questions, add the [python-2.7] or [python-3.x] tag. When using a Python variant (e.g. Jython, PyPy) or library (e.g. Pandas, Numpy), please include it in the tags.'
            )

    t7 = Tag(tagname='data-structure', created_at=date(1972, 7, 15),
             description='A data structure is a way of organizing data in a fashion that allows particular properties of that data to be queried and/or updated efficiently.'
            )

    t8 = Tag(tagname='java', created_at=date(1992, 2, 15),
             description="Java is a popular high-level programming language. Use this tag when you're having problems using or understanding the language itself. This tag is rarely used alone and is most often used in conjunction with [spring], [spring-boot], [jakarta-ee], [android], [javafx], [gradle] and [maven]."
            )

    t9 = Tag(tagname='node.js', created_at=date(2012, 10, 15),
             description="Node.js is an event-based, non-blocking, asynchronous I/O runtime that uses Google's V8 JavaScript engine and libuv library. It is used for developing applications that make heavy use of the ability to run JavaScript both on the client, as well as on server side and therefore benefit from the re-usability of code and the lack of context switching."
            )

    t10 = Tag(tagname='dev-ops', created_at=date(2020, 10, 15),
              description="This tag is for programming questions about DevOps ('development' and 'operations'), which is a software development method that stresses communication, collaboration, integration, automation, and measurement of cooperation between software developers and other IT professionals."
            )

    t11 = Tag(tagname='ci-cd', created_at=date(2020, 11, 15),
              description="Continuous integration (CI) is the building and automated testing of the full software product on a frequent schedule: at least once a day, often several times a day and sometimes as often as after every check in to the version control system. (CD) A software engineering approach in which teams keep producing software in short cycles and ensure that the software can be released to production at any time."
            )


    t2.tagged_questions.append(q2)
    t8.tagged_questions.append(q1)
    db.session.add(t1)
    db.session.add(t2)
    db.session.add(t3)
    db.session.add(t4)
    db.session.add(t5)
    db.session.add(t6)
    db.session.add(t7)
    db.session.add(t8)
    db.session.add(t9)
    db.session.add(t10)
    db.session.add(t11)



    db.session.commit()
