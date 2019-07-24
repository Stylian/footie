package gr.manolis.stelios.footie.api.dtos;

public class TeamWithTrophiesDTO extends TeamSimpleDTO {

    private int gold = 0;
    private int silver = 0;

    public int getGold() {
        return gold;
    }

    public void setGold(int gold) {
        this.gold = gold;
    }

    public int getSilver() {
        return silver;
    }

    public void setSilver(int silver) {
        this.silver = silver;
    }
}
