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

turn = "X"

board_dict = {
    "_00": "#",
    "_01": "#",
    "_02": "#",
    "_10": "#",
    "_11": "#",
    "_12": "#",
    "_20": "#",
    "_21": "#",
    "_22": "#",
}


@views.route("/", methods=["GET", "POST"])
@views.route("/home", methods=["GET", "POST"])
def home():
    global board_dict
    global turn

    if request.method == "POST":
        args = request.form
        print(args)
        submitted = args.keys()
        for key in submitted:
            if key == "reset":
                for key in submitted:
                    if key != "reset":
                        board_dict["_" + key] = "#"
                break
            if board_dict["_" + key] == "#":
                board_dict["_" + key] = turn
            else:
                flash("You can't overwrite a square!", category="error")
        turn = ["X", "O"][turn == "X"]
        return redirect(url_for("views.preventRefreshFromSubmit"))

    return render_template("home.html", **board_dict)


@views.route("/preventRefreshFromSubmit", methods=["GET", "POST"])
def preventRefreshFromSubmit():
    return redirect(url_for("views.home"))
