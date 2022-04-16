cell_ids = ["_00", "_01", "_02", "_10", "_11", "_12", "_20", "_21", "_22"];

cells = [];
reset_button = document.getElementById("reset");
let turn = "X";
let winner = 0;
let move = 0;

const win_positions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

let board = [
  [".", ".", "."],
  [".", ".", "."],
  [".", ".", "."],
];

function make_move(to, who) {
  if (board[to[0]][to[1]] == ".") {
    board[to[0]][to[1]] = who;
    move++;
    return true;
  } else {
    return false;
  }
}

function check_winner() {
  for (let i = 0; i < 8; i++) {
    let count = 0;
    let temp = "";
    for (let j = 0; j < 3; j++) {
      if (temp != "") {
        if (
          board[Math.floor((win_positions[i][j] - 1) / 3)][
            (win_positions[i][j] - 1) % 3
          ] != temp
        ) {
          count = 0;
          break;
        } else if (
          board[Math.floor((win_positions[i][j] - 1) / 3)][
            (win_positions[i][j] - 1) % 3
          ] != "."
        ) {
          count++;
        }
      } else {
        temp =
          board[Math.floor((win_positions[i][j] - 1) / 3)][
            (win_positions[i][j] - 1) % 3
          ];
        count++;
      }
    }
    if (count == 3) {
      winner = temp;
    }
  }
  if (winner) {
    return true;
  } else {
    return false;
  }
}

function reset() {
  for (let i of cells) {
    i.innerHTML = "";
  }
  board = [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ];
  turn = "X";
  move = 0;
  winner = "";
}

for (let i = 0; i < cell_ids.length; i++) {
  cells.push(document.getElementById(cell_ids[i]));
}

for (let i of cells) {
  i.addEventListener("click", () => {
    let can_make_a_move = make_move([i.id[1], i.id[2]], turn);
    if (can_make_a_move) {
      i.innerHTML = turn;
      i.innerHTML == "X" ? (turn = "O") : (turn = "X");
      if (move == 9) {
        i.innerHTML = turn;
        Swal.fire({
          icon: "success",
          title: "It's a Tie!",
        });
        reset();
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Move!",
      });
    }

    if (check_winner()) {
      Swal.fire({
        icon: "success",
        title: winner + " won!",
      });
      reset();
    }
  });
}

reset_button.addEventListener("click", () => {
  reset();
});
