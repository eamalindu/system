package lk.steam.system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@SpringBootApplication
public class SystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(SystemApplication.class, args);
		System.out.println("Hello");
	}

	@RequestMapping(value = "/")
	public ModelAndView homeUI(){
		ModelAndView homeView = new ModelAndView();
		homeView.setViewName("index.html");
		return homeView;
	}

}
