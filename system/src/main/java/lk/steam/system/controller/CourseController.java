package lk.steam.system.controller;

import lk.steam.system.dao.CourseDAO;
import lk.steam.system.entity.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/course")
public class CourseController {

    @Autowired
    private CourseDAO courseDAO;

    @GetMapping(value = "/findall",produces = "application/json")
    public List<Course> findAll(){
        return courseDAO.findAll();
    }

}
