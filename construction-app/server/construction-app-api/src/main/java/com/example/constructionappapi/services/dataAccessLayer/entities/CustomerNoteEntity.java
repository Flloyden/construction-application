package com.example.constructionappapi.services.dataAccessLayer.entities;

import com.example.constructionappapi.services.dataAccessLayer.NoteStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "customer_note")
@Data
@AllArgsConstructor
@NoArgsConstructor

/**
 * A class creating and giving access to the table customer_note in DB
 */

public class CustomerNoteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private LocalDate datePosted;
    private String note;
    private String timeSpend;
    private String kmDriven;
    private String timeEmployee;
    private String workName;
    private long workNumber;
    private NoteStatus noteStatus;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    @JsonBackReference(value = "customerToNote")
    private CustomerEntity customer;
    @ManyToOne
    @JoinColumn(name = "work_id")
    @JsonBackReference(value = "workToNote")
    private WorkEntity workEntity;


    @ManyToOne
    @JoinColumn(name = "note_summary_id")
    @JsonBackReference(value = "summaryToNote")
    private NoteSummaryEntity noteSummaryEntity;


    public void setCustomerForNote(CustomerEntity customer) {
        this.customer = customer;
    }
    public void setWorkForNote(WorkEntity workEntity) {
        this.workEntity = workEntity;
    }

}
