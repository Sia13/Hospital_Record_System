
import { BrainHttp } from "./BrainHttp.js";
const serverUrl = 'http://localhost:8083';

document.addEventListener("DOMContentLoaded", (event) => {
    fetchAllPatients();
});

// get all patients
let fetchAllPatients = () => {
    let http = new BrainHttp();
    let url = `${serverUrl}/patients`;
    http.get(url, (err, patients) => {
        if(err) throw err;
        let patientRows = '';
        for(let patient of patients) {
            patientRows += `<tr>
                <td>${patient.id}</td>
                <td>${patient.name}</td>
                <td>${patient.address}</td>
                <td>${patient.contactNo}</td>
                <td>${patient.diagnosis}</td>
                <td>
                   <button class="btn btn-success mt-0 btn-sm update">update</button>
                   <button class="btn btn-danger mt-0 btn-sm delete">delete</button>
                </td>
            </tr>`
        }
        document.querySelector('#table-body').innerHTML = patientRows;
    });
};

// add patient form
let addPatientForm = document.querySelector('#add-patient-form');
addPatientForm.addEventListener('submit', function(e) {
    e.preventDefault(); //stop auto form submit
    $('#add-patient-modal').hide();
    let patient = {
        name : document.querySelector('#add-name').value,
        address : document.querySelector('#add-address').value,
        contactNo : document.querySelector('#add-contact').value,
        diagnosis : document.querySelector('#add-diagnosis').value
    }
    let url = `${serverUrl}/patients`;
    let http = new BrainHttp();
    http.post(url, patient, (data) => {
        console.log(data);
        fetchAllPatients();
        clearFormFields();
    });
});

let clearFormFields = () => {
    name : document.querySelector('#add-name').value = '';
        address : document.querySelector('#add-address').value = '';
        contactNo : document.querySelector('#add-contact').value = '';
        diagnosis : document.querySelector('#add-diagnosis').value = ''
};

//click event on entire table body
let tableBody = document.querySelector('#table-body');
tableBody.addEventListener('click', function(e) {
    let targetElement = e.target;

    //click on delete button 
    if(targetElement.classList.contains('delete')) {
        let selectedId = targetElement.parentElement.parentElement.firstElementChild.innerHTML;
        let http = new BrainHttp();
        let url = `${serverUrl}/patients/${selectedId}`
        http.delete(url, () => {
            fetchAllPatients();
        })
    }

    //click on update button
    if(targetElement.classList.contains('update')) {
        let selectedId = targetElement.parentElement.parentElement.firstElementChild.innerHTML;
        let http = new BrainHttp();
        let url = `${serverUrl}/patients`;
        
        http.get(url, (err, patients) => {
            if(err) throw err;
            let selectedPatient = patients.find((patient) => {
                return patient.id === parseInt(selectedId.trim(), 10);
            });
            
            populateUpdateModal(selectedPatient);
        });
    }
});
let populateUpdateModal = (selectedPatient) => {
    document.querySelector('#update-id').value = selectedPatient.id;
    document.querySelector('#update-name').value = selectedPatient.name;
    document.querySelector('#update-address').value = selectedPatient.address;
    document.querySelector('#update-contact').value = selectedPatient.contactNo;
    document.querySelector('#update-diagnosis').value = selectedPatient.diagnosis;
    $('#update-patient-modal').modal('show'); // to show modal
};

//update form submission
let updatePatientForm = document.querySelector('#update-patient-form');
updatePatientForm.addEventListener('submit', function(e) {
    let patientId = document.querySelector('#update-id').value.trim();
    e.preventDefault();
    $('#update-patient-modal').modal('hide'); 
    let patient = {
        name : document.querySelector('#update-name').value,
        address : document.querySelector('#update-address').value,
        contactNo : document.querySelector('#update-contact').value,
        diagnosis : document.querySelector('#update-diagnosis').value
    };
    let url = `${serverUrl}/patients/${patientId}`;
    let http = new BrainHttp();
    http.put(url, patient, (data) => {
        console.log(data);
        fetchAllPatients();
    });
});
  
