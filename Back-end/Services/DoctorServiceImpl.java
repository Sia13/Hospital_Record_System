package com.sia.hospitalrecordsystem.service;

import com.sia.hospitalrecordsystem.entities.Doctor;
import com.sia.hospitalrecordsystem.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class DoctorServiceImpl implements DoctorService{

    @Autowired
    private DoctorRepository doctorRepository;
    @Override
    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    @Override
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @Override
    public Doctor updateData(Long id, Doctor doctor) {
        Doctor doctorData = doctorRepository.findById(id).get();

        //update name
        if (Objects.nonNull(doctor.getName()) && !"".equalsIgnoreCase(doctor.getName())) {
            doctorData.setName(doctor.getName());
        }

        //update type
        if (Objects.nonNull(doctor.getType()) && !"".equalsIgnoreCase(doctor.getType())) {
            doctorData.setType(doctor.getType());
        }

        //update contactInfo
        if (Objects.nonNull(doctor.getContactInfo()) && !"".equalsIgnoreCase(doctor.getContactInfo())) {
            doctorData.setContactInfo(doctor.getContactInfo());
        }

        //update experience
        if (Objects.nonNull(doctor.getExperience()) && !"".equalsIgnoreCase(doctor.getExperience())) {
            doctorData.setExperience(doctor.getExperience());
        }

        return doctorRepository.save(doctorData);
    }

    @Override
    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }
}
