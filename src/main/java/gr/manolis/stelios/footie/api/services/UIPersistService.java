package gr.manolis.stelios.footie.api.services;


import gr.manolis.stelios.footie.api.entities.PersistedProperty;
import gr.manolis.stelios.footie.api.entities.Tab;
import gr.manolis.stelios.footie.core.peristence.DataAccessObject;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class UIPersistService {

    @Autowired
    private SessionFactory sessionFactory;

    public int getTab(String type, int seasonNum) {

        DataAccessObject<Tab> tabDAO = new DataAccessObject<>(sessionFactory.getCurrentSession());

        Tab tab = (Tab) sessionFactory.getCurrentSession()
                .createQuery("from TABS where TAB_TYPE='" +
                        type + "' and SEASON=" + seasonNum).uniqueResult();

        if(tab == null) {
            tab = new Tab(type, seasonNum);
            tabDAO.save(tab);
        }

        return tab.getTabNumber();
    }

    public void setTab(String type, int seasonNum, int tabNumber) {

        DataAccessObject<Tab> tabDAO = new DataAccessObject<>(sessionFactory.getCurrentSession());

        Tab tab = (Tab) sessionFactory.getCurrentSession()
                .createQuery("from TABS where TAB_TYPE='" +
                        type + "' and SEASON=" + seasonNum).uniqueResult();

        tab.setTabNumber(tabNumber);
        tabDAO.save(tab);
    }

    public String getPropertyValue(String propertyName) {

        DataAccessObject<PersistedProperty> propDAO = new DataAccessObject<>(sessionFactory.getCurrentSession());

        PersistedProperty prop = (PersistedProperty) sessionFactory.getCurrentSession()
                .createQuery("from PROPERTIES where PROPERTY_NAME='" +
                        propertyName + "'").uniqueResult();

        if(prop == null) {
            prop = new PersistedProperty(propertyName);
            propDAO.save(prop);
        }

        return prop.getValue();
    }

    public void setPropertyValue(String propertyName, String propertyValue) {

        DataAccessObject<PersistedProperty> propDAO = new DataAccessObject<>(sessionFactory.getCurrentSession());

        PersistedProperty prop = (PersistedProperty) sessionFactory.getCurrentSession()
                .createQuery("from PROPERTIES where PROPERTY_NAME='" +
                        propertyName + "'").uniqueResult();

        if(prop == null)
            return;

        prop.setValue(propertyValue);
        propDAO.save(prop);

    }

}
