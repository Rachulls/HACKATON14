// impkkort "./styles.css";
import axios from "axios";
const container = document.getElementById("dogContainer");
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const closeButton = document.getElementById("close__btn");
let arrayDogs = [];
let itemDelete = "";

const readCards = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/dogs");
    arrayDogs = data;
    printDogs(arrayDogs);
  } catch (e) {
    console.log(e);
  }
};

function printDogs(printDog) {
  container.innerHTML = "";
  printDog.forEach((item) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
        <div class="card__top"><h4 data-id=${item.id} id="delete" class="dog__delete">X</h4></div>
        <div class="card__dog"><img class="dog__image" src=${item.img}>
        <div class="name__dog"><h3>${item.name}</h3><h4>${item.telefono}</h4><h4>${item.pais}</h4><h5>${item.descripcion}</h5></div>
        </div>
        `;

    container.appendChild(div);
    showModal();
  });
}

function showModal() {
  const btnDelete = document.querySelectorAll(".dog__delete");
  btnDelete.forEach((el) =>
    el.addEventListener("click", function () {
      modal.style.display = "block";
      console.log(el);
      itemDelete = el.getAttribute("data-id");
      console.log(itemDelete);
    })
  );
}

const deleteDog = document.getElementById("delete");
deleteDog.addEventListener("click", function () {
  axios.delete(`http://localhost:3000/dogs/${itemDelete}`).then((response) => {
    modal.style.display = "none";
    location.reload();
  });
});

span.onclick = function () {
  modal.style.display = "none";
};

closeButton.addEventListener("click", function () {
    modal.style.display = "none";
  });

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

window.addEventListener("DOMContentLoaded", readCards);
