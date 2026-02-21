let word = words[Math.floor(Math.random() * words.length)].toLowerCase();
let inputs = document.getElementsByTagName("input");
let rows = document.getElementsByClassName("row");
let rowPlace = 0;
let message = document.getElementById("message");
let keyBoard = document.getElementById("keys");

// Making KeyBoard Buttons
for (let i = 0; i < 26; i++) {
  let temp = document.createElement("span");
  temp.innerHTML = String.fromCharCode(65 + i);
  temp.id = String.fromCharCode(65 + i);
  temp.style.backgroundColor = "var(--blue)";
  keyBoard.appendChild(temp);
}

// Row Editing
function enableRow() {
  Array.from(rows[rowPlace].children).forEach((ele) => {
    ele.disabled = false;
  });
}

// Input Handling
Array.from(inputs).forEach((ele) => {
  ele.setAttribute("maxlength", "1");
  ele.disabled = true;
  ele.addEventListener("input", () => {
    ele.value = ele.value.replace(/[^a-z]/gi, "").slice(0, 1);
    ele.value = ele.value.toUpperCase();
    if (rows[rowPlace].children[4] != ele && ele.value.length == 1)
      ele.nextElementSibling.focus();
  });
});
enableRow();

// New Game Button
document.getElementById("new-game").addEventListener("click", () => {
  Array.from(inputs).forEach((ele) => {
    ele.value = "";
    ele.style.color = "black";
    ele.style.backgroundColor = "#4f75be";
    ele.disabled = true;
  });
  Array.from(keyBoard.children).forEach((ele) => {
    ele.style.backgroundColor = "var(--blue)";
  });
  word = words[Math.floor(Math.random() * words.length)].toLowerCase();
  rowPlace = 0;
  enableRow();
  rows[rowPlace].children[0].focus();
  message.style.display = "none";
  document.getElementById("enter").disabled = false;
});

// Enter Button
document.getElementById("enter").addEventListener("click", () => {
  let save = "";
  Array.from(rows[rowPlace].children).forEach((ele) => {
    save += ele.value;
  });
  save = save.toUpperCase();
  if (save.length == 5) {
    let checked = [false, false, false, false, false];
    if (words.includes(save) || words.includes(save.toLowerCase())) {
      save = save.toLowerCase();
      for (let i = 0; i < 5; i++) {
        let letter = document.getElementById(save[i].toUpperCase()); // To Make Edit in KeyBoard
        rows[rowPlace].children[i].disabled = true;
        if (save[i] == word[i]) {
          rows[rowPlace].children[i].style.backgroundColor = "var(--green)";
          letter.style.backgroundColor = "var(--green)";
          checked[i] = true;
        } else {
          let state = false;
          for (let j = 0; j < 5; j++) {
            if (save[i] == word[j] && !checked[j] && save[j] != word[j]) {
              state = checked[j] = true;
              rows[rowPlace].children[i].style.backgroundColor =
                "var(--yellow)";
              if (letter.style.backgroundColor == "var(--blue)") {
                letter.style.backgroundColor = "var(--yellow)";
              }
              break;
            }
          }
          if (!state) {
            rows[rowPlace].children[i].style.backgroundColor = "black";
            letter.style.backgroundColor = "black";
            rows[rowPlace].children[i].style.color = "white";
          }
        }
      }
      if (save == word) {
        message.innerHTML = "Winner";
        message.style.color = "var(--green)";
        message.style.display = "block";
        document.getElementById("enter").disabled = true;
      } else {
        rowPlace++;
        if (rowPlace <= 5) {
          enableRow();
          rows[rowPlace].children[0].focus();
        } else {
          message.innerHTML = `NAH The Word Was => ${word} 😢`;
          message.style.color = "black";
          message.style.display = "block";
          document.getElementById("enter").disabled = true;
        }
      }
    } else {
      alert("Plz Enter Valid Word");
    }
  } else {
    alert("Plz Enter 5 Letters");
  }
});

// KeyBoard Button Handling
window.addEventListener("keydown", (event) => {
  if (event.key === "Backspace") {
    let row = rows[rowPlace].children;
    if (row[0] != event.target) {
      let idx = Array.from(row).indexOf(event.target);
      if (event.target.value == "") {
        row[idx - 1].value = "";
        row[idx - 1].focus();
      }
    }
    event.target.value = "";
  }
  if (event.key === "Enter") {
    document.getElementById("enter").click();
  }
});
