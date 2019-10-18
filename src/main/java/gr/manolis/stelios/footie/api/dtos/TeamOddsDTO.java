package gr.manolis.stelios.footie.api.dtos;

public class TeamOddsDTO extends TeamSimpleDTO {

    private double odds;
    private double chances;

    public double getOdds() {
        return odds;
    }

    public void setOdds(double odds) {
        this.odds = odds;
    }

    public double getChances() {
        return chances;
    }

    public void setChances(double chances) {
        chances = 0.01*Math.round(chances/0.01);
        this.chances = chances;

        double oddz = 1 / chances;
        double roundFactor = 1;
        if(oddz < 3) {
            roundFactor = 0.05;
        }else if(oddz < 5) {
            roundFactor = 0.5;
        }else if(oddz < 10) {
            roundFactor = 1;
        }else if(oddz < 20) {
            roundFactor = 2;
        }else {
            roundFactor = 5;
        }

        this.odds = roundFactor * Math.round(oddz / roundFactor);
    }
}
