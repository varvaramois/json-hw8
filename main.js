const input = document.getElementById("bookmarkInput");
const board = document.getElementById("board");
const btn = document.getElementById("addBookmarkBtn");

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || []; // зчитує закладки з localStorage або ініціалізуємо пустий масив

function save() {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks)); // зберігаємо закладки в localStorage
}

function render() { // функція для відображення закладок на сторінці
  board.innerHTML = "";
  bookmarks.forEach((text, i) => {
    const li = document.createElement("li"); 
    li.className = "bookmark"; 

    const a = document.createElement("a");
    a.textContent = text;
    a.style.flex = "1"; 
    a.style.cursor = "pointer";
    a.onclick = () => {
      const newText = prompt("Редагувати:", text);
      if (newText !== null) {
        bookmarks[i] = newText;
        save();
        render();
      }
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑";
    delBtn.onclick = () => {
      bookmarks.splice(i, 1); // видаляємо закладку з масиву
      save();
      render();
    };

    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.appendChild(a);
    li.appendChild(delBtn); 
    board.appendChild(li);
  });
}

btn.onclick = () => { // функція для додавання нової закладки
  if (bookmarks.length >= 10) {
    alert("Ви досягли максимальної кількості закладок (10)."); 
    return;
  }
  const val = input.value.trim();  
  if (val) {    
    bookmarks.push(val);   
    save();  
    render(); 
    input.value = "";  
  }
};

render();


// 
// import Handlebars from "handlebars";
// import { products } from "./data"; // Імпортуємо дані продуктів
// import templateSource from "./template.hbs";    

// const renderProducts = (products) => {
//   const template = Handlebars.compile(templateSource); // Компілюємо шаблон 
//   const html = template({ products }); // Генеруємо HTML за допомогою шаблону та даних
//   document.getElementById("product-list").innerHTML = html; // Вставляємо HTML в DOM
// };

// // Функція для фільтрації продуктів за назвою або описом
// const filterProducts = (searchTerm) => {
//   return products.filter(
//     (product) =>
//       product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );
// };

// document.getElementById("search").addEventListener("input", (event) => {
//   const searchTerm = event.target.value;
//   const filteredProducts = filterProducts(searchTerm); // Отримуємо відфільтровані продукти
//   renderProducts(filteredProducts); // Рендеримо відфільтровані продукти
// });

// renderProducts(products); короче якась фігня в мене тут