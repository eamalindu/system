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
		System.out.println("Hello");
	}

	@RequestMapping(value = {"/" , "/index"})
	public ModelAndView homeUI(){
		ModelAndView homeView = new ModelAndView();
		homeView.setViewName("index.html");
		return homeView;
	}

	@RequestMapping(value = "/STEAM-CRM")
	public ModelAndView crmUI(){
		ModelAndView crmView = new ModelAndView();
		crmView.setViewName("crm/index.html");
		return crmView;
	}

	@RequestMapping(value = "/STEAM-RMS")
	public ModelAndView rmsUI(){
		ModelAndView rmsView = new ModelAndView();
		rmsView.setViewName("rms/index.html");
		return rmsView;
	}


}
