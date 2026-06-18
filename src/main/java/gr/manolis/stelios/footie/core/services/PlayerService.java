package gr.manolis.stelios.footie.core.services;

import gr.manolis.stelios.footie.core.peristence.DataAccessObject;
import gr.manolis.stelios.footie.core.peristence.dtos.Player;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import org.slf4j.Logger; import org.slf4j.LoggerFactory;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.EntityManager;
import org.hibernate.Session;
import jakarta.persistence.PersistenceContext;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class PlayerService {

    final static Logger logger = LoggerFactory.getLogger(PlayerService.class);

    @PersistenceContext
    private EntityManager em;

    public void addPlayer(Player player) {
        logger.info("adding player : " + player.getName());

        DataAccessObject<Player> dao = new DataAccessObject<>(em.unwrap(Session.class));
        dao.save(player);
    }


    public List<Player> getAllPlayers() {
        DataAccessObject<Player> dao = new DataAccessObject<>(em.unwrap(Session.class));
        return dao.list("PLAYERS");
    }
}


