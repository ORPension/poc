package us.pers.peat.web;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class HelloController {

	@RequestMapping("/")
	public String index() {
		return "Hellow World, Welcome to POC!";
	} 

	@RequestMapping("/home")
	public String home() {
		return "This is a home page";
	} 

}
