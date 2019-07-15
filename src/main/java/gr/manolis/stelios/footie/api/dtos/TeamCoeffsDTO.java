package gr.manolis.stelios.footie.api.dtos;

import gr.manolis.stelios.footie.core.peristence.dtos.Seed;

public class TeamCoeffsDTO extends TeamSimpleDTO {


    private int coefficients;
    private Seed seed;

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

}
