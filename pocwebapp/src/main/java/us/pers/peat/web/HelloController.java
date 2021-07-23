package us.pers.peat.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HelloController {

	@RequestMapping("/")
	public String index() {
		//return "Hello World, Welcome to Azure/Github POC!";
		return "home";
	} 

	@RequestMapping("/home")
	public String home() {
		return "This is a home page";
	} 

}
