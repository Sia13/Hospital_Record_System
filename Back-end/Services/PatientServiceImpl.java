package com.sia.hospitalrecordsystem.service;

import com.sia.hospitalrecordsystem.entities.Patient;
import com.sia.hospitalrecordsystem.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class PatientServiceImpl implements PatientService{

    @Autowired
    private PatientRepository patientRepository;

    @Override
    public Patient savePatient(Patient patient) {
        return patientRepository.save(patient);
    }

    @Override
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @Override
    public Patient updatePatient(Long id, Patient patient) {
        Patient patientData = patientRepository.findById(id).get();

        //update name
        if (Objects.nonNull(patient.getName()) && !"".equalsIgnoreCase(patient.getName())) {
            patientData.setName(patient.getName());
        }

        //address
        if (Objects.nonNull(patient.getAddress()) && !"".equalsIgnoreCase(patient.getAddress())) {
            patientData.setAddress(patient.getAddress());
        }

        //diagnosis
        if (Objects.nonNull(patient.getDiagnosis()) && !"".equalsIgnoreCase(patient.getDiagnosis())) {
            patientData.setDiagnosis(patient.getDiagnosis());
        }

        //contactNo.
        if (Objects.nonNull(patient.getContactNo()) && !"".equalsIgnoreCase(patient.getContactNo())) {
            patientData.setContactNo(patient.getContactNo());
        }

        return patientRepository.save(patientData);
    }

    @Override
    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
}
