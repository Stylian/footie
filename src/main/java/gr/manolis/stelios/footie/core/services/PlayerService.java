package gr.manolis.stelios.footie.core.services;

import gr.manolis.stelios.footie.core.peristence.DataAccessObject;
import gr.manolis.stelios.footie.core.peristence.dtos.Player;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class PlayerService {

    private final static Logger logger = LoggerFactory.getLogger(PlayerService.class);

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
