window.onload = function() {
    const book1 = JSON.parse(localStorage.getItem('book1')) || [];
    const tableBody = document.getElementById('bookTableBody');
    function publisherGroup(book1) {
        let groupedBooks = {}
        book1.map(book => {
            groupedBooks[book.publisher] = groupedBooks[book.publisher] || [];
            groupedBooks[book.publisher].push(book);
        });
        return groupedBooks;
    }
    function renderTable(){
    tableBody.innerHTML = '';
    const groupedBooks = publisherGroup(book1);
    sr = 1;
    Object.keys(groupedBooks).map(publisher => {
        const publisherBooks = groupedBooks[publisher];
        const rowSpan = publisherBooks.length;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${sr}</td>
            <td>${publisher}</td>
            <td>${rowSpan}</td>
            <td><button class="delete" data-publisher="${publisher}">Delete</button></td>
        `;
        tableBody.appendChild(row);
        sr++;
        });
        Array.from(document.querySelectorAll('.delete')).map(button => {
            button.addEventListener('click', function() {
                const publisher = this.getAttribute('data-publisher');
                deleteBooksByPublisher(publisher);
            });
        });
    }
function deleteBooksByPublisher(publisher) {
    const filteredBooks = book1.filter(book => book.publisher !== publisher);
    localStorage.setItem('book1', JSON.stringify(filteredBooks)); 
    renderTable(); 
    window.onload();
}
renderTable(); 
}
