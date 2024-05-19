let rowCount = 1;

function addRow() {
    const name = document.getElementById('customer-name').value.trim();
    const pan = document.getElementById('pan').value.trim();
    const dob = document.getElementById('dob').value;
    const tel = document.getElementById('tel').value.trim();

    // Check if any of the required fields are empty
    if (name === '' || pan === '' || dob === '' || tel === '') {
        alert('Please fill in all required fields.');
        return; // Stop execution if any required field is empty
    }

    const tableBody = document.getElementById('table-body');

    // Remove the "No records available" row if it exists
    const noRecordsRow = document.getElementById('no-records');
    if (noRecordsRow) {
        tableBody.removeChild(noRecordsRow);
    }

    const newRow = document.createElement('tr');
    newRow.classList.add('sec-row');

    newRow.innerHTML = `
        <td>${rowCount}</td>
        <td>${name}</td>
        <td>${pan}</td>
        <td>${dob}</td>
        <td>${tel}</td>
        <td>
            <button type="button" onclick="editRow(this)">Edit</button>
            <button type="button" onclick="deleteRow(this)">Delete</button>
        </td>
    `;

    tableBody.appendChild(newRow);
    rowCount++;
    document.getElementById('info-form').reset();
}


function clearFields() {
    document.getElementById('customer-name').value = '';
    document.getElementById('pan').value = '';
    document.getElementById('dob').value = '';
    document.getElementById('tel').value = '';
}

function editRow(button) {
    const row = button.parentElement.parentElement;
    const cells = row.getElementsByTagName('td');

    document.getElementById('customer-name').value = cells[1].innerText;
    document.getElementById('pan').value = cells[2].innerText;
    document.getElementById('dob').value = cells[3].innerText;
    document.getElementById('tel').value = cells[4].innerText;

    deleteRow(button); 
}
//all 

function deleteRow(button) {
    const row = button.parentElement.parentElement;
    row.parentElement.removeChild(row);

    const tableBody = document.getElementById('table-body');
    if (tableBody.rows.length === 0) {
        const noRecordsRow = document.createElement('tr');
        noRecordsRow.id = 'no-records';
        noRecordsRow.innerHTML = `
            <td colspan="6">No records available</td>
        `;
        tableBody.appendChild(noRecordsRow);
    }

    rowCount--;
}

function resetTable() {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = `
        <tr id="no-records">
            <td colspan="6">No records available</td>
        </tr>
    `;
    rowCount = 1;
}
