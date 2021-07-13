package us.pers.peat.web;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class HelloController {

	@RequestMapping("/")
	public String index() {
		return "Hello World, Welcome to Azure/Github POC!";
	} 

	@RequestMapping("/home")
	public String home() {
		return "This is a home page";
	} 

}
