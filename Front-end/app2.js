import { BrainHttp } from "./BrainHttp.js";
const serverUrl = 'http://localhost:8083';

document.addEventListener("DOMContentLoaded", (event) => {
    fetchAllDoctors();
});

// get all doctors
let fetchAllDoctors = () => {
    let http = new BrainHttp();
    let url = `${serverUrl}/doctors`;
    http.get(url, (err, doctors) => {
        if(err) throw err;
        let doctorRows = '';
        for(let doctor of doctors) {
            doctorRows += `<tr>
                <td>${doctor.id}</td>
                <td>${doctor.name}</td>
                <td>${doctor.contactInfo}</td>
                <td>${doctor.type}</td>
                <td>${doctor.experience}</td>
                <td>
                   <button class="btn btn-success mt-0 btn-sm update">update</button>
                   <button class="btn btn-danger mt-0 btn-sm delete">delete</button>
                </td>
            </tr>`
        }
        document.querySelector('.t-body').innerHTML = doctorRows;
    });
};

// add doctor form
let addDoctorForm = document.querySelector('#add-doctor-form');
addDoctorForm.addEventListener('submit', function(e) {
    e.preventDefault(); //stop auto form submit
    $('#add-doctor-modal').hide();
    let doctor = {
        name : document.querySelector('#Add-Name').value,
        type : document.querySelector('#Add-Type').value,
        contactInfo : document.querySelector('#Add-Contact').value,
        experience : document.querySelector('#add-experience').value
    }
    let url = `${serverUrl}/doctors`;
    let http = new BrainHttp();
    http.post(url, doctor, (data) => {
        console.log(data);
        fetchAllDoctors();
        clearFormFields();
    });
});

let clearFormFields = () => {
    name : document.querySelector('#Add-Name').value = '';
        type : document.querySelector('#Add-Type').value = '';
        contactInfo : document.querySelector('#Add-Contact').value = '';
        experience : document.querySelector('#add-experience').value = ''
};

//click event on entire table body
let tableBody = document.querySelector('.t-body');
tableBody.addEventListener('click', function(e) {
    let targetElement = e.target;

    //click on delete button 
    if(targetElement.classList.contains('delete')) {
        let selectedId = targetElement.parentElement.parentElement.firstElementChild.innerHTML;
        let http = new BrainHttp();
        let url = `${serverUrl}/doctors/${selectedId}`
        http.delete(url, () => {
            fetchAllDoctors();
        })
    }

    //click on update button
    if(targetElement.classList.contains('update')) {
        let selectedId = targetElement.parentElement.parentElement.firstElementChild.innerHTML;
        let http = new BrainHttp();
        let url = `${serverUrl}/doctors`;
        
        http.get(url, (err, doctors) => {
            if(err) throw err;
            let selectedDoctor = doctors.find((doctor) => {
                return doctor.id === parseInt(selectedId.trim(), 10);
            });
            
            populateUpdateModal(selectedDoctor);
        });
    }
});

let populateUpdateModal = (selectedDoctor) => {
    document.querySelector('#update-Id').value = selectedDoctor.id;
    document.querySelector('#update-Name').value = selectedDoctor.name;
    document.querySelector('#update-type').value = selectedDoctor.type;
    document.querySelector('#update-Contact').value = selectedDoctor.contactInfo;
    document.querySelector('#update-experience').value = selectedDoctor.experience;
    $('#update-doctor-modal').modal('show'); // to show modal
};

//update form submission
let updateDoctorForm = document.querySelector('#update-doctor-form');
updateDoctorForm.addEventListener('submit', function(e) {
    let doctorId = document.querySelector('#update-Id').value.trim();
    e.preventDefault();
    $('#update-doctor-modal').modal('hide'); 
    let doctor = {
        id : document.querySelector('#update-id').value,
        name : document.querySelector('#update-Name').value,
        type : document.querySelector('#update-type').value,
        contactInfo : document.querySelector('#update-Contact').value,
        experience : document.querySelector('#update-experience').value
    };
    let url = `${serverUrl}/doctors/${doctorId}`;
    let http = new BrainHttp();
    http.put(url, doctor, (data) => {
        console.log(data);
        fetchAllDoctors();
    });
});
