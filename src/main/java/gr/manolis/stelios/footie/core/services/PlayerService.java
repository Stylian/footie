package gr.manolis.stelios.footie.core.services;

import gr.manolis.stelios.footie.core.peristence.dtos.Player;
import org.apache.log4j.Logger;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class PlayerService {

    final static Logger logger = Logger.getLogger(PlayerService.class);

    @Autowired
    private SessionFactory sessionFactory;

    public void addPlayer(Player player) {
        logger.info("adding player : " + player.getName());

        // TODO

    }



}
