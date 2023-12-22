package lk.steam.system.controller;

import lk.steam.system.dao.EmployeeStatusDAO;
import lk.steam.system.entity.EmployeeStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/employeestatus")
public class EmployeeStatusController {

    @Autowired
    private EmployeeStatusDAO employeeStatusDAO;

    @GetMapping(value = "/findall",produces = "application/json")
    public List<EmployeeStatus> findAll(){
        return employeeStatusDAO.findAll();
    }
}
