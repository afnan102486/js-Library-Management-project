window.onload = function() {
    const book1 = JSON.parse(localStorage.getItem('book1')) || [];
    const tableBody = document.getElementById('bookTableBody');
    const editFormContainer = document.getElementById('editFormContainer');
    const saveEditButton = document.getElementById('saveEdit');
    const cancelEditButton = document.getElementById('cancelEdit');
    const editIndexInput = document.getElementById('editIndex');
    function renderTable() {
        tableBody.innerHTML = '';
        const rows = book1.map((book1, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${index + 1} </td>
            <td>${book1.name}</td>
            <td>${book1.author}</td>
            <td>${book1.publisher}</td>
            <td>${book1.publishing_date}</td>
            <td><button class="edit" data-index="${index}">Edit</button></td>
            <td><button class="delete" data-index="${index}">Delete</button></td>
            `;
            return row;
        });
        rows.map( row => {
            tableBody.appendChild(row);
            return row;
        });
        Array.from(document.querySelectorAll('.edit')).map(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            editBook(index);
        });
        return button;
        });
        Array.from(document.querySelectorAll('.delete')).map(button => {
            button.addEventListener('click', function(){
                const index = this . getAttribute('data-index');
                deleteBook(index);
            });
            return button;
        });
    }
    function editBook(index) {
        const book = book1[index];
        editIndexInput.value= index;
        document.getElementById('editName').value = book.name;
        document.getElementById('editAuthor').value = book.author;
        document.getElementById('editPublisher').value = book.publisher;
        document.getElementById('editPublishingDate').value = book.publishing_date;
        editFormContainer.style.display = 'block';
    }

    function saveEdit() {
        const index = editIndexInput.value;
        book1[index] = {
            name: document.getElementById('editName').value,
            author: document.getElementById('editAuthor').value,
            publisher: document.getElementById('editPublisher').value,
            publishing_date: document.getElementById('editPublishingDate').value
        };
        localStorage.setItem('book1',JSON.stringify(book1));
        editFormContainer.style.display = 'none';
        renderTable();
    
    }
    function deleteBook(index) {
        book1.splice(index, 1);
        localStorage.setItem('book1', JSON.stringify(book1));
        renderTable();
    }
    saveEditButton.addEventListener('click', saveEdit);
    cancelEditButton.addEventListener('click', function(){
        editFormContainer.style.display = 'none';
    });
    renderTable();

}