let even = false;
for (let i = 1; i < 16; i++) {
  for (let ii = 1; ii < 18; ii++) {
    if (even) {
      document.querySelector(".grid").insertAdjacentHTML("beforeend", `<div class='loc${i}-${ii} oneven'></div>`);
      even = false;
      continue;
    }
    even = true;
    document.querySelector(".grid").insertAdjacentHTML("beforeend", `<div class='loc${i}-${ii} even'></div>`);
  }
}

export const makeOnePeace = function (num1, num2) {
  const number = (num1 - 1) * 15 + num2;
  if (number % 2 === 1) {
    document.querySelector(`.loc${num1}-${num2}`).style.backgroundColor = "rgb(14, 224, 101)";
  } else {
    document.querySelector(`.loc${num1}-${num2}`).style.backgroundColor = "rgb(6, 155, 6)";
  }
};
