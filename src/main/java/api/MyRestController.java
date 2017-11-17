package api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyRestController {
	
  @Autowired
  private MyService myService;
	
  @RequestMapping("rest/league")
  public String redirToList(){
      return "hello";
  }
  
  
}
