package api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import api.services.OperationsService;

@Controller
public class PagesController {

  @Autowired
  private OperationsService myService;
	
  @RequestMapping("data/league")
  public String redirToList(){
      return "data/league";
  }
  
  @RequestMapping("/greeting")
  public String greeting(@RequestParam(value="name", required=false, defaultValue="World") String name, Model model) {
      model.addAttribute("name", name);
      return "greeting";
  }
  
}
