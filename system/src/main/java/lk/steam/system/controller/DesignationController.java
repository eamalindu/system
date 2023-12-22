package lk.steam.system.controller;

import lk.steam.system.dao.DesignationDAO;
import lk.steam.system.entity.Designation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/designation")
public class DesignationController {

    @Autowired
    private DesignationDAO designationDAO;

    @GetMapping(value = "/findall",produces = "application/json")
    public List<Designation> findAll(){
        return designationDAO.findAll();
    }
}
