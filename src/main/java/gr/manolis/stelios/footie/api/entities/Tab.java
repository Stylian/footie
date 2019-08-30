package gr.manolis.stelios.footie.api.entities;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Objects;

@Entity(name = "TABS")
public class Tab {

    @Id
    @GeneratedValue
    @Column(name = "ID")
    private int id;

    @Column(name = "TAB_TYPE")
    private String type;

    @Column(name = "SEASON")
    private int seasonNumber;

    @Column(name = "TAB_NUMBER")
    private int tabNumber;

    public Tab() { }

    public Tab(String type, int seasonNumber) {
        this.type = type;
        this.seasonNumber = seasonNumber;
        this.tabNumber = 0;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getSeasonNumber() {
        return seasonNumber;
    }

    public void setSeasonNumber(int seasonNumber) {
        this.seasonNumber = seasonNumber;
    }

    public int getTabNumber() {
        return tabNumber;
    }

    public void setTabNumber(int tabNumber) {
        this.tabNumber = tabNumber;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Tab tab = (Tab) o;
        return seasonNumber == tab.seasonNumber &&
                Objects.equals(type, tab.type);
    }

    @Override
    public int hashCode() {
        return Objects.hash(type, seasonNumber);
    }
}
