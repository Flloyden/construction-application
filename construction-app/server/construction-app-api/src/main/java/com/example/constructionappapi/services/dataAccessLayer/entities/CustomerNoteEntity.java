package com.example.constructionappapi.services.dataAccessLayer.entities;

import com.example.constructionappapi.services.dataAccessLayer.NoteStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
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
 * A class creating the table customer_note in DB. Also used for sending objects representing this DB table.
 */

public class CustomerNoteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private LocalDate datePosted;
    @Lob
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
    private WorkEntity work;


    @ManyToOne
    @JoinColumn(name = "note_summary_id")
    @JsonBackReference(value = "summaryToNote")
    private NoteSummaryEntity summary;


    public void setCustomerForNote(CustomerEntity customer) {
        this.customer = customer;
    }

    public void setWorkForNote(WorkEntity workEntity) {
        this.work = workEntity;
    }

}
