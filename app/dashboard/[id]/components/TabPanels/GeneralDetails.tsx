import React from "react";
import styles from "../../styles/userdetails.module.scss";

export default function GeneralDetails() {
  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>Personal Information</h3>

      <div className={styles.detailsGrid}>
        <div>
          <p className={styles.label}>Full Name</p>
          <p className={styles.value}>Grace Effiom</p>
        </div>

        <div>
          <p className={styles.label}>Phone Number</p>
          <p className={styles.value}>07060780922</p>
        </div>

        <div>
          <p className={styles.label}>Email Address</p>
          <p className={styles.value}>grace@gmail.com</p>
        </div>

        <div>
          <p className={styles.label}>BVN</p>
          <p className={styles.value}>07060780922</p>
        </div>

        <div>
          <p className={styles.label}>Gender</p>
          <p className={styles.value}>Female</p>
        </div>

        <div>
          <p className={styles.label}>Marital Status</p>
          <p className={styles.value}>Single</p>
        </div>

        <div>
          <p className={styles.label}>Children</p>
          <p className={styles.value}>None</p>
        </div>

        <div>
          <p className={styles.label}>Type of Residence</p>
          <p className={styles.value}>Parent's Apartment</p>
        </div>
      </div>
    </div>
  );
}

