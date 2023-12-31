package lk.steam.system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@SpringBootApplication
@RestController
public class SystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(SystemApplication.class, args);
		System.out.println("Project is now running!");
	}

	@RequestMapping(value = {"/" , "/index"})
	public ModelAndView homeUI(){
		ModelAndView homeView = new ModelAndView();
		homeView.setViewName("index.html");
		return homeView;
	}

	@RequestMapping(value = "/STEAM-IMS")
	public ModelAndView imsUI(){
		ModelAndView crmView = new ModelAndView();
		crmView.setViewName("ims/index.html");
		return crmView;
	}

	@RequestMapping(value = "/STEAM-RMS")
	public ModelAndView rmsUI(){
		ModelAndView rmsView = new ModelAndView();
		rmsView.setViewName("rms/index.html");
		return rmsView;
	}

	@RequestMapping(value = "/STEAM-IMS/Dashboard")
	public ModelAndView imsDashboard(){
		ModelAndView rmsView = new ModelAndView();
		rmsView.setViewName("ims/dashboard.html");
		return rmsView;
	}

	@RequestMapping(value = "/STEAM-IMS/Inquiries")
	public ModelAndView imsInquiries(){
		ModelAndView crmInquiriesView = new ModelAndView();
		crmInquiriesView.setViewName("ims/Inquiries.html");
		return crmInquiriesView;
	}

	@RequestMapping(value = "/STEAM-IMS/Schedules")
	public ModelAndView imsSchedules(){
		ModelAndView crmSchedulesView = new ModelAndView();
		crmSchedulesView.setViewName("ims/Schedules.html");
		return crmSchedulesView;
	}

	@RequestMapping(value = "/STEAM-IMS/Reports-All")
	public ModelAndView imsReportsAll(){
		ModelAndView crmReportsAllView = new ModelAndView();
		crmReportsAllView.setViewName("ims/Reports-All.html");
		return crmReportsAllView;
	}
	@RequestMapping(value = "/STEAM-IMS/Administrations")
	public ModelAndView imsAdministrations(){
		ModelAndView crmReportsAllView = new ModelAndView();
		crmReportsAllView.setViewName("ims/Administrations.html");
		return crmReportsAllView;
	}@RequestMapping(value = "/STEAM-IMS/Employee")
	public ModelAndView imsEmployee(){
		ModelAndView crmReportsAllView = new ModelAndView();
		crmReportsAllView.setViewName("ims/Employee.html");
		return crmReportsAllView;
	}
}
