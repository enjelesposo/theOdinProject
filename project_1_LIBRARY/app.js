let myLibrary = [
    {
        title: "Homo Deus",
        author: 'Yuval Noah Harari',
        snippet: 'Yuval Noah Harari, author of the critically-acclaimed New York Times bestseller and international phenomenon Sapiens, returns with an equally original, compelling, and provocative book, turning his focus toward humanity’s future, and our quest to upgrade humans into gods.',
        image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1455858241l/28092870._SY475_.jpg'
    },
    {
        title: 'Flow: The Psychology of Optimal Experience',
        author: 'Mihaly Csikszentmihalyi',
        snippet: 'During flow, people typically experience deep enjoyment, creativity, and a total involvement with life. In this new edition of his groundbreaking classic work, Csikszentmihalyi ("the leading researcher into ‘flow states’" —Newsweek) demonstrates the ways this positive state can be controlled, not just left to chance. Flow: The Psychology of Optimal Experience teaches how, by ordering the information that enters our consciousness, we can discover true happiness, unlock our potential, and greatly improve the quality of our lives.',
        image: 'https://images-na.ssl-images-amazon.com/images/I/71XvcOz-HlL.jpg'
    },
    {
        title: 'The Daily Stoic: 366 Meditations on Wisdom, Perseverance, and the Art of Living',
        author: 'Ryan Holiday',
        snippet: 'From the team that brought you The Obstacle Is the Way and Ego Is the Enemy, a beautiful daily devotional of Stoic meditations—an instant Wall Street Journal and USA Today Bestseller.',
        image: 'https://images-na.ssl-images-amazon.com/images/I/41QOsSsYHML._SX329_BO1,204,203,200_.jpg'
    },
    {
        title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
        author: 'James Clear',
        snippet: 'No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world\'s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
        image: 'https://images-na.ssl-images-amazon.com/images/I/51vSbWpF+dS._SX329_BO1,204,203,200_.jpg'
    },
    {
        title: 'The Hobbit, or There and Back Again',
        author: 'J. R. R. Tolkien',
        snippet: 'Written for J.R.R. Tolkien’s own children, The Hobbit met with instant critical acclaim when it was first published in 1937. Now recognized as a timeless classic, this introduction to the hobbit Bilbo Baggins, the wizard Gandalf, Gollum, and the spectacular world of Middle-earth recounts of the adventures of a reluctant hero, a powerful and dangerous ring, and the cruel dragon Smaug the Magnificent.',
        image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1546071216l/5907.jpg'
    },
    {
        title: 'Sapiens: A Brief History of Humankind',
        author: 'Yuval Noah Harari',
        snippet: 'In Sapiens, Dr Yuval Noah Harari spans the whole of human history, from the very first humans to walk the earth to the radical – and sometimes devastating – breakthroughs of the Cognitive, Agricultural and Scientific Revolutions. Drawing on insights from biology, anthropology, paleontology and economics, he explores how the currents of history have shaped our human societies, the animals and plants around us, and even our personalities. Have we become happier as history has unfolded? Can we ever free our behaviour from the heritage of our ancestors? And what, if anything, can we do to influence the course of the centuries to come?',
        image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1427068429l/23346740.jpg'
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

// toggle read status
function toggleRead(id) {
    if(myLibrary[id].readStatus == true) {
        myLibrary[id].readStatus = false;
    }
    else {
        myLibrary[id].readStatus = true;
    }

    renderLibrary();
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
    bookRead.style.backgroundColor = `${book.readStatus ? 'rgba(0, 153, 51, 0.3)' : 'rgb(0, 153, 51)'}`
    bookRead.style.color = `${book.readStatus ? 'rgb(0, 153, 51)' : '#fff'}`

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

    bookRead.addEventListener("click", e => {
        let bookInfo = e.target.parentNode;
        let id =bookInfo.parentNode.getAttribute("data-id");
        toggleRead(id);
    })
}

function renderLibrary() {
    bookContainer.innerHTML = '';
    myLibrary.map( (book, index) => {
        renderBook(book, index);
    })
}

renderLibrary();    
