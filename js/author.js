window.onload = function() {
    const book1 = JSON.parse(localStorage.getItem('book1')) || [];
    const tableBody = document.getElementById('bookTableBody');
    function authorGroup(book1) {
        let groupedBooks = {}
        book1.map(book => {
            groupedBooks[book.author] = groupedBooks[book.author] || [];
            groupedBooks[book.author].push(book);

        });
        return groupedBooks;
    }
    function renderTable(){
    tableBody.innerHTML = '';
    const groupedBooks = authorGroup(book1);
    sr = 1;

    


    Object.keys(groupedBooks).map(author => {
        const authorBooks = groupedBooks[author];
        const rowSpan = authorBooks.length;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${sr}</td>
            <td>${author}</td>
            <td>${rowSpan}</td>
            <td><button class="delete" data-author="${author}">Delete</button></td>
        `;

        tableBody.appendChild(row);
        sr++;
        });

        Array.from(document.querySelectorAll('.delete')).map(button => {
            button.addEventListener('click', function() {
                const author = this.getAttribute('data-author');
                deleteBooksByAuthor(author);
            });
        });
    }

function deleteBooksByAuthor(author) {
    const filteredBooks = book1.filter(book => book.author !== author);
    localStorage.setItem('book1', JSON.stringify(filteredBooks)); 
    renderTable(); 
    window.onload();
}
renderTable(); 
}