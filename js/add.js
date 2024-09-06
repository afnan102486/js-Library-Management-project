document.querySelector('.save').addEventListener('click', function(){
    const name = document.getElementById('name').value.trim();
    const author = document.getElementById('author').value.trim();
    const publisher = document.getElementById('publisher').value.trim();
    const publishingDate = document.getElementById('publishing_date').value;
    function validateInput(name, author, publisher, publishingDate) {
        if (name === '' || author === '' || publisher === '' || publishingDate === '') {
            alert('All fields are required.');
            return false;
        }
        if (author.length < 3) {
            alert('The author must be at least 3 characters long.');
            return false;
        }
        if (publisher.length < 3) {
            alert('The publisher must be at least 3 characters long.');
            return false;
        }
        return true;
    }
    function isDuplicate(name, author, book1){
        return book1.some(book => book.name === name && book. author === author);
    }
    if (validateInput(name, author, publisher, publishingDate)) {
        let book1 = JSON.parse(localStorage.getItem('book1')) || [];
    if ( isDuplicate(name, author, book1)){
        alert('This Book Already Exists.');
        return;
    }
    const bookData = {
        name : name,
        author : author,
        publisher : publisher,
        publishing_date : publishingDate
    };
    book1.push(bookData);
    localStorage.setItem('book1', JSON.stringify(book1));
    document.getElementById('myForm').reset();
    alert('Book Added Successfully');
        }
    });