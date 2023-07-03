// 変数の定義
var Phase = ["title", 0]
var quiz_data = [['1+1=?', '2', '1'], ['1-1=?', '0', '2'], ['1*1=?', '1', '0'], ['1/1=?', '1', '0'], ['1^1=?', '1', '0']]
var question_num = 0;
var is_L_crct = true;
var selected_LR = 1;
var score = 0;
var timer = 10;
var stage = 0;

// 各エレメントの取得
var start_button = document.getElementById("start-button-part");
var R_slct = document.getElementById("R-slct");
var L_slct = document.getElementById("L-slct");
var page = document.getElementById("page");
var progress_pages;
var question_num_elm = document.getElementById("question-num");
var Q_sent = document.getElementById("Q-sent");
var crct_label = document.getElementById("crct-or-incrct");
var slcts_part = document.getElementById("slcts-part");
var question_part = document.getElementById("question-part");
var thanks_part = document.getElementById("thanks-part");
var score_part = document.getElementById("score-part");
var score_elm = document.getElementById("score");
var timer_elm = document.getElementById("timer");

var page_title = document.getElementById("title");
var page_questioning = document.getElementById("questioning");
var page_ending = document.getElementById("ending");

// 背景
var background_elm = document.getElementById("background").children;

// 表示・非表示
function hide(elm) { elm.style.display = "none"; }
function show(elm) { elm.style.display = "block"; }

function hide_fade(elm, direction) {
  elm.style.transition = "0.4s";
  if (direction) {
    elm.style.top = "-1500px";
  } else {
    elm.style.top = "1500px";
  }
  elm.style.opacity = "0";
  setTimeout(() => {
    hide(elm);
    elm.style.top = "";
    elm.style.bottom = "";
    elm.style.opacity = "";
  }, 400);
}
function show_fade(elm, direction) {
  elm.style.transition = "";
  if (direction) {
    elm.style.top = "-1500px";
  } else {
    elm.style.top = "1500px";
  }
  elm.style.opacity = "0";
  setTimeout(() => {
    show(elm);
    elm.style.transition = "0.4s";
    elm.style.opacity = "1";
    elm.style.top = "";
  }, 1);
}

// 初期化
show(page_title);
hide(page_questioning);
hide(page_ending);
show(background_elm[0])

// ゲームスタート
start_button.addEventListener("click", () => {
  // 問題フェーズへ遷移
  Phase = ["questioning", 0];
  // 表示切替
  hide(background_elm[0])
  show(background_elm[1])
  hide(page_title);
  show(page_questioning);
  // スタートムービー 4秒間
  progress_pages = page_questioning.children;
  show(progress_pages[0]);
  //////////////////
  setTimeout(() => {
    Questioning();
  }, 4000);
});

function ending() {
  hide(background_elm[5])
  show(background_elm[6])
  hide(page_questioning);
  show(page_ending);
  show(thanks_part);
  setTimeout(() => {
    score_elm.textContent = score;
    show(score_part);
  }, 1000);
}

document.addEventListener("keydown", (e) => {
  console.log("pressed")
  if (Phase[1] == 3) {
    if (e.code == "ArrowLeft") {
      selected_LR = 1;
    } else if (e.code == "ArrowRight") {
      selected_LR = 0;
    }
  }
  if (selected_LR && selected_LR != -1) {
    L_slct.classList.add("selected");
    R_slct.classList.remove("selected");
  } else {
    L_slct.classList.remove("selected");
    R_slct.classList.add("selected");
  }
})

function Questioning() {
  hide(crct_label);
  hide(question_part);
  // 第n問
  stage++;
  console.log(stage);
  Phase[1] = 1;
  // 表示切替
  hide(background_elm[3])
  hide(background_elm[4])
  hide(background_elm[1])
  show(background_elm[2],0)
  hide(progress_pages[0]);
  show(progress_pages[1]);
  // 問題数表示
  question_num_elm.textContent = question_num + 1;
  console.log(question_num + 1);
  setTimeout(() => {
    // 問題を大きく表示
    Phase[1] = 2;
    // 表示切替
    hide(progress_pages[1]);
    show(progress_pages[2]);
    // 問題を表示
    progress_pages[2].textContent = quiz_data[question_num][0];
    setTimeout(() => {
      // 回答開始
      timer = 10;
      timer_elm.textContent = timer;
      show_fade(timer_elm, 0);
      const Timer = setInterval(() => {
        if (timer == 1) {
          timer_elm.textContent = "Time up!";
          clearInterval(Timer);
        } else {
          timer--;
          timer_elm.textContent = timer;
          timer_elm.style.transform = "scale(1.1,1.1)";
          setTimeout(() => {
            timer_elm.style.transform = "scale(1.0,1.0)";
          }, 100);
        }
      }, 1000);
      show_fade(question_part,1);
      show(L_slct);
      show(R_slct);
      show(slcts_part,0);
      selected_LR = -1;
      L_slct.classList.remove("selected");
      R_slct.classList.remove("selected");
      Phase[1] = 3;
      // 表示切替
      hide(progress_pages[2]);
      show(progress_pages[3]);
      //クイズの文の挿入
      Q_sent.textContent = quiz_data[question_num][0];
      // 左が正答か
      is_L_crct = Boolean(Math.floor(Math.random() * 2));
      // 選択肢の文の挿入
      if (is_L_crct) {
        L_slct.textContent = quiz_data[question_num][1];
        R_slct.textContent = quiz_data[question_num][2];
      } else {
        L_slct.textContent = quiz_data[question_num][2];
        R_slct.textContent = quiz_data[question_num][1];
      }
      setTimeout(() => {
        // 回答ロック
        Phase[1] = 4;
        if (selected_LR == -1) {
          selected_LR = 1;
        }
        if (selected_LR) {
          hide(background_elm[2])
          show(background_elm[3])
          L_slct.classList.add("locked");
          hide(R_slct,0);
        } else {
          hide(background_elm[2])
          show(background_elm[4])
          hide(L_slct,0);
          R_slct.classList.add("locked");
        }
        setTimeout(() => {
          L_slct.classList.remove("locked");
          R_slct.classList.remove("locked");
          hide_fade(slcts_part, 0);
          hide_fade(question_part, 1);
          hide_fade(timer_elm, 0)
        }, 4000);
        setTimeout(() => {
          show(crct_label);
          if (is_L_crct == selected_LR) {
            show(background_elm[2])
            hide(background_elm[3])
            hide(background_elm[4])
            crct_label.textContent = "正解！";
            question_num++;
            score += 10;
            if (question_num == quiz_data.length - 1) {
              Phase = ["ending", 0];
              setTimeout(() => {
                ending();
              }, 4000);
            } else {
              setTimeout(() => { Questioning(); }, 4000);
            }
          } else {
            hide(background_elm[2])
            hide(background_elm[3])
            hide(background_elm[4])
            show(background_elm[5])
            crct_label.textContent = "不正解...";
            Phase = ["ending", 0];
            setTimeout(() => {
              ending();
            }, 6500);
          }
        }, 8000);
      }, 10000);
    }, 2000);
  }, 2000);
}