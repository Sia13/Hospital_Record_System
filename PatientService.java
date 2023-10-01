package com.sia.hospitalrecordsystem.service;

import com.sia.hospitalrecordsystem.entities.Patient;

import java.util.List;

public interface PatientService {

    Patient savePatient(Patient patient);
    List<Patient> getAllPatients();
    Patient updatePatient(Long id, Patient patient);

    void deletePatient(Long id);

}
