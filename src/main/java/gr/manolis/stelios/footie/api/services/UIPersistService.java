package gr.manolis.stelios.footie.api.services;


import gr.manolis.stelios.footie.api.entities.PersistedProperty;
import gr.manolis.stelios.footie.api.entities.Tab;
import gr.manolis.stelios.footie.core.peristence.DataAccessObject;
import org.hibernate.Session;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class UIPersistService {

    @PersistenceContext
    private EntityManager em;

    public int getTab(String type, int seasonNum) {

        DataAccessObject<Tab> tabDAO = new DataAccessObject<>(em.unwrap(Session.class));

        Tab tab = (Tab) em.unwrap(Session.class)
                .createQuery("from TABS where type='" +
                        type + "' and seasonNumber=" + seasonNum).uniqueResult();

        if(tab == null) {
            tab = new Tab(type, seasonNum);
            tabDAO.save(tab);
        }

        return tab.getTabNumber();
    }

    public void setTab(String type, int seasonNum, int tabNumber) {

        DataAccessObject<Tab> tabDAO = new DataAccessObject<>(em.unwrap(Session.class));

        Tab tab = (Tab) em.unwrap(Session.class)
                .createQuery("from TABS where type='" +
                        type + "' and seasonNumber=" + seasonNum).uniqueResult();

        tab.setTabNumber(tabNumber);
        tabDAO.save(tab);
    }

    public String getPropertyValue(String propertyName) {
        DataAccessObject<PersistedProperty> propDAO = new DataAccessObject<>(em.unwrap(Session.class));
        PersistedProperty prop = (PersistedProperty) em.unwrap(Session.class)
                .createQuery("from PROPERTIES where name='" + propertyName + "'").uniqueResult();
        if(prop == null) {
            prop = new PersistedProperty(propertyName);
            propDAO.save(prop);
            em.unwrap(Session.class).flush();
            System.out.println("CREATED NEW PROPERTY: " + propertyName);
        } else {
            System.out.println("FOUND PROPERTY: " + propertyName + " WITH VALUE: " + prop.getValue());
        }
        return prop.getValue();
    }

    public void setPropertyValue(String propertyName, String propertyValue) {
        DataAccessObject<PersistedProperty> propDAO = new DataAccessObject<>(em.unwrap(Session.class));
        PersistedProperty prop = (PersistedProperty) em.unwrap(Session.class)
                .createQuery("from PROPERTIES where name='" + propertyName + "'").uniqueResult();
        if(prop == null) {
            System.out.println("COULD NOT FIND PROPERTY TO SET: " + propertyName);
            return;
        }
        prop.setValue(propertyValue);
        System.out.println("SETTING PROPERTY: " + propertyName + " TO VALUE: " + propertyValue);
        propDAO.save(prop);
    }

    public void resetTabNumbers() {

        DataAccessObject<Tab> tabDAO = new DataAccessObject<>(em.unwrap(Session.class));
        List<Tab> tabs = tabDAO.list("TABS");
        for(Tab tab: tabs) {
            tab.setTabNumber(0);
            tabDAO.save(tab);
        }
    }
}

