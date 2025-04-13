const addBtn = document.querySelector(".add-btn");
const closeBtn = document.querySelector(".close-btn");
const addInput = document.querySelector("#addInput");
const addInputDiv = document.querySelector(".addInput");
const inputClearBtn = document.querySelector(".inputClearBtn");
const list = document.querySelector(".list");
const ul = list.querySelector("ul");

//filter btn
const filterAZ = document.querySelector(".fa-arrow-up-a-z");
const filterZA = document.querySelector(".fa-arrow-down-z-a");

//alert div
const alertbox = document.querySelector(".alert");

ul.addEventListener('click', function(e) {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked');
  }
});

let inputActive = true;

addBtn.addEventListener("click", () => {
  let value = addInput.value.trim();

  if (inputActive) {
    if (value) {
      let li = document.createElement("li");
      li.innerHTML = `<p>${value}</p>
                    <i class="fa-solid fa-xmark itemRMV"></i>`;
      ul.appendChild(li);
      list.classList.add("activeList");
      todoAlert("green", "#1681164f", "ToDo uğurla əlavə edildi");
      addInput.value = "";
      addInputDiv.classList.add("passiveInput");
      closeBtn.style.display = "none";
      inputActive = false;

      li.querySelector(".itemRMV").addEventListener("click", () => {
        li.remove();
        todoAlert("green", "#1681164f", "ToDo uğurla silindi");
        if (ul.children.length === 0) {
          list.classList.remove("activeList");
          addInput.style.borderColor = "#cdcdcd";
          addInputDiv.classList.remove("passiveInput");
          inputActive = true;
        }
      });
    } else {
      todoAlert("red", "#fb85855b", "ToDo daxil edin");
      addInput.focus();
    }
  } else {
    addInputDiv.classList.remove("passiveInput");
    addInput.style.marginTop = "3px";
    addInput.style.borderColor = "#833ae0";
    closeBtn.style.display = "block";
    addInput.focus();
    inputActive = true;

    closeBtn.addEventListener("click", () => {
      addInputDiv.classList.add("passiveInput");
      closeBtn.style.display = "none";
      addInput.value = "";
      inputActive = false;
    });
  }
});

function todoAlert(color, bgcolor, text) {
  alertbox.style.display = "block";
  alertbox.style.color = color;
  alertbox.style.backgroundColor = bgcolor;
  alertbox.querySelector("p").textContent = text;

  setTimeout(() => {
    alertbox.style.display = "none";
  }, 2000);
}

filterAZ.addEventListener("click", () => {
  sortList(true);
  filterAZ.style.display = "none";
  filterZA.style.display = "block";
});

filterZA.addEventListener("click", () => {
  sortList(false);
  filterZA.style.display = "none";
  filterAZ.style.display = "block";
});

function sortList(ascending = true) {
  const items = Array.from(ul.querySelectorAll("li"));

  items.sort((a, b) => {
    const textA = a.querySelector("p").innerText.toLowerCase();
    const textB = b.querySelector("p").innerText.toLowerCase();
    if (textA < textB) return ascending ? -1 : 1;
    if (textA > textB) return ascending ? 1 : -1;
    return 0;
  });

  ul.innerHTML = "";
  items.forEach((item) => ul.appendChild(item));
}

inputClearBtn.addEventListener("click", () => {
  addInput.value = "";
  addInput.focus();
});
