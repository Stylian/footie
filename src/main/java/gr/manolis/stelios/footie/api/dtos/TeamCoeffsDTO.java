package gr.manolis.stelios.footie.api.dtos;

import gr.manolis.stelios.footie.core.peristence.dtos.Seed;
import gr.manolis.stelios.footie.core.peristence.dtos.Trophy;

import java.util.List;

public class TeamCoeffsDTO extends TeamSimpleDTO {

    private int coefficients;
    private Seed seed;
    private List<Trophy> trophies;

    public Seed getSeed() {
        return seed;
    }

    public void setSeed(Seed seed) {
        this.seed = seed;
    }

    public int getCoefficients() {
        return coefficients;
    }

    public void setCoefficients(int coefficients) {
        this.coefficients = coefficients;
    }

    public List<Trophy> getTrophies() {
        return trophies;
    }

    public void setTrophies(List<Trophy> trophies) {
        this.trophies = trophies;
    }
}
