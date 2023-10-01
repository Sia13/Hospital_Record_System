package com.sia.hospitalrecordsystem.controller;

import com.sia.hospitalrecordsystem.entities.Doctor;
import com.sia.hospitalrecordsystem.entities.Patient;
import com.sia.hospitalrecordsystem.service.DoctorService;
import com.sia.hospitalrecordsystem.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://127.0.0.1:5500/")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @PostMapping("/doctors")
    public Doctor addDoctor(@RequestBody Doctor doctor) {
        return doctorService.saveDoctor(doctor);
    }

    @GetMapping("/doctors")
    public List<Doctor> fetchDoctorList() {
        return doctorService.getAllDoctors();
    }

    @PutMapping("/doctors/{id}")
    public Doctor updateDoctorData(@PathVariable("id") Long id, @RequestBody Doctor doctor) {
        return doctorService.updateData(id, doctor);
    }

    @DeleteMapping("/doctors/{id}")
    public String deleteDoctorData(@PathVariable("id") Long id) {
        doctorService.deleteDoctor(id);
        return "deleted successfully";
    }
}
