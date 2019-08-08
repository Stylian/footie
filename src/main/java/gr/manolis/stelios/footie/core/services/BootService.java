package gr.manolis.stelios.footie.core.services;

import gr.manolis.stelios.footie.core.peristence.DataAccessObject;
import gr.manolis.stelios.footie.core.peristence.dtos.League;
import org.apache.log4j.Logger;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class BootService {

    final static Logger logger = Logger.getLogger(BootService.class);

    @Autowired
    private SessionFactory sessionFactory;

    @Autowired
    private ServiceUtils serviceUtils;

    public League loadLeague() {

        League league = serviceUtils.getLeague();

        if (league == null) {
            league = new League();
            DataAccessObject<League> dao2 = new DataAccessObject<>(sessionFactory.getCurrentSession());
            dao2.save(league);
        }

        return league;
    }

}
