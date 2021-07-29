let myLibrary = [
    {
        title: 'The Daily Stoic: 366 Meditations on Wisdom, Perseverance, and the Art of Living',
        author: 'Ryan Holiday',
        snippet: 'From the team that brought you The Obstacle Is the Way and Ego Is the Enemy, a beautiful daily devotional of Stoic meditations—an instant Wall Street Journal and USA Today Bestseller.',
        image: 'https://images-na.ssl-images-amazon.com/images/I/41QOsSsYHML._SX329_BO1,204,203,200_.jpg'
    },
    {
        title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
        author: 'James Clear',
        snippet: 'No matter your goals, Atomic Habits offers a proven framework for improving--every day.',
        image: 'https://images-na.ssl-images-amazon.com/images/I/51vSbWpF+dS._SX329_BO1,204,203,200_.jpg'
    },
    {
        title: 'How to Win Friends & Influence People',
        author: 'Dale Carnegie',
        snippet: 'Dale Carnegie’s rock-solid, time-tested advice has carried countless people up the ladder of success in their business and personal lives.',
        image: 'https://images-na.ssl-images-amazon.com/images/I/51X7dEUFgoL._SX320_BO1,204,203,200_.jpg'
    }
]

// **************** DOM Variables ****************
let bookContainer = document.querySelector('.container');
let inputTitle = document.getElementById("book_title");
let inputAuthor = document.getElementById("book_author");
let inputSnippet = document.getElementById("book_snippet");
let inputImage = document.getElementById("book_image");
let inputRead = document.getElementById("book_status");
let removeButton = document.querySelectorAll('.remove-button');

/************* Constructor Function ****************/
function Book (title, author, snippet, image, readStatus) {
    this.title = title,
    this.author = author,
    this.snippet = snippet,
    this.image = image,
    this.readStatus = readStatus
}

/************* Event Listeners ****************/

document.querySelector('.add-button').addEventListener('click', e => {
    e.preventDefault();
    addBookToLibrary();
    clearInput();
})


/************* Functions ****************/

function addBookToLibrary() {
    // check if input is empty
    if(!inputTitle.value || !inputAuthor.value || !inputSnippet.value || !inputImage.value) {
        return
    }
    else {
        let newBook = new Book(inputTitle.value, inputAuthor.value, inputSnippet.value, inputImage.value, inputRead.checked);
        myLibrary.push(newBook);
    }
    toggleForm();
    renderLibrary();
}   

// Clear input field
function clearInput() {
    inputTitle.value = '';
    inputAuthor.value = '';
    inputSnippet.value = '';
    inputImage.value = '';
}

// Delete book
function removeBook(id) {
    
    myLibrary = myLibrary.filter((book, index) => {
        return index != id;
    })

    renderLibrary();
}

// toggle book form
function toggleForm() {
    let bookForm = document.querySelector('.book-form-container');
    bookForm.classList.toggle('active');
}

// Create elements for book
function renderBook(book, index) {

    /*************** DOM Variables ***************/

    let bookCardDiv = document.createElement('div')
    let bookInfoDiv = document.createElement('div');
    let bookImage = document.createElement('img');
    let removeButton = document.createElement('button');
    let bookTitle = document.createElement('h4');
    let bookAuthor = document.createElement('p');
    let bookSnippet = document.createElement('p');
    let bookRead = document.createElement('button');

    
    /************* Classes & Data Attributes *************/
    bookCardDiv.classList.add('card');
    bookCardDiv.dataset.id = index;
    bookInfoDiv.classList.add('book-info')
    bookImage.classList.add('book-image');
    removeButton.classList.add('remove-button');
    bookTitle.classList.add('book-title');
    bookAuthor.classList.add('book-author');
    bookSnippet.classList.add('book-snippet');
    bookRead.classList.add('book-status');
    

    /************* Contents *************/
    bookImage.src = book.image;
    removeButton.innerHTML = '<i class="las la-minus"></i>';
    bookTitle.innerText = book.title;
    bookAuthor.innerText = `by ${book.author}`;
    bookSnippet.innerText = book.snippet;
    bookRead.innerText = `${book.readStatus ? 'read' : 'not read'}`

    /************* Styles *************/
    bookRead.style.backgroundColor = `${book.readStatus ? 'rgba(0, 153, 51, 0.2)' : 'rgb(0, 153, 51)'}`

    // Append Elements to Parent Div
    bookInfoDiv.appendChild(bookTitle);
    bookInfoDiv.appendChild(bookAuthor);
    bookInfoDiv.appendChild(bookSnippet);
    bookInfoDiv.appendChild(bookRead);
    bookCardDiv.appendChild(removeButton);
    bookCardDiv.appendChild(bookImage);
    bookCardDiv.appendChild(bookInfoDiv);
    bookContainer.appendChild(bookCardDiv)

    removeButton.addEventListener("click", e => {
        let id = e.target.parentNode.getAttribute("data-id");
        removeBook(id);
    })

}

function renderLibrary() {
    bookContainer.innerHTML = '';
    myLibrary.map( (book, index) => {
        renderBook(book, index);
    })
}

renderLibrary();
