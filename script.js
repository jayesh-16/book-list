// book

class Book{
    constructor( title, author, ID) {
        this.title = title;
        this.author = author;
        this.ID = ID;
}}

// UI

class UI{
    
    static displayBooks() {
        
        
        
    
        const books = storage.getbooks();
        books.forEach((book) => UI.addBooktolist(book));
            
        };
        static addBooktolist(books) {
          const list = document.querySelector("#book-list");
          const row = document.createElement("tr");
          row.innerHTML= `
          <td>${books.title}</td>
          <td>${books.author}</td>
          <td>${books.ID}</td>
          <td><a href="#" class= "btn btn-danger btn-sm delete">X</a></td>
          `
          list.appendChild(row);


    }

    static removebook (el){

        if(el.classList.contains("delete")){

            el.parentElement.parentElement.remove();
            
        }

    }
        
    static showalert(message , className){
        const div = document.createElement("div");
        div.appendChild(document.createTextNode(message));
        div.className = `alert alert-${className} mt-3`;
        const container = document.querySelector(".container")
        const form = document.querySelector("#book-form")
        container.insertBefore(div,form);
        setTimeout(() => document.querySelector(".alert").remove(),3000);
    }
    
    static clearfields() {
            
            document.querySelector("#title").value = '';
            document.querySelector("#author").value = '';
            document.querySelector("#ID").value = '';

        }
}

// STORAGE
class storage{

    static getbooks(){
        let books;
        if(localStorage.getItem("books")===null){
            books=[];
            
        }

        else{
            
           books= JSON.parse(localStorage.getItem("books"));
        }

        return books;

    }

    static addbooks(book){

        const books = storage.getbooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));


    }

    static removebooks(ID){
        const books = storage.getbooks();
        books.forEach((book,index) => {
            if (book.ID === ID){
                books.splice(index,1);
            }
        })

        localStorage.setItem("books", JSON.stringify(books));


    }

     



}






// DISPLAYBOOK

document.addEventListener("DOMContentLoaded",UI.displayBooks);

// ADDBOOK

document.querySelector("#book-form").addEventListener("submit",(e) => {
    e.preventDefault();
    
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const ID = document.querySelector("#ID").value;


    if(title=== "" ||author=== "" ||ID=== ""){
        
        UI.showalert("Please enter all the information", "danger");
    }

    else{
        
    const book = new Book(title, author, ID);

    console.log(book);

    UI.addBooktolist(book);
    
    storage.addbooks(book);
    
    UI.showalert("Book is added to the list ", "success");

    UI.clearfields();

    }
 
});
// REMOVEBOOK  

document.querySelector("#book-list").addEventListener("click",(e) => { 

    UI.removebook(e.target);
    storage.removebooks(e.target.parentElement.previousElementSibling.textContent);

    UI.showalert("Book is removed from the list ", "info");

});