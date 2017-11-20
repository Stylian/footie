package api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import api.services.OperationsService;

@Controller
public class PagesController {

  @Autowired
  private OperationsService myService;
	
  @RequestMapping("data/league")
  public String redirToList(){
      return "data/league";
  }
  
}
