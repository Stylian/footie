package gr.manolis.stelios.footie.api.controllers;


import gr.manolis.stelios.footie.api.RestResponse;
import gr.manolis.stelios.footie.api.services.UIPersistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController
@Transactional
@RequestMapping("/rest/persist")
public class RestUIPersistController {

    @Autowired
    private UIPersistService persistService;

    @GetMapping("/tabs/{type}/{year}")
    public int getTab(@PathVariable("type") String type,
                      @PathVariable("year") String strYear) {

        int year = Integer.parseInt(strYear);
        return persistService.getTab(type, year);
    }

    @ResponseBody
    @PostMapping("/tabs/{type}/{year}")
    public RestResponse changeTab(@PathVariable("type") String type,
                                  @PathVariable("year") String strYear,
                                  @RequestBody int tab) {

        int year = Integer.parseInt(strYear);
        persistService.setTab(type, year, tab);
        return new RestResponse(RestResponse.SUCCESS, "done");
    }

    @GetMapping("property/{property_name}")
    public String getProperty(@PathVariable("property_name") String propertyName) {
        return persistService.getPropertyValue(propertyName);
    }

    @ResponseBody
    @PostMapping("property/{property_name}")
    public RestResponse changeProperty(@PathVariable("property_name") String propertyName,
                                       @RequestBody String propertyValue) {

        persistService.setPropertyValue(propertyName, propertyValue);
        return new RestResponse(RestResponse.SUCCESS, "done");
    }

}
