package gr.manolis.stelios.footie.api.controllers;


import gr.manolis.stelios.footie.api.RestResponse;
import gr.manolis.stelios.footie.api.dtos.PlayerDTO;
import gr.manolis.stelios.footie.api.mappers.PlayerMapper;
import gr.manolis.stelios.footie.core.peristence.dtos.Player;
import gr.manolis.stelios.footie.core.peristence.dtos.Stage;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.Trophy;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import gr.manolis.stelios.footie.core.services.PlayerService;
import gr.manolis.stelios.footie.core.services.ServiceUtils;
import org.slf4j.Logger; import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.transaction.annotation.Transactional;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@Transactional
@RequestMapping("/rest/players")
public class RestPlayersController {

    final static Logger logger = LoggerFactory.getLogger(RestPlayersController.class);

    private static final String[] SEED_NAMES = {
            "Alessandro Moretti", "Matteo Ferraro", "Lorenzo Bianchi", "Davide Conti",
            "Simone Greco", "Federico Romano", "Andrea Gallo", "Marco De Luca",
            "Luca Fontana", "Stefano Caruso", "Riccardo Esposito", "Gabriele Riva",
            "Tommaso Vitale", "Nicolo Serra", "Matteo Colombo"
    };

    @Autowired
    private ServiceUtils serviceUtils;

    @Autowired
    private PlayerService playerService;

    @Autowired
    private PlayerMapper playerMapper;

    @GetMapping("/")
    public List<PlayerDTO> getPlayers() {
        List<PlayerDTO> players = playerMapper.toDTO(playerService.getAllPlayers());
        Collections.sort(players, Comparator.comparing(PlayerDTO::getName));
        return players;
    }

    @GetMapping("/{player_id}")
    public PlayerDTO getPlayer(@PathVariable("player_id") String strPlayerId) {
        int playerId = Integer.parseInt(strPlayerId);
        Player player = serviceUtils.loadPlayer(playerId);

        // transient for showing team trophies
        for(Trophy trophy : player.getTeam().getTrophies()) {
            player.addTrophy(trophy);
        }

        Collections.sort(player.getTrophies(), Comparator.comparingInt(Trophy::getSeasonNum));

        return playerMapper.toDTO(player);
    }

    @ResponseBody
    @PostMapping("/")
    public RestResponse addPlayer(@RequestParam(name = "player_name", required = false) String playerName,
                                  @RequestParam(name = "team_id", required = false) int teamId ) {

        if (playerName == null || playerName.trim().isEmpty()) {
            return new RestResponse(RestResponse.ERROR, "player name cannot be empty");
        }

        Team team = serviceUtils.loadTeam(teamId);
        Player player = new Player(playerName.trim(), team);
        playerService.addPlayer(player);

        return new RestResponse(RestResponse.SUCCESS, "player added ");
    }

    @ResponseBody
    @PutMapping("/{player_id}")
    public RestResponse updatePlayer(@PathVariable("player_id") String strPlayerId,
                                    @RequestParam(name = "player_name", required = false) String playerName,
                                    @RequestParam(name = "team_id", required = false) Integer teamId) {

        int playerId = Integer.parseInt(strPlayerId);
        Player player = serviceUtils.loadPlayer(playerId);

        if (playerName != null) {
            String trimmedName = playerName.trim();
            if (!trimmedName.isEmpty()) {
                player.setName(trimmedName);
            }
        }

        if (teamId != null && teamId > 0) {
            Team team = serviceUtils.loadTeam(teamId);
            player.setTeam(team);
        }

        playerService.updatePlayer(player);

        return new RestResponse(RestResponse.SUCCESS, "player updated");
    }

    @ResponseBody
    @PostMapping("/seed_test_data")
    public RestResponse seedTestPlayers(@RequestParam(name = "team_name", defaultValue = "Italy") String teamName) {
        Team team = serviceUtils.loadTeams().stream()
                .filter(t -> t.getName().equalsIgnoreCase(teamName))
                .findFirst().orElse(null);

        if (team == null) {
            return new RestResponse(RestResponse.ERROR, "team not found: " + teamName);
        }

        Set<String> existingNames = new HashSet<>();
        for (Player player : playerService.getAllPlayers()) {
            existingNames.add(player.getName());
        }

        int seasons = serviceUtils.getNumberOfSeasons();
        int awardSeasons = seasons;
        if (seasons > 0) {
            Season currentSeason = serviceUtils.loadCurrentSeason();
            if (currentSeason != null && currentSeason.getStage() != Stage.FINISHED) {
                awardSeasons = seasons - 1;
            }
        }
        if (awardSeasons < 1) {
            awardSeasons = 1;
        }

        int created = 0;
        int awards = 0;
        for (int i = 0; i < SEED_NAMES.length; i++) {
            String name = SEED_NAMES[i];
            if (existingNames.contains(name)) {
                continue;
            }

            Player player = new Player(name, team);

            int awardCount = Math.min(1 + (i % 3), awardSeasons);
            int startSeason = (i % awardSeasons) + 1;
            for (int j = 0; j < awardCount; j++) {
                int season = ((startSeason - 1 + j) % awardSeasons) + 1;
                String type = (i < awardSeasons && j == 0)
                        ? Trophy.PLAYER_OF_THE_YEAR
                        : Trophy.DREAM_TEAM;
                player.addTrophy(new Trophy(season, type, player));
                awards++;
            }

            playerService.addPlayer(player);
            existingNames.add(name);
            created++;
        }

        return new RestResponse(RestResponse.SUCCESS,
                "created " + created + " players with " + awards + " awards for " + team.getName());
    }

    @ResponseBody
    @DeleteMapping("/{player_id}")
    public RestResponse deletePlayer(@PathVariable("player_id") String strPlayerId) {
        int playerId = Integer.parseInt(strPlayerId);
        Player player = serviceUtils.loadPlayer(playerId);
        playerService.deletePlayer(player);

        return new RestResponse(RestResponse.SUCCESS, "player deleted");
    }

}
