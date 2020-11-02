from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from sqlalchemy import or_
from starter_app.models import db, User, Question
from sqlalchemy.orm import joinedload

bp = Blueprint("home", __name__)


@bp.route('/', methods=["POST"])
def search():
    key = request.get_json()["term"]
    search_args = [col.ilike('%%%s%%' % key) for col in
                   [Restaurant.name, Restaurant.address,
                    Restaurant.city, Restaurant.state]]
    restaurants = Restaurant.query.filter(or_(*search_args)).order_by(
                    Restaurant.avg_rating.desc()).all()
    return {'restaurants': [rest.to_dict() for rest in restaurants]}





@login_required
@bp.route('/questions/<int:ques_id>', methods=["GET", "POST"])
def ask_question(qust_id):
    qust = Question.query.get(qust_id)
    if not qust:
        return {"errors": ["Invalid question requested"]}, 401
    if request.method == "POST":
        if not request.is_json:
            return jsonify({"msg": "Missing JSON in request"}), 400
        content = request.json.get("content", None)
        tag = request.json.get("tag", None)
        time = request.json.get("time", None)
        if not content or not tag:
            return {"errors": ["Please fill out question and tag"]}, 400
        new_question = Question(ques_id=qust_id, user_id=current_user.id,
                                content=content, tag=tag, time=time)
        db.session.add(new_question)
        db.session.commit()
    response = Question.query.filter_by(id=qust_id).all()
    return {'questions': [question.to_dict() for question in response]}


@login_required
@bp.route('/restaurant/reserve', methods=["GET", "POST"])
def reserveRes():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    user_id = request.json.get("user_id", None)
    restaurant_id = request.json.get("restaurant_id", None)
    group_num = request.json.get("group_num", None)
    start_time = request.json.get("start_time", None)
    newReserve = Reservation(user_id=user_id, restaurant_id=restaurant_id,
                             group_num=group_num, start_time=start_time)
    db.session.add(newReserve)
    db.session.commit()
    return {'reservation': newReserve.to_dict()}, 200


@bp.route('/restaurant/reservationlist/<int:user_id>')
def reservationlist(user_id):

    response = db.session.query(Reservation) \
                      .options(joinedload(Reservation.restaurant)) \
                      .filter(Reservation.user_id == user_id)
    return {'reservation': [reservation.to_dict() for reservation in response]}


@bp.route('/restaurant/review/<int:restaurant_id>')
def reviewlist(restaurant_id):

    response = db.session.query(Review) \
                      .options(joinedload(Review.user)) \
                      .filter(Review.restaurant_id == restaurant_id)
    return {'reservation': [reservation.to_dict() for reservation in response]}


@login_required
@bp.route('/restaurant/reservationcancel/<int:reserv_id>', methods=["DELETE", "GET"])
def reservationcancel(reserv_id):
    reserv = Reservation.query.filter(Reservation.id == reserv_id).first()
    if reserv:
        db.session.delete(reserv)
        db.session.commit()
        return {}, 200
    return {}, 404


@login_required
@bp.route('/restaurant/setpoint/<int:user_id>', methods=["PATCH"])
def earnpoint(user_id):
    user = User.query.filter(User.id == user_id).first()
    set_point = request.json.get("set_point", None)
    if user:
        user.points = User.points + set_point
        db.session.commit()
        return {"user": user.to_dict()}, 200
    return {}, 404



@bp.route('/reviews/<int:rev_id>')
def rev(rev_id):

    response = User.query.filter_by(id=rev_id).first()
    return {'user': response.to_dict()}
