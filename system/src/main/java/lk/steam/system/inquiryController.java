package lk.steam.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/STEAM-CRM/Inquiry")
public class inquiryController {

    @Autowired
    private inquiryDAO inquiryDAO;

    @GetMapping
    public ModelAndView inquiryUI(){
        ModelAndView inquiryView = new ModelAndView();
        inquiryView.setViewName("crm/Inquiries.html");
        return inquiryView;
    }

    //data returnType => 'produces ="application/JSON"'
    //it can be either JSON,Text and XML

    //value = 'employee/findall' (<= how the browser will display it)
    // employee is added from the class level mapping
    @GetMapping(value = "/findall",produces = "application/json")
    public List<inquiry> findAll(){
        return inquiryDAO.findAll();
    }

    @GetMapping(value = "/active",produces = "application/json")
    public List<inquiry> findActiveInquiry(){
         return inquiryDAO.findActiveInquiry();
    }

    @GetMapping(value = "/registered",produces = "application/json")
    public List<inquiry> findRegisteredInquiry(){
        return inquiryDAO.findRegisteredInquiry();
    }

    @GetMapping(value = "/dropped",produces = "application/json")
    public List<inquiry> findDroppedInquiry(){
        return inquiryDAO.findDroppedInquiry();
    }

    @GetMapping(value = "/newInquiry",produces = "application/json")
    public List<inquiry> findNewInquiry(){
        return inquiryDAO.findNewInquiry();
    }


    @GetMapping(value = "/test",produces = "application/json")
    public List<Map<String,Object>> test(){
        return inquiryDAO.test();
    }

    @GetMapping(value = "/test2",produces = "application/json")
    public List<Map<String,Object>> test2(){
        return inquiryDAO.test2();
    }

}
