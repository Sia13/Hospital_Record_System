package com.sia.hospitalrecordsystem.controller;

import com.sia.hospitalrecordsystem.entities.Patient;
import com.sia.hospitalrecordsystem.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("http://127.0.0.1:5500/")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @PostMapping("/patients")
    public Patient addPatient(@RequestBody Patient patient) {
        return patientService.savePatient(patient);
    }

    @GetMapping("/patients")
    public List<Patient> fetchPatientList() {
        return patientService.getAllPatients();
    }

    @PutMapping("/patients/{id}")
    public Patient updatePatientRecord(@PathVariable("id") Long id, @RequestBody Patient patient) {
        return patientService.updatePatient(id, patient);
    }

    @DeleteMapping("/patients/{id}")
    public String deletePatientRecord(@PathVariable("id") Long id) {
        patientService.deletePatient(id);
        return "Record Deleted successfully";
    }

}
