package lk.steam.system.controller;

import lk.steam.system.dao.EmployeeDAO;
import lk.steam.system.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class EmployeeController {

    @Autowired
    private EmployeeDAO employeeDAO;

    @GetMapping(value = "/employee/findall")
    public List<Employee> findAll(){

        return employeeDAO.findAll();
    }

}
