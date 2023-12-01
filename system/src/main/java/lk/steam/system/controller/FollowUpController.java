package lk.steam.system.controller;

import lk.steam.system.dao.FollowUpDAO;
import lk.steam.system.dao.InquiryDAO;
import lk.steam.system.entity.FollowUp;
import lk.steam.system.entity.Inquiry;
import lk.steam.system.entity.InquiryStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping(value = "/followup")
public class FollowUpController {
    @Autowired
    private FollowUpDAO followUpDAO;

    @Autowired
    private InquiryDAO inquiryDAO;


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

            //get inquiryID from the followUp object
            Inquiry currentInquiry = inquiryDAO.getReferenceById(followUp.getInquiryId().getId());
            //change inquiry status to 2
            currentInquiry.setInquiryStatusId(new InquiryStatus(2,"Processing"));

            inquiryDAO.save(currentInquiry);

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
