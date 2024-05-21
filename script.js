let rowCount = 1;

function addRow() {
    const name = document.getElementById('customer-name').value.trim();
    const pan = document.getElementById('pan').value.trim();
    const dob = document.getElementById('dob').value;
    const tel = document.getElementById('tel').value.trim();
    const pinCode = document.getElementById('pin-code').value.trim();

    // Check if any of the required fields are empty
    if (name === '' || pan === '' || dob === '' || tel === '' || pinCode === '') {
        alert('Please fill in all required fields.');
        return; // Stop execution if any required field is empty
    }
    // Validate PAN length
    if (pan.length > 10 || pan.length < 10) {
        alert('PAN should be of 10 characters.');
        return;
    }

    // Validate Pin Code length
    if (pinCode.length > 6 || pinCode.length < 6) {
        alert('Pin Code should be of 6 digits.');
        return;
    }
    if (tel.length > 10 || tel.length < 10) {
        alert('Tel. should be of 10 digits.');
        return;
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
        <td>
            <div class="tooltip">${name}
                <span class="tooltiptext">
                    <strong>PAN:</strong> ${pan}<br>
                    <strong>DOB:</strong> ${dob}<br>
                    <strong>Tel:</strong> ${tel}<br>
                    <strong>Pin:</strong> ${pinCode}
                </span>
            </div>
        </td>
        <td>
            <button type="button" class="edit-btn" onclick="editRow(this)">Edit</button>
            <button type="button" class="delete-btn" onclick="deleteRow(this)">Delete</button>
        </td>
    `;

    tableBody.appendChild(newRow);
    rowCount++;
    document.getElementById('info-form').reset();
    const footer = document.querySelector('footer');
    footer.style.display = 'block';
}

function clearFields() {
    document.getElementById('customer-name').value = '';
    document.getElementById('pan').value = '';
    document.getElementById('dob').value = '';
    document.getElementById('tel').value = '';
    document.getElementById('pin-code').value = '';
}

function editRow(button) {
    const row = button.parentElement.parentElement;
    const cells = row.getElementsByTagName('td');

    const tooltip = cells[1].querySelector('.tooltiptext');
    const info = tooltip.innerHTML.split('<br>');
    
    document.getElementById('customer-name').value = cells[1].innerText;
    document.getElementById('pan').value = info[0].split(': ')[1];
    document.getElementById('dob').value = info[1].split(': ')[1];
    document.getElementById('tel').value = info[2].split(': ')[1];

    deleteRow(button);
}

function deleteRow(button) {
    const row = button.parentElement.parentElement;
    row.parentElement.removeChild(row);

    const tableBody = document.getElementById('table-body');
    if (tableBody.rows.length === 0) {
        const noRecordsRow = document.createElement('tr');
        noRecordsRow.id = 'no-records';
        noRecordsRow.innerHTML = `
            <td colspan="3">No records available</td>
        `;
        tableBody.appendChild(noRecordsRow);
    }

    if (tableBody.rows.length === 0) {
        // Hide footer text if no records
        const footer = document.querySelector('footer');
        footer.style.display = 'none';
    }

    rowCount--;

}
