package lk.steam.system.controller;

import lk.steam.system.dao.FollowUpDAO;
import lk.steam.system.entity.FollowUp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping(value = "/followup")
public class FollowUpController {
    @Autowired
    private FollowUpDAO followUpDAO;


    @GetMapping(value = "/findall",produces = "application/json")
    public List<FollowUp> findAll(){
        return followUpDAO.findAll();
    }

    @GetMapping(value = "/latestFollowup",produces = "application/json")
    public List<FollowUp> latestFollowupForEachInquiry(){
        return followUpDAO.latestFollowupForEachInquiry();
    }

    @PostMapping
    public String saveNewFollowup(@RequestBody FollowUp followUp){

        try{

            //set auto generated values
            followUp.setFollowUpTime(LocalDateTime.now());
            followUp.setAddedBy("User1");

            followUpDAO.save(followUp);

            return "OK";

        }
        catch (Exception ex){
            return "Save Failed "+ex.getMessage();
        }

    }

}
