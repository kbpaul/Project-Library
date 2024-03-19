const addBook = document.querySelector(".add-book");
const submitForm = document.querySelector("#submitForm");
const tbody = document.querySelector('tbody');


// Book constructor function
function Book(author, title,  pages, read){
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

// Prototype method to toggle read status of a book
Book.prototype.toggleReadStatus = function() {
    if(this.read === 'Read'){
        this.read = 'Unread';
    } else {
        this.read = 'Read';
    }
}

// Array to store library books
let myLibrary = [];

// Function to add book to library
function addBookToLibrary(e) {
    e.preventDefault();

    // Get form input values
    let author = document.querySelector("#author");
    let title = document.querySelector("#title");
    let pages = document.querySelector("#pages");
    let read = document.querySelector("input[name='read']:checked");

    // Create new book instance
    const newBook = new Book(
        author.value,
        title.value,
        pages.value, 
        read.value
    );
    
    // Add new book to library
    myLibrary.push(newBook);

    // Display books
    displayBooks();
  }

// Function to display books in the library
function displayBooks(){

    // Clear existing book display
    while(tbody.firstChild){
        tbody.removeChild(tbody.firstChild);
    }

    // Loop through library and display books
    myLibrary.forEach(book => {
        const tr = document.createElement("tr");
        tr.classList.add("card");

        // Add remove button
        const removeData = document.createElement("td");
        const removeButton = document.createElement("button");
        removeButton.innerText = "x";
        removeButton.classList.add("remove");
        removeData.appendChild(removeButton);
        tr.appendChild(removeData);

        // Add author
        const authorData = document.createElement("td");
        authorData.innerText = book.author;
        tr.appendChild(authorData);

        // Add title
        const titleData = document.createElement("td");
        titleData.innerText = book.title;
        tr.appendChild(titleData);

        
        // Add pages
        const pageData = document.createElement("td");
        pageData.innerText = book.pages;
        tr.appendChild(pageData);

        // Add read status and toggle button
        const readData = document.createElement("td");
        tr.appendChild(readData);

        const toggleButton = document.createElement("button");
        toggleButton.innerText = book.read;
        toggleButton.classList.add("readStatus");
        readData.appendChild(toggleButton);
        tr.appendChild(readData);

        tbody.appendChild(tr);
    });

    // Reattach event listeners to toggle and remove buttons
    attachToggleEventListeners();
    attachRemoveEventListeners();
}

// Function to handle remove button click event
function handleRemoveButtonClick(event) {
    const row = event.target.closest('tr');
    if (row) {
        // Get the title of the book from the row
        const title = row.children[2].innerText;
        // Filter out the book to be removed from the library array
        myLibrary = myLibrary.filter(book =>  book.title !== title);
        // Remove the row from the table
        row.remove();
    }
}

// Function to search for books by title
function findBookByTitle(titleName) {
    // Use Array.prototype.filter() to filter books by title
    return myLibrary.filter(book => book.title === titleName);
}

// Function to toggle Read Status and display books
function toggleReadStatusFunc(event){
    const row = event.target.closest('tr');
    const title = row.children[2];
    let book = findBookByTitle(title.innerText);
    

    // Change the read status of the book;
    // Check if any book is found with the given author name
    if (book.length > 0) {
        // Toggle the read status of the first book
        book[0].toggleReadStatus();

        // Display books
        displayBooks();
    }
}


// Initial book added to the library
const myBookTitle = "The Hobbit";
const myBookAuthor = "J.R.R. Tolkien";
const bookPages = 295;
const bookRead = 'Read';
const newBook = new Book(myBookAuthor, myBookTitle, bookPages, bookRead);
myLibrary.push(newBook);
displayBooks();


// Initial setup - hide the form
submitForm.style.display = 'none';


// Event listener for displaying the form
addBook.addEventListener('click', addForm);


// Function to display the form
function addForm(){
    submitForm.style.display = 'flex';
}


// Event listener for form submission
submitForm.addEventListener('submit', addBookToLibrary);


// Function to attach event listeners to remove buttons
function attachRemoveEventListeners() {
    const removeButtons = document.querySelectorAll('.remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', handleRemoveButtonClick);
    });

}


// Function to attach event listeners to toggle buttons
function attachToggleEventListeners() {
    const readStatusButtons = document.querySelectorAll('.readStatus');
    readStatusButtons.forEach(button => {
        button.addEventListener('click', toggleReadStatusFunc);
    });
}



