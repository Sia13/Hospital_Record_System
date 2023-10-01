package com.sia.hospitalrecordsystem.service;

import com.sia.hospitalrecordsystem.entities.Doctor;

import java.util.List;

public interface DoctorService {
    Doctor saveDoctor(Doctor doctor);

    List<Doctor> getAllDoctors();

    Doctor updateData(Long id, Doctor doctor);

    void deleteDoctor(Long id);

}
