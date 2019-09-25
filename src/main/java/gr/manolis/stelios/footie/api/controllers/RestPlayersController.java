package gr.manolis.stelios.footie.api.controllers;


import gr.manolis.stelios.footie.api.RestResponse;
import gr.manolis.stelios.footie.api.dtos.PlayerDTO;
import gr.manolis.stelios.footie.api.mappers.PlayerMapper;
import gr.manolis.stelios.footie.core.peristence.dtos.Player;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.Trophy;
import gr.manolis.stelios.footie.core.services.PlayerService;
import gr.manolis.stelios.footie.core.services.ServiceUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@RestController
@Transactional
@RequestMapping("/rest/players")
public class RestPlayersController {

    final static Logger logger = Logger.getLogger(RestPlayersController.class);

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

        Team team = serviceUtils.loadTeam(teamId);
        Player player = new Player(playerName, team);
        playerService.addPlayer(player);

        return new RestResponse(RestResponse.SUCCESS, "player added ");
    }

}
