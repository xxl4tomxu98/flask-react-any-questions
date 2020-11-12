from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()

bookmarks = db.Table(
    'bookmarks',
    db.Model.metadata,
    db.Column(
        'user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True
    ), db.Column('question_id', db.Integer,
                 db.ForeignKey('questions.id'), primary_key=True)
)


poststags = db.Table(
    'poststags',
    db.Model.metadata,
    db.Column(
        'tag_id', db.Integer, db.ForeignKey('tags.id'), primary_key=True
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
    posts_count = db.Column(db.Integer, nullable=True, default=0)
    answer_count = db.Column(db.Integer, nullable=True, default=0)
    comment_count = db.Column(db.Integer, nullable=True, default=0)
    member_since = db.Column(db.DateTime(timezone=True),
                             default=datetime.utcnow)
    last_seen = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)
    reputation = db.Column(db.Integer, nullable=True)
    hashed_password = db.Column(db.String(100), nullable=False)

    questions = db.relationship("Question", backref='user', lazy=True)
    bookmarked_questions = db.relationship('Question', secondary='bookmarks')
    # followed = db.relationship('Follow',
    #                            db.ForeignKey('follows.follower_id'),
    #                            backref=db.backref('follower', lazy='joined'),
    #                            lazy='dynamic',
    #                            cascade='all, delete-orphan')
    # followers = db.relationship('Follow',
    #                             db.ForeignKey('follows.followed_id'),
    #                             backref=db.backref('followed', lazy='joined'),
    #                             lazy='dynamic',
    #                             cascade='all, delete-orphan')
    answers = db.relationship('Answer', backref='user', lazy=True)
    comments = db.relationship('Comment', backref='user', lazy=True)
    votes = db.relationship('Vote', lazy='dynamic',
                            cascade='all, delete-orphan')

    @property
    def posts_count(self):
        return len(self.questions)

    @property
    def answer_count(self):
        return len(self.answers)

    @property
    def comment_count(self):
        return len(self.comments)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    # def follow(self, user):
    #     if not self.is_following(user):
    #         f = Follow(follower=self, followed=user)
    #         db.session.add(f)

    # def unfollow(self, user):
    #     f = self.followed.filter_by(followed_id=user.id).first()
    #     if f:
    #         db.session.delete(f)

    # def is_following(self, user):
    #     return self.followed.filter_by(
    #             followed_id=user.id).first() is not None

    # def is_followed_by(self, user):
    #     return self.followers.filter_by(
    #             follower_id=user.id).first() is not None

    def to_dict(self):
        return {
          "id": self.id,
          "user_name": self.user_name,
          "email": self.email,
          "city": self.city,
          "state": self.state,
          "tags": self.tags,
          "posts_count": self.posts_count,
          "answer_count": self.answer_count,
          "comment_count": self.comment_count,
          "member_since": self.member_since,
          "last_seen": self.last_seen,
          "reputation": self.reputation,
          "hashed_password": self.hashed_password,
        }


class Question(db.Model):

    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    tags = db.Column(db.ARRAY(db.String(100)), nullable=False)
    title = db.Column(db.String(150), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    username = db.Column(db.String(40), nullable=False,
                         default='demo')
    ask_time = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)
    body = db.Column(db.Text, nullable=False)
    answer_count = db.Column(db.Integer, nullable=True, default=0)
    comment_count = db.Column(db.Integer, nullable=True, default=0)
    accepted_answer_id = db.Column(db.Integer, nullable=True)
    upvote_count = db.Column(db.Integer, nullable=True, default=0)
    downvote_count = db.Column(db.Integer, nullable=True, default=0)

    answers = db.relationship('Answer', backref='question', lazy=True)
    comments = db.relationship('Comment',
                               backref='question', lazy=True)
    question_tags = db.relationship('Tag', back_populates="tagged_questions",
                                    secondary='poststags')

    @property
    def answer_count(self):
        return len(self.answers)

    @property
    def comment_count(self):
        return len(self.comments)

    def to_dict(self):
        return {
            "id": self.id,
            "tags": self.tags,
            "title": self.title,
            "user_id": self.user_id,
            "username": self.username,
            "ask_time": self.ask_time,
            "body": self.body,
            "answer_count": self.answer_count,
            "comment_count": self.comment_count,
            "accepted_answer_id": self.accepted_answer_id,
            "upvote_count": self.upvote_count,
            "downvote_count": self.downvote_count,
        }


class Answer(db.Model):

    __tablename__ = 'answers'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    username = db.Column(db.String(40), nullable=False,
                         default='demo')
    question_id = db.Column(db.Integer,
                            db.ForeignKey('questions.id'), nullable=False)
    answer_time = db.Column(db.DateTime(timezone=True),
                            default=datetime.utcnow)
    content = db.Column(db.Text, nullable=False)
    upvote_count = db.Column(db.Integer, nullable=True, default=0)
    downvote_count = db.Column(db.Integer, nullable=True, default=0)
    ranking = db.Column(db.Float, index=True, default=0)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "username": self.username,
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
    username = db.Column(db.String(40), nullable=False,
                         default='demo')
    description = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "comment_time": self.comment_time,
            "question_id": self.question_id,
            "user_id": self.user_id,
            "username": self.username,
            "description": self.description
        }


class Tag(db.Model):

    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    tagname = db.Column(db.String(30), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)
    description = db.Column(db.Text, nullable=False)
    posts_count = db.Column(db.Integer, nullable=True, default=0)
    tagged_questions = db.relationship('Question',
                                       back_populates='question_tags',
                                       secondary='poststags')

    @property
    def posts_count(self):
        return len(self.tagged_questions)

    def to_dict(self):
        return {
            "id": self.id,
            "tagname": self.tagname,
            "created_at": self.created_at,
            "description": self.description,
            "posts_count": self.posts_count,
        }


class Follow(db.Model):
    __tablename__ = 'follows'
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'),
                            primary_key=True)
    followed_id = db.Column(db.Integer, db.ForeignKey('users.id'),
                            primary_key=True)
    follow_time = db.Column(db.DateTime(timezone=True),
                            default=datetime.utcnow)

    def to_dict(self):
        return {
            "follower_id": self.follower_id,
            "followed_id": self.followed_id,
            "follow_time": self.follow_time,
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
