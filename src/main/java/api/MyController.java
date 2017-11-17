package api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MyController {

  @Autowired
  private MyService myService;
	
  @RequestMapping("/league")
  public String redirToList(){
      return "asdf";
  }
  
}
