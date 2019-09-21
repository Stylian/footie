package gr.manolis.stelios.footie.core.services;

import gr.manolis.stelios.footie.core.peristence.DataAccessObject;
import gr.manolis.stelios.footie.core.peristence.dtos.Player;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import org.apache.log4j.Logger;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class PlayerService {

    final static Logger logger = Logger.getLogger(PlayerService.class);

    @Autowired
    private SessionFactory sessionFactory;

    public void addPlayer(Player player) {
        logger.info("adding player : " + player.getName());

        DataAccessObject<Player> dao = new DataAccessObject<>(sessionFactory.getCurrentSession());
        dao.save(player);
    }


    public List<Player> getAllPlayers() {
        DataAccessObject<Player> dao = new DataAccessObject<>(sessionFactory.getCurrentSession());
        return dao.list("PLAYERS");
    }
}
