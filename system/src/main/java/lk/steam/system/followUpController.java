package lk.steam.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/STEAM-CRM/followup")
public class followUpController {
    @Autowired
    private followUpDAO followUpDAO;

    @GetMapping
    public ModelAndView inquiryUI(){
        ModelAndView inquiryView = new ModelAndView();
        inquiryView.setViewName("crm/Inquiries.html");
        return inquiryView;
    }

    @GetMapping(value = "/findall",produces = "application/json")
    public List<followUp> findAll(){
        return followUpDAO.findAll();
    }
}