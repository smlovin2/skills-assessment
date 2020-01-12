const status = {
    ACTIVE: 2,
    AWAY: 1,
    INACTIVE: 0
}

const contacts = [
    {name: 'Christian', email: 'christian@yahoo.com', phone: '323-555-1234', address: '6539 Wilton Ave.\nCulver City CA 90234', status: status.ACTIVE},
    {name: 'Rich', email: 'rich@tripod.com', phone: '323-555-1234', address: '6539 Wilton Ave.\nCulver City CA 90234', status: status.ACTIVE},
    {name: 'Scott', email: 'scott@mailinator.com', phone: '323-555-1234', address: '6539 Wilton Ave.\nCulver City CA 90234', status: status.ACTIVE},
    {name: 'Danny', email: 'danny@hotmail.com', phone: '323-555-1234', address: '6539 Wilton Ave.\nCulver City CA 90234', status: status.ACTIVE},
    {name: 'Taka', email: 'taka@myspace.com', phone: '323-555-1234', address: '6539 Wilton Ave.\nCulver City CA 90234', status: status.INACTIVE},
    {name: 'Tim', email: 'tim@netscape.com', phone: '323-555-1234', address: '6539 Wilton Ave.\nCulver City CA 90234', status: status.AWAY},
    {name: 'Patrick', email: 'patrick@live.com', phone: '323-555-1234', address: '6539 Wilton Ave.\nCulver City CA 90234', status: status.ACTIVE},
    {name: 'Jacques', email: 'jacques@aol.com', phone: '323-555-1234', address: '6539 Wilton Ave.\nCulver City CA 90234', status: status.AWAY},
    ]

let sel = document.querySelector('#email-or-phone');

// add check mark to selected value
sel.options[sel.selectedIndex].classList.add('selected');

let emailOrPhone = sel[0].value;

function populateContactList(list, contactData) {
    contactData.forEach((contact, i) => {
        //Add row for each of the contacts
        const tr = list.insertRow(i);


        // create dot before the name
        const dot = document.createElement('span')
        dot.classList.add('dot')
        if(contact.status === status.ACTIVE) {
            dot.classList.add('active');
        } else if (contact.status === status.AWAY) {
            dot.classList.add('away');
        } else {
            dot.classList.add('inactive');
        }

        // Add their name and email to be displayed
        const cell = tr.insertCell(0);
        cell.innerHTML = contact['name'];
        cell.prepend(dot);

        // Add overlay cell
        const dotOverlay = document.createElement('span')
        dotOverlay.classList.add('dot');
        dotOverlay.classList.add('text-overlay');
        if(contact.status === status.ACTIVE) {
            dotOverlay.classList.add('active');
        } else if (contact.status === status.AWAY) {
            dotOverlay.classList.add('away');
        } else {
            dotOverlay.classList.add('inactive');
        }

        const div = document.createElement('div');
        div.classList.add('name-overlay')
        div.innerHTML = '<div class="name-overlay-text">' + dotOverlay.outerHTML + contact['name'] + '</div>';
        cell.append(div);

        cell.addEventListener('click', displayFullContactInfo);
        const cell2 = tr.insertCell(1);
        if(emailOrPhone === 'email') {
            cell2.innerHTML =  contact['email'];
        } else {
            cell2.innerHTML = contact['phone'];
        }

        const div2 = document.createElement('div');
        div2.classList.add('contact-info-overlay');
        div2.innerHTML = '<div class="contact-info-overlay-text"><p>' + contact['email'] +'</p><p>' + contact['phone'] + '</p><p>' + contact['address'] + '</div>';
        cell2.append(div2);

        // Add the row to the end of the table
        list.appendChild(tr);
    });
}

const list = document.querySelector('#list');

populateContactList(list, contacts);

function displayEmailOrPhone(option) {
    for(let i = 0; i < list.rows.length; i++) {
        if(option.value === 'email') {
            list.rows[i].cells[1].innerHTML = contacts[i]['email'];
        } else {
            list.rows[i].cells[1].innerHTML = contacts[i]['phone'];
        }
    }
}

function displayFullContactInfo(event) {
    const row = event.target.parentElement.rowIndex;
    document.getElementById('overlay').style.display = 'block';
    document.getElementsByClassName('name-overlay')[row].style.display = 'block';
    document.getElementsByClassName('contact-info-overlay')[row].style.display = 'block';
}

function hideOverlay() {
    document.getElementById('overlay').style.display = 'none';
    const nameOverlays = document.getElementsByClassName('name-overlay');
    for(let i = 0; i < nameOverlays.length; i++) {
        nameOverlays[i].style.display = 'none';
    }
    const contactOverlays = document.getElementsByClassName('contact-info-overlay');
    for(let i = 0; i < contactOverlays.length; i++) {
        contactOverlays[i].style.display = 'none';
    }
}