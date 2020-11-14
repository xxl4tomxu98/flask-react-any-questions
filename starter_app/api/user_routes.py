from flask import Blueprint, jsonify, request
from starter_app.models import db, User, Question
from flask_login import login_required
from sqlalchemy.orm import joinedload


bp = Blueprint('users', __name__)


@bp.route('/')
def index():
    response = User.query.all()
    return {"list": [user.to_dict() for user in response]}


@bp.route("/<int:user_id>/patch", methods=["GET", "PATCH"])
@login_required
def update(user_id):
    errors = []
    user = User.query.get_or_404(user_id)
    new_user_name = request.json.get("user_name")
    new_email = request.json.get("email")
    new_city = request.json.get("city")
    new_state = request.json.get("state")
    new_tags = request.json.get("tags")
    checked_user_name = list(db.session.query(User)
                             .filter(User.user_name == new_user_name))
    checked_email = list(db.session.query(User)
                         .filter(User.email == new_email))
    if len(checked_user_name) > 0:
        errors.append('Name already exists')
    else:
        user.user_name = new_user_name
    if len(checked_email) > 0:
        errors.append('Email already exists')
    else:
        user.email = new_email
    user.city = new_city
    user.state = new_state
    user.tags = new_tags
    db.session.commit()
    if len(errors) == 0:
        return {"user": user.to_dict()}
    else:
        return {'errors': errors, "user": user.to_dict()}


@bp.route('/<int:id>')
def user_profile(id):
    user = User.query.get_or_404(id)
    return {"detail":  user.to_dict()}


@bp.route("/<int:user_id>/bookmarks")
@login_required
def bookmarks(user_id):
    user = User.query.get_or_404(user_id)
    response = user.bookmarked_questions
    return {'bookmarked': [resp.to_dict() for resp in response]}


@bp.route("/<int:user_id>/bookmarks/<int:post_id>", methods=["POST"])
@login_required
def bookmark_post(user_id, post_id):
    user = User.query.get_or_404(user_id)
    question = Question.query.get_or_404(post_id)
    user.bookmarked_questions.append(question)
    db.session.add(user)
    db.session.commit()
    return 'Question bookmarked', 200


@bp.route("/<int:user_id>/followers", methods=["GET", "POST"])
def followers(user_id):
    user = User.query.get_or_404(user_id)
    if request.method == "POST":
        if not request.is_json:
            return jsonify({"msg": "Missing JSON in request"}), 400
        follower_id = request.json.get("user_id", None)
        follower = User.query.get(follower_id)
        follower.follow(user)
        db.session.add(follower)
        db.session.commit()
        return 'follower added', 200
    else:
        response = user.list_followers()
        return {'followers': [resp.to_dict() for resp in response]}


@bp.route("/<int:user_id>/following", methods=["GET", "POST"])
def following(user_id):
    user = User.query.get_or_404(user_id)
    if request.method == "POST":
        if not request.is_json:
            return jsonify({"msg": "Missing JSON in request"}), 400
        new_followed_id = request.json.get("user_id", None)
        new_followed = User.query.get(new_followed_id)
        user.follow(new_followed)
        db.session.add(user)
        db.session.commit()
        return 'followed added', 200
    else:
        response = user.list_following()
        return {'followings': [resp.to_dict() for resp in response]}


@bp.route("/<int:user_id>/tags/<int:rest_id>", methods=["DELETE"])
@login_required
def untag_favorite(rest_id, user_id):
    user = User.query.get_or_404(user_id)
    question = Question.query.filter_by(id=rest_id)
    user.questions.clear(question)
    db.session.add(user)
    db.session.commit()
    return 'Delete worked', 200
