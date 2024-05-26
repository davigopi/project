function adicionarNota() {
    const noteInput = document.getElementById('note-input');
    const noteText = noteInput.value.trim();

    if (noteText !== '') {
        const noteList = document.getElementById('note-list');
        const newNoteItem = document.createElement('li');
        newNoteItem.textContent = noteText;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑️';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = function() {
            noteList.removeChild(newNoteItem);
        };

        newNoteItem.appendChild(deleteButton);
        noteList.appendChild(newNoteItem);
        
        noteInput.value = '';
    } else {
        alert('Por favor, insira uma nota válida.');
    }
}
