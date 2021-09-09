const draggableList = document.querySelector("#draggbleList");
const CheckBtn = document.querySelector("#check");
const success = document.querySelector(".success");
const message = document.querySelector(".message");
const exit = document.querySelector(".exit");

const RichestPeople = [
  "Bernard Arnault",
  "Jeff Bezos",
  "Elon Musk",
  "Bill Gates",
  "Mark Zuckerberg",
  "Larry Ellison",
  "Larry Page",
  "Sergey Brin",
  "Warren Buffet",
  "Francoise Bettencourt Meyers",
];

//draggable function
const listItems = [];
let dragStartIndex;

const createStart = () => {
  [...RichestPeople]
    .map((a) => ({ name: a, sort: Math.random() }))
    .sort((x, y) => x.sort - y.sort)
    .map((a) => a.name)
    .forEach((person, index) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
      <p class="content">Click to see</i></p>
      <span class='number'>${index + 1}</span>
      <div class='draggable' draggable='true'>
        <p class='person'>${person}</p>
        <i class='fas fa-grip-lines'></i>
      </div>
    `;
      listItems.push(listItem);
      draggableList.appendChild(listItem);
    });
  EventListener();
};

//drag and drop functionality
function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragOver(e) {
  e.preventDefault();
  this.classList.remove("over");
}

function dragDrop() {
  let dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");

  //swapping the items function
  function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector(".draggable");
    const itemTwo = listItems[toIndex].querySelector(".draggable");

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
  }
}

function dragEnter() {
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

//event listener functionality
const EventListener = () => {
  const draggables = document.querySelectorAll(".draggable");
  const draggableLists = document.querySelectorAll(".draggableList li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  draggableLists.forEach((draggableList) => {
    draggableList.addEventListener("dragover", dragOver);
    draggableList.addEventListener("drop", dragDrop);
    draggableList.addEventListener("dragenter", dragEnter);
    draggableList.addEventListener("dragleave", dragLeave);

    //showing informatin each list item content function
    draggableList.addEventListener("click", () => {});
  });
};

createStart();
let clsVal = 0;
//checking all inforamton by check button
CheckBtn.addEventListener("click", () => {
  listItems.forEach((item, index) => {
    const personName = item.querySelector(".draggable").innerText.trim();

    if (personName !== RichestPeople[index]) {
      item.classList.add("wrong");
    } else {
      item.classList.remove("wrong");
      item.classList.add("right");
    }
  });
});
