from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from sqlalchemy import or_
from starter_app.models import db, User, Question, Tag, Comment, Answer, Vote
from sqlalchemy.orm import joinedload

bp = Blueprint("main", __name__)


@bp.route('/', methods=["POST"])
def search():
    key = request.get_json()["term"]
    search_args = [col.ilike('%%%s%%' % key) for col in
                   [Restaurant.name, Restaurant.address,
                    Restaurant.city, Restaurant.state]]
    questions = Restaurant.query.filter(or_(*search_args)).order_by(
                    Restaurant.avg_rating.desc()).all()
    return {'questions': [qust.to_dict() for qust in questions]}


@bp.route('/posts', methods=["POST"])
@login_required
def post_question():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    user_id = current_user.id
    title = request.json.get("title", None)
    body = request.json.get("body", None)
    tags = request.json.get("tags", None)
    user = User.query.get_or_404(user_id)
    username = user.user_name
    if not body or not tags:
        return {"errors": ["Please write question body and tags"]}, 400
    new_question = Question(user_id=user_id, username=username,
                            title=title, body=body, tags=tags)
    db.session.add(new_question)
    db.session.commit()
    return {'list': new_question.to_dict()}, 200


@bp.route('/posts')
def get_questions():
    response = Question.query.all()
    return {'list': [ques.to_dict() for ques in response]}


@bp.route('/tags')
def get_tags():
    response = Tag.query.all()
    return {'list': [tag.to_dict() for tag in response]}


@bp.route('/tags/<tagname>')
def get_tag(tagname):
    tag = Tag.query.filter(Tag.tagname == tagname).first()
    if not tag:
        return {"errors": ["Invalid tag requested"]}, 401
    return {'detail': tag.to_dict()}


@bp.route('posts/tag/<tagname>')
def get_tagPosts(tagname):
    tag = Tag.query.filter_by(tagname=tagname).first()
    response = tag.tagged_questions
    return {'tagPosts': [post.to_dict() for post in response]}


@bp.route("/tags/<int:tag_id>/posts/<int:post_id>")
@login_required
def tag_post(tag_id, post_id):

    quest = Question.query.get_or_404(post_id)
    tag = Tag.query.get_or_404(tag_id)
    if not tag:
        return {"errors": ["Invalid tag requested"]}, 401
    tag.tagged_questions.append(quest)
    db.session.add(tag)
    db.session.commit()
    return {'tagPosts': quest.to_dict()}, 200


@bp.route('/posts/<int:id>')
def get_question(id):
    quest = Question.query.get_or_404(id)
    if not quest:
        return {"errors": ["Invalid question requested"]}, 401
    return {'post': quest.to_dict()}


@bp.route('/posts/<int:id>/comments', methods=["POST"])
@login_required
def create_comment(id):
    question_id = id
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    user_id = current_user.id
    username = User.query.get_or_404(user_id).user_name
    description = request.json.get("description", None)
    if not description:
        return {"errors": ["Please write comment body."]}, 400
    new_comment = Comment(user_id=user_id, description=description,
                          username=username, question_id=question_id)
    db.session.add(new_comment)
    db.session.commit()
    return {'comment': new_comment.to_dict()}, 200


@bp.route('/posts/<int:id>/comments')
def get_comments(id):
    question_id = id
    response = Comment.query.filter_by(question_id=question_id).all()
    return {'list': [comm.to_dict() for comm in response]}


@bp.route('/posts/<int:id>/answers', methods=["POST"])
@login_required
def answers(id):
    question_id = id
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    user_id = current_user.id
    username = User.query.get_or_404(user_id).user_name
    content = request.json.get("content", None)
    if not content:
        return {"errors": ["Please write answer body."]}, 400
    new_answer = Answer(user_id=user_id, content=content,
                        username=username, question_id=question_id)
    db.session.add(new_answer)
    db.session.commit()
    return {'answer': new_answer.to_dict()}, 200


@bp.route('/posts/<int:id>/answers')
def get_answers(id):
    question_id = id
    response = Answer.query.filter_by(question_id=question_id).all()
    return {'list': [answ.to_dict() for answ in response]}


@login_required
@bp.route('/posts/<int:postId>', methods=["DELETE"])
def del_post(postId):
    post = Question.query.get_or_404(postId)
    if post:
        db.session.delete(post)
        db.session.commit()
        return {}, 200
    return {}, 404


@login_required
@bp.route('/posts/<int:postId>/comments/<int:commentId>',
          methods=["DELETE"])
def del_comment(postId, commentId):
    comment = Comment.query.filter_by(id=commentId, question_id=postId).first()
    if comment:
        db.session.delete(comment)
        db.session.commit()
        return {}, 200
    return {}, 404


@login_required
@bp.route('/posts/<int:postId>/answers/<int:answerId>',
          methods=["DELETE"])
def del_answer(postId, answerId):
    answer = Answer.query.filter_by(id=answerId, question_id=postId).first()
    if answer:
        db.session.delete(answer)
        db.session.commit()
        return {}, 200
    return {}, 404


@bp.route('/answers/<int:answer_id>/<string:type>', methods=["POST"])
@login_required
def vote_answer(answer_id, type):
    user_id = current_user.id
    user = User.query.get_or_404(user_id)
    answer = Answer.query.get_or_404(answer_id)
    user.vote(answer, type)
    return {}, 200


@bp.route('/answers/<int:answer_id>/<string:type>', methods=["DELETE"])
@login_required
def unvote_answer(answer_id, type):
    user_id = current_user.id
    user = User.query.get_or_404(user_id)
    answer = Answer.query.get_or_404(answer_id)
    user.unvote(answer, type)
    return {}, 200
