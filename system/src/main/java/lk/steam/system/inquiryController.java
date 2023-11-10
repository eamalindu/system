package lk.steam.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/inquiry")
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
}
