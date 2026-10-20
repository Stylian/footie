package gr.manolis.stelios.footie.core.services;

import gr.manolis.stelios.footie.core.peristence.DataAccessObject;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import org.slf4j.Logger; import org.slf4j.LoggerFactory;
import jakarta.persistence.EntityManager;
import org.hibernate.Session;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class TeamService {

    final static Logger logger = LoggerFactory.getLogger(TeamService.class);

    @PersistenceContext
    private EntityManager em;

    public Team addTeam(String teamName) {
        String trimmedName = teamName == null ? "" : teamName.trim();
        if (trimmedName.isEmpty()) {
            return null;
        }

        DataAccessObject<Team> dao = new DataAccessObject<>(em.unwrap(Session.class));

        List<Team> existing = dao.list("TEAMS");
        for (Team t : existing) {
            if (t.getName().equalsIgnoreCase(trimmedName)) {
                if (!t.isActive()) {
                    logger.info("reactivating team : " + t.getName());
                    t.setActive(true);
                    dao.update(t);
                }
                return t;
            }
        }

        logger.info("adding team : " + trimmedName);
        Team team = new Team(trimmedName);
        dao.save(team);
        return team;
    }

    /**
     * Removes a team from the selectable pool for future seasons.
     * The team is soft-deleted (retired) so that its history is preserved.
     */
    public void removeTeam(Team team) {
        logger.info("removing team : " + team.getName());
        team.setActive(false);
        DataAccessObject<Team> dao = new DataAccessObject<>(em.unwrap(Session.class));
        dao.update(team);
    }
}
