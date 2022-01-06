const formDOM = document.getElementById("form");
const inputTodoDOM = document.querySelector("#inputTodo");
const userDOM = document.querySelector(".user");
const addDOM = document.getElementById("add");
const editFormDOM = document.getElementById("editForm"); //button
const userNameInputDOM = document.getElementById("userNameInput");
const userNameFormDOM = document.getElementById("userNameForm");
const editDOM = document.getElementById("edit"); 
const removeDOM = document.getElementById("remove");
const listDOM = document.querySelector(".list");


// boş bir todo nesnesi oluşturuluyor.(API'ya gönderilecek olan nesne)
let todo = { content: '' ,id : null, isCompleted:false };


const createTodo = async (e) => {
  // input boş ise uyarı
  if (inputTodoDOM.value.trim() == "" || inputTodoDOM.value.length < 3) {
    alert("it can not be empty or less than 3 character");
    return;
  }

  // todo nesnesinin content'i input'un değerine eşitleniyor
  todo.content = inputTodoDOM.value;
  
  // inputtan alınan todo API'a gönderiliyor.
  await getTodos(`https://61c37acc9cfb8f0017a3ebb5.mockapi.io/todos/`, "POST");

  // input temizleniyor
  inputValue = "";
};

// fonksiyon oluşturularak kullanıcının isteklerine göre yapılacak işlemler belirleniyor.

const getTodos = async (url, method = "GET", id) => {
  if (method === "POST") {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    const data = await res.json();
    return data;
  }
  if (method === "PUT") {
    const res = await fetch(`${url}${id}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    const data = await res.json();
    return data;
  }
  if (method === "DELETE") {
    const res = await fetch(`${url}${id}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    const data = await res.json();
    return data;
  }

  const res = await fetch(url);
  const data = await res.json();

  return data;
};

// kullanıcı adı alınıp localStorage'da saklanıyor ve sayfada gösteriliyor.

userNameFormDOM.addEventListener("submit", (e) => {
  e.preventDefault();
  localStorage.setItem("username", userNameInputDOM.value);
  let userName = localStorage.getItem("username");
  userDOM.textContent = `Welcome, ${userName}`;
  userNameInputDOM.value = "";
});

// kullanıcı yeni todo ekleyip submit ettiğinde todo API'a ekleniyor ve 1 saniye sonra sayfa yenileniyor

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await createTodo();
  setTimeout(() => {
    location.reload();
  }, 300);
});


// sayfa yenilendiğinde todo'lar listeleniyor ve kullanıcı adı gösteriliyor.

window.addEventListener("load", async () => {


  let userName = localStorage.getItem("username");
  userDOM.textContent = `Welcome, ${userName === null ? '' : userName}`;

  let data = await getTodos(
    `https://61c37acc9cfb8f0017a3ebb5.mockapi.io/todos/`
  );
  data.forEach((el) => {
    const li = document.createElement("li");
    li.classList.add("list-item");
    li.setAttribute('data-id' , el.id) 
    li.setAttribute('data-completed' , el.isCompleted) 
    li.innerHTML = `
      <p class='content'>
        ${el.content}
      </p>
      <p class='isCompleted'>
      ${el.isCompleted}
      </p>
      <button  id="edit" class="edit-remove">Edit</button>
      <button  id="remove" class="edit-remove">Remove</button>
      <button  id="completed" class="edit-remove">Completed</button>
        `;
    listDOM.insertAdjacentElement("afterbegin", li);
  });
});

// kaldırılmak istenen todo'ları remove'a tıklandığında kaldırıyor.

listDOM.addEventListener('click', async(e) => {
  if(e.target.id === 'remove'){
    let id = e.target.parentElement.dataset.id;

    await getTodos(
     `https://61c37acc9cfb8f0017a3ebb5.mockapi.io/todos/`,'DELETE',id
   ); 
   setTimeout(() => {
     location.reload();
   }, 300);
  }

})

// tamamlanan todo'ları true olarak değiştiriyor.

listDOM.addEventListener('click', async(e) => {
  if(e.target.id === 'completed'){

    e.target.parentElement.dataset.completed = true;
    e.target.parentElement.firstElementChild.nextElementSibling.textContent = 'true';
     
    let id = e.target.parentElement.dataset.id;

    todo.content = e.target.parentElement.firstElementChild.textContent
    todo.isCompleted= true

    await getTodos(
      `https://61c37acc9cfb8f0017a3ebb5.mockapi.io/todos/`,'PUT',id
    )
  }
})

// kullanıcı var olan bir todo'yu değiştirdiğinde bu fonksiyon çalışıyor.

listDOM.addEventListener('click', async(e) => {
  if(e.target.id === 'edit'){
    editFormDOM.disabled= false
    editFormDOM.classList.remove('disabled')
    addDOM.disabled = true
    addDOM.classList.add('disabled')
    let id = e.target.parentElement.dataset.id;
    let textContent = e.target.parentElement.firstElementChild.textContent
    inputTodoDOM.value = textContent.trim()

    
    editFormDOM.addEventListener('click', async(e)=> {
      e.preventDefault()
      
      todo.content = inputTodoDOM.value
      todo.isCompleted = false

      await getTodos(
        `https://61c37acc9cfb8f0017a3ebb5.mockapi.io/todos/`,'PUT',id
      ) 
      setTimeout(() => {
        location.reload();
      }, 300);
    })
     
  }
})


//AYNI UYGULAMANIN REACT VERSİYONUNU DA YAPACAĞIM. BONUSLARI ORADA GÖREBİLECEKSİNİZ.
