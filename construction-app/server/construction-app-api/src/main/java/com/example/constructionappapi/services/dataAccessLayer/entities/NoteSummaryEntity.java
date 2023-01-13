package com.example.constructionappapi.services.dataAccessLayer.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "note_summary")
@Data
@AllArgsConstructor
@NoArgsConstructor

/**
 * A class creating the table note_summary in DB. Also used for sending objects representing this DB table.
 */
public class NoteSummaryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private LocalDate datePostedSum;
    private long month;
    private String timeSpendSum;
    private String kmDrivenSum;
    private String timeEmployeeSum;
    private String workName;
    private long workNumber;


    @OneToMany(
            mappedBy = "summary",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @JsonManagedReference("summaryToNote")
    private List<CustomerNoteEntity> customerNotes = new ArrayList<>();


    @ManyToOne
    @JoinColumn(name = "work_id")
    @JsonBackReference(value = "workToSummary")
    private WorkEntity oneWork;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    @JsonBackReference(value = "customerToSummary")
    private CustomerEntity customer;


    public void setWorkForSummary(WorkEntity workEntity) {
        this.oneWork = workEntity;
    }


}
