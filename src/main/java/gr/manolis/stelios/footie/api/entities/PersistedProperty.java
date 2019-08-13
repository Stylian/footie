package gr.manolis.stelios.footie.api.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Objects;

@Entity(name = "PROPERTIES")
public class PersistedProperty {

    @Id
    @GeneratedValue
    @Column(name = "ID")
    private int id;

    @Column(name = "PROPERTY_NAME", unique = true)
    private String name;

    @Column(name = "PROPERTY_VALUE")
    private String value;

    public PersistedProperty() { }

    public PersistedProperty(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PersistedProperty that = (PersistedProperty) o;
        return Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
