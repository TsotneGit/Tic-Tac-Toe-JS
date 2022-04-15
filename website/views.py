from flask import (
    Blueprint,
    redirect,
    render_template,
    request,
    flash,
    redirect,
    url_for,
)

views = Blueprint("views", __name__)


@views.route("/")
@views.route("/home")
def home():
    return render_template("home.html")
