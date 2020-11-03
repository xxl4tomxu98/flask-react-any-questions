from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()

favorites = db.Table(
    'favorites',
    db.Model.metadata,
    db.Column(
        'user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True
    ), db.Column('question_id', db.Integer,
                 db.ForeignKey('questions.id'), primary_key=True)
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    city = db.Column(db.String(40), nullable=False)
    state = db.Column(db.String(40), nullable=False)
    tags = db.Column(db.ARRAY(db.String(100)), nullable=False)
    member_since = db.Column(db.DateTime(timezone=True),
                             default=datetime.utcnow)
    last_seen = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)
    reputation = db.Column(db.Integer, nullable=True)
    hashed_password = db.Column(db.String(100), nullable=False)

    questions = db.relationship('Question', backref='user', lazy=True)
    answers = db.relationship('Answer', backref='user', lazy=True)
    comments = db.relationship('Comment', backref='user', lazy=True)
    votes = db.relationship('Vote', lazy='dynamic',
                            cascade='all, delete-orphan')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
          "id": self.id,
          "user_name": self.user_name,
          "email": self.email,
          "city": self.city,
          "state": self.state,
          "tags": self.tags,
          "member_since": self.member_since,
          "last_seen": self.last_seen,
          "reputation": self.reputation,
          "hashed_password": self.hashed_password,
        }


class Question(db.Model):

    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    tags = db.Column(db.String(100), nullable=False)
    title = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    ask_time = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)
    detail = db.Column(db.Text, nullable=False)
    answer_count = db.Column(db.Integer, nullable=True)
    accepted_answer_id = db.Column(db.Integer, nullable=True)
    catagory = db.Column(db.String(50), nullable=False)

    answers = db.relationship('Answer', backref='question', lazy=True)
    comments = db.relationship('Comment',
                               backref='question', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "tags": self.tags,
            "title": self.title,
            "user_id": self.user_id,
            "ask_time": self.ask_time,
            "detail": self.detail,
            "answer_count": self.answer_count,
            "accepted_answer_id": self.accepted_answer_id,
            'catagory': self.catagory,
        }


class Answer(db.Model):

    __tablename__ = 'answers'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    question_id = db.Column(db.Integer,
                            db.ForeignKey('questions.id'), nullable=False)
    answer_time = db.Column(db.DateTime(timezone=True),
                            default=datetime.utcnow)
    content = db.Column(db.Text, nullable=False)
    upvote_count = db.Column(db.Integer, nullable=True)
    downvote_count = db.Column(db.Integer, nullable=True)
    ranking = db.Column(db.Float, index=True, default=0)

    comments = db.relationship('Comment', backref='answer', lazy='dynamic')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "question_id": self.question_id,
            "answer_time": self.answer_time,
            "content": self.content,
            "upvote_count": self.upvote_count,
            "downvote_count": self.downvote_count,
            'ranking': self.ranking
        }


class Vote(db.Model):

    __tablename__ = 'votes'

    id = db.Column(db.Integer, primary_key=True)
    vote_time = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    answer_id = db.Column(db.Integer,
                          db.ForeignKey('answers.id'), nullable=False)
    type = db.Column(db.Boolean, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "vote_time": self.vote_time,
            "user_id": self.user_id,
            "answer_id": self.answer_id,
            "type": self.type
        }


class Comment(db.Model):

    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    comment_time = db.Column(db.DateTime(timezone=True),
                             default=datetime.utcnow)
    question_id = db.Column(db.Integer,
                            db.ForeignKey('questions.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    answer_id = db.Column(db.Integer,
                          db.ForeignKey('answers.id'), nullable=False)
    description = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "comment_time": self.comment_time,
            "question_id": self.question_id,
            "user_id": self.user_id,
            "answer_id": self.answer_id,
            "description": self.description
        }


def generate_ranking(upvotes, downvotes):
    n = upvotes + downvotes
    if n == 0:
        return 0
    p = upvotes / n
    z = 1.96
    denominator = 1 + (1 / n) * z ** 2
    radicand = p / n * (1 - p) + z ** 2 / (4 * n ** 2)
    numerator = p + z ** 2 / (2 * n)
    numerator -= z * math.sqrt(radicand)
    ranking = numerator / denominator
    return ranking
