import React from "react";
import { match, Route, Link, useRouteMatch } from "react-router-dom";
import SummaryCard from "../../ui-components/cards/summary-card.component";
import { fetchPatientMedications } from "./medications.resource";
import styles from "./medication-level-two.css";
import { createErrorHandler } from "@openmrs/esm-error-handling";
import { useCurrentPatient } from "@openmrs/esm-api";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import {
  getDosage,
  openMedicationWorkspaceTab
} from "./medication-orders-utils";
import { MedicationButton } from "./medication-button.component";
import MedicationOrderBasket from "./medication-order-basket.component";
import MedicationDetailedSummary from "./medication-level-three/medication-level-three.component";

export default function MedicationLevelTwo(props: MedicationsOverviewProps) {
  const [patientMedications, setPatientMedications] = React.useState(null);
  const [
    isLoadingPatient,
    patient,
    patientUuid,
    patientErr
  ] = useCurrentPatient();
  let pastMedication = false;
  let currentMedication = false;

  const { t } = useTranslation();
  const match = useRouteMatch();

  React.useEffect(() => {
    const subscription = fetchPatientMedications(patientUuid).subscribe(
      Medications => setPatientMedications(Medications),
      createErrorHandler()
    );
    return () => subscription.unsubscribe();
  }, [patientUuid]);

  function displayCurrentMedications() {
    return (
      <React.Fragment>
        <SummaryCard
          name={t("Medications - current", "Medications - current")}
          addComponent={MedicationOrderBasket}
          showComponent={() =>
            openMedicationWorkspaceTab(
              MedicationOrderBasket,
              "Medication Order"
            )
          }
        >
          <table className={styles.medicationsTable}>
            <thead>
              <tr>
                <td>NAME</td>
                <td>
                  <div className={styles.centerItems}>STATUS</div>
                </td>
                <td>START DATE</td>
              </tr>
            </thead>
            <tbody>
              {patientMedications &&
                patientMedications
                  .filter(med => med.action === "NEW")
                  .map(medication => {
                    return (
                      <React.Fragment key={medication.uuid}>
                        <tr>
                          <td>
                            <span
                              style={{
                                fontWeight: 500,
                                color: "var(--omrs-color-ink-high-contrast)"
                              }}
                            >
                              {medication.drug.name}
                            </span>
                            {" \u2014 "} {medication.route.display}&nbsp;
                            {" \u2014 "}
                            {medication.doseUnits.display} {" \u2014 "}
                            <span
                              style={{
                                color: "var(--omrs-color-ink-medium-contrast)"
                              }}
                            >
                              DOSE
                            </span>
                            &nbsp;&nbsp;&nbsp;
                            <span
                              style={{
                                fontWeight: 500,
                                color: "var(--omrs-color-ink-high-contrast)"
                              }}
                            >
                              {getDosage(
                                medication.drug.strength,
                                medication.dose
                              )}
                            </span>
                            <span>
                              {" "}
                              {" \u2014 "} {medication.frequency.display}
                              {" \u2014 "}
                              {medication.duration}
                              {medication.durationUnits?.display}
                              {" \u2014 "}
                            </span>
                            &nbsp;&nbsp;
                            <span
                              style={{
                                color: "var(--omrs-color-ink-medium-contrast)"
                              }}
                            >
                              REFILLS
                            </span>
                            &nbsp;&nbsp;&nbsp;
                            <span>{medication.numRefills}</span>{" "}
                          </td>
                          <td>{medication.action}</td>
                          <td>
                            {dayjs(medication.dateActivated).format(
                              "DD-MMM-YYYY"
                            )}
                          </td>
                          <td>
                            <MedicationButton
                              component={MedicationOrderBasket}
                              name={"Medication Order Basket"}
                              label={"REVISE"}
                              orderUuid={medication.uuid}
                              drugName={medication.drug.name}
                              action={"REVISE"}
                              inProgress={true}
                            />
                            <MedicationButton
                              component={MedicationOrderBasket}
                              name={"Medication Order Basket"}
                              label={"DISCONTINUE"}
                              orderUuid={medication.uuid}
                              drugName={null}
                              action={"DISCONTINUE"}
                              inProgress={true}
                            />
                          </td>
                          <td style={{ textAlign: "end" }}>
                            <Link to={`${match.path}/${medication.uuid}`}>
                              <svg
                                className="omrs-icon"
                                fill="rgba(0, 0, 0, 0.54)"
                              >
                                <use xlinkHref="#omrs-icon-chevron-right" />
                              </svg>
                            </Link>
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
            </tbody>
          </table>
          <div className={styles.medicationFooter}>
            <p
              style={{ color: "var(--omrs-color-ink-medium-contrast)" }}
              className={"omrs-type-body-large"}
            >
              No more medications available.
            </p>
          </div>
        </SummaryCard>
      </React.Fragment>
    );
  }

  function displayPastMedications() {
    return (
      <React.Fragment>
        <SummaryCard
          name={t("Medications - past", "Medications - past")}
          addComponent={MedicationOrderBasket}
          showComponent={() =>
            openMedicationWorkspaceTab(
              MedicationOrderBasket,
              "Medication Order"
            )
          }
        >
          <table className={styles.medicationsTable}>
            <thead>
              <tr>
                <td>
                  <div>STATUS</div>
                </td>
                <td>NAME</td>
                <td>END DATE</td>
              </tr>
            </thead>
            <tbody>
              {patientMedications &&
                patientMedications
                  .filter(med => med.action !== "NEW")
                  .map(medication => {
                    return (
                      <React.Fragment key={medication.uuid}>
                        <tr>
                          <td>{medication.action}</td>
                          <td>
                            <span
                              style={{
                                fontWeight: 500,
                                color: "var(--omrs-color-ink-high-contrast)"
                              }}
                            >
                              {medication.drug.name}
                            </span>
                            {" \u2014 "} {medication.doseUnits.display}&nbsp;
                            {" \u2014 "}
                            {medication.route.display} {" \u2014 "}
                            <span
                              style={{
                                color: "var(--omrs-color-ink-medium-contrast)"
                              }}
                            >
                              DOSE
                            </span>
                            &nbsp;&nbsp;&nbsp;
                            <span
                              style={{
                                fontWeight: 500,
                                color: "var(--omrs-color-ink-high-contrast)"
                              }}
                            >
                              {getDosage(
                                medication.drug.strength,
                                medication.dose
                              )}
                            </span>
                            <span>
                              {" "}
                              {" \u2014 "} {medication.frequency.display}
                              {" \u2014 "}
                              {medication.duration}
                              {medication.durationUnits.display}
                              {" \u2014 "}
                            </span>
                            &nbsp;&nbsp;&nbsp;
                            <span
                              style={{
                                color: "var(--omrs-color-ink-medium-contrast)"
                              }}
                            >
                              REFILLS
                            </span>
                            &nbsp;&nbsp;&nbsp;
                            <span>{medication.numRefills}</span>
                          </td>
                          <td>
                            {dayjs(medication.dateActivated).format(
                              "DD-MMM-YYYY"
                            )}
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
            </tbody>
          </table>
          <div className={styles.medicationFooter}>
            <p
              style={{ color: "var(--omrs-color-ink-medium-contrast)" }}
              className={"omrs-type-body-large"}
            >
              No more medications available.
            </p>
          </div>
        </SummaryCard>
      </React.Fragment>
    );
  }
  function displayNoMedicationHistory() {
    return (
      <SummaryCard name="Medication" styles={{ width: "90%" }}>
        <div className={styles.medicationMargin}>
          <p className="omrs-bold">
            The patient's medication history is not documented.
          </p>
          <p className="omrs-bold">
            Please <a href="/">add medication history</a>.
          </p>
        </div>
      </SummaryCard>
    );
  }

  function displayMedications() {
    return (
      <>
        <div>{displayCurrentMedications()}</div>
        <div>{displayPastMedications()}</div>
      </>
    );
  }

  return (
    <>
      {patientMedications && patientMedications.length > 0
        ? displayMedications()
        : displayNoMedicationHistory()}
    </>
  );
}

type MedicationsOverviewProps = {};
